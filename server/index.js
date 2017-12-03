const express = require('express');
const fs = require('fs');
const R = require('ramda');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const { extractDescription, extractImage } = require('./utils');
const multer = require('multer');
const imgur = require('imgur');

const app = express();
const upload = multer({ dest: './upload/' });
const port = 3000;

app.use(bodyParser.json({ limit: '50mb' }));

let articles = JSON.parse(fs.readFileSync(`${__dirname}/articles.json`, 'utf8'))
  .items;

app.get('/api/articles', (req, res) => {
  res.send(articles);
});

app.get('/api/categories', (req, res) => {
  fs.createReadStream(`${__dirname}/categories.json`, 'utf8').pipe(res);
});

app.get('/api/articles/:id', (req, res) => {
  fs.readFile(`${__dirname}/articles.json`, 'utf8', (err, data) => {
    res.send(R.find(({ id }) => id === req.params.id, JSON.parse(data).items));
  });
});

app.get('/api/user', (req, res) => {
  res.send({
    name: 'Rémi Michel',
    image: 'https://imgur.com/MyVMu97.jpg',
  });
});

app.put('/api/articles/:articleId', (req, res) => {
  articles = R.map(article => {
    if (article.id === req.params.articleId) {
      let newArticle = R.merge(article, req.body);
      const articleImage = extractImage(newArticle.content);
      return R.merge(newArticle, {
        coverImage: articleImage,
        thumbnail: articleImage,
      });
    }
    return article;
  }, articles);
  const updatedArticle = R.find(
    article => req.params.articleId === article.id,
    articles
  );
  res.status(201).send(updatedArticle);
});

app.post('/api/articles/:articleId/publish', (req, res) => {
  articles = R.map(article => {
    if (article.id === req.params.articleId) {
      let duration = Math.floor(
        R.split(' ', article.content || '').length / 180
      );
      duration = duration === 0 ? 1 : duration;
      const description = extractDescription(article.content);
      return R.mergeAll([
        article,
        req.body,
        { pubDate: new Date(), duration, description },
      ]);
    }
    return article;
  }, articles);
  const updatedArticle = R.find(
    article => req.params.articleId === article.id,
    articles
  );
  res.status(200).send(updatedArticle);
});

app.delete('/api/articles/:articleId', (req, res) => {
  articles = R.filter(article => article.id !== req.params.articleId, articles);
  res.status(204).send({ status: 'ok' });
});

app.post('/api/articles', (req, res) => {
  const newArticle = { id: shortid.generate() };
  const a = R.merge(newArticle, req.body);
  articles = articles.concat(a);
  res.status(201).send(a);
});

app.post('/api/uploadImage', upload.any(), (req, res) => {
  const file = R.head(req.files);
  imgur
    .uploadFile(file.path)
    .then(d => {
      fs.unlink(`${__dirname}/../${file.path}`);
      res.status(201).send({ files: [{ url: d.data.link }] });
    })
    .catch(err => {
      fs.unlink(`${__dirname}/../${file.path}`);
    });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
