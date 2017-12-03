const express = require('express');
const fs = require('fs');
const R = require('ramda');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const { extractDescription, extractImage } = require('./utils');
const multer = require('multer');
const imgur = require('imgur')

const app = express();
const upload = multer({dest:'./upload/'});
const port = 3000;

app.use(bodyParser.json({limit: '50mb'}));

let articles = JSON.parse(fs.readFileSync(`${__dirname}/articles.json`, 'utf8')).items;

app.get('/api/articles', (req, res) => {
  //res.send(R.filter(({ pubDate }) => pubDate, articles));
  res.send(articles);
});

app.get('/api/categories', (req, res) => {
  fs.createReadStream(`${__dirname}/categories.json`, 'utf8').pipe(res)
});

app.get('/api/articles/:id', (req, res) => {
  fs.readFile(`${__dirname}/articles.json`, 'utf8', (err, data) => {
    res.send(R.find(({ id }) => id === req.params.id, JSON.parse(data).items))
  });
});

app.get('/api/user', (req, res) => {
  res.send({
    "name": "Rémi Michel",
    "image": "https://imgur.com/MyVMu97.jpg"
  })
});

app.put('/api/articles/:articleId', (req, res) => {
  articles = R.map((article) => {
    if(article.id === req.params.articleId){
      let newArticle = R.merge(article, req.body);
      const articleImage = extractImage(newArticle.content);
      return R.merge(newArticle, {
        coverImage: articleImage,
        thumbnail: articleImage,
      });
    }
    return article;
  }, articles);
  const updatedArticle = R.find((article) => req.params.articleId === article.id, articles);
  res.status(201).send(updatedArticle);
});

app.post('/api/articles/:articleId/publish', (req, res) => {
  articles = R.map((article) => {
    if(article.id === req.params.articleId){
      let duration = Math.floor(R.split(' ', article.content || '').length / 180);
      duration = duration === 0 ? 1 : duration;
      const description = extractDescription(article.content);
      return R.mergeAll([article, req.body, { pubDate: new Date(), duration, description }]);
    }
    return article;
  }, articles);
  const updatedArticle = R.find((article) => req.params.articleId === article.id, articles);
  res.status(200).send(updatedArticle);
});

app.delete('/api/articles/:articleId', (req, res) => {
  articles = R.filter((article) => article.id !== req.params.articleId, articles);
  res.status(204).send({ status: 'ok' });
});

app.post('/api/articles', (req, res) => {
  const newArticle = { id: shortid.generate() }
  const a = R.merge(newArticle, req.body);
  /*{"id": shortid.generate(),
      "title": "Having a Great Website is only Half the Story",
      "pubDate": "2017-07-20 00:27:31",
      "author": {
        "name": "Jason Matthew",
        "image": "https://cdn-images-1.medium.com/fit/c/200/200/1*YYieiQhlhPDhZfC4iSLNVQ.jpeg"
      },
      "duration": 6,
      "coverImage": "https://cdn-images-1.medium.com/max/2000/1*fdsz6Cmog-pFxnJeMH82RQ.png",
      "thumbnail": "https://cdn-images-1.medium.com/max/2000/1*fdsz6Cmog-pFxnJeMH82RQ.png",
      "description": "We all know that a website and an online presence are essential parts to owning a business, a brand, or in general living in this modern age. Heck I have multiple websites between my personal website, my business website, and a few side projects, and I bet you probably do too.",
      "content": "\n<figure><img alt=\"\" src=\"https://cdn-images-1.medium.com/max/1024/1*fdsz6Cmog-pFxnJeMH82RQ.png\"></figure><p>We all know that a website and an online presence are essential parts to owning a business, a brand, or in general living in this modern age. Heck I have multiple websites between my personal website, my business website, and a few side projects, and I bet you probably do too.</p>\n<p>That’s not why you’re here today though. You’re here because you want to learn what more you need to do to make your websites great! Well I’m here to tell you that you need multiple things for a great website and that these are all going to vary depending on who you ask.</p>\n<p>Ask a SEO expert whats most important for a website and he’ll say SEO. Ask a designer whats most important and he will say something that will roughly translate to “good design” whether it be UX, UI, or some other form or design. Ask a developer and he will tell you that neither of these things matter if your websites code is wonky, if it doesn’t function right.</p>\n<p>So what am I here to tell you that these three disciplines wont? Well that’s simple. <strong>They’re all right.</strong> That’s right you need all of these things and many others to get the most out of your website.</p>\n<p>Often you’ll see people spend thousands of dollars on the design and development of their website but nothing on the promotion or marketing of it.</p>\n<p>You will have to excuse my ignorance of fine art here. But do you think that the Mona Lisa, painted by Leonardo da Vinci. One of, if not the worlds most famous painting would be worth as much if after da Vinci’s death in 1519 whoever inherited this painting shoved it in a closet along with the rest of Leonardo’s paintings never to be seen by the world again? I doubt it, sure I imagine at some point someone would have found them dragged them out and put them on display but I doubt it would be as famous or worth as much as it is today.</p>\n<p>We aren’t here to talk about paintings though. We want to talk about website. What I am really trying to get at here is that you need a well rounded approach to your website. Spending thousands of 💲 💲 💲 on a designer and developer will do you no good if no one sees your website. Likewise a brilliantly marketed website with thousands of visitors every day hitting it will never be as effective if it’s design, and user experience is horrible. It should be noted here that if your business sucks none of these things will help, a website and marketing can’t make up for a poor product or plan.</p>\n<p>So what am I saying to do? Simple a two step approach to your website.</p>\n<h4>Step 1</h4>\n<p>Figure out who your market is and design your website to capture their attention. You should probably have a solid idea of who your customers are and what they are looking for. Give your designer as much of this information as you can and if they are any good, pretty soon you will have a website that both looks good and captures your audience / clients attention. Don’t skimp on your developer either, sure it should be nice and simple but a good developer will ensure that your website works for years to come and doesn’t just break with the next update that comes along. They will also ensure that everything is modular and well documented, making sure that in the future changes and even changing your developer will be a painless process.</p>\n<h4>Step 2</h4>\n<p>Great you have a awesome looking website, it functions well and is designed to capture your markets attention. Now the most important thing you can do is to market it. There are so many ways of marketing a website that diving into each of them in this article would be useless. I am sure that a quick Google search will provide you with hundreds of options. Don’t get overwhelmed here though look through all your options and chose three maybe four of them to master, and then get to work. A web agency might help you with these but there is no way if you have simply paid an up front cost of $X for your website that they will keep doing this indefinitely. Sure they might set up some basic SEO and do a little marketing to begin with but without a monthly fee you can be sure they aren’t doing anything. So you either need to do this yourself or get someone on board who will.</p>\n<h4>Finishing up</h4>\n<p>So with those two steps done you should be set. Knowing both sides of the story will help you and your business grow like never before. You’ll have a website that doesn’t look like rubbish and actually converts those that land on it, and you will actually have real humans looking at it to be converted. With these things done you’re set to bust into the big leagues.</p>\n<p>If you liked this article please click the 💚 below. It’ll let me know you’d like to read more articles like this, and it’ll help other people discover the article as well. If you’re looking for a new web developer I am always looking to work on interesting projects. Contact me at <a href=\"https://jasonmatthew.me/\">jasonmatthew.me</a></p>\n<img src=\"https://medium.com/_/stat?event=post.clientViewed&amp;referrerSource=full_rss&amp;postId=c9c5b434411\" width=\"1\" height=\"1\"><hr>\n<p><a href=\"https://medium.jasonmdesign.com/having-a-great-website-is-only-half-the-story-c9c5b434411\">Having a Great Website is only Half the Story</a> was originally published in <a href=\"https://medium.jasonmdesign.com/\">JasonMDesign</a> on Medium, where people are continuing the conversation by highlighting and responding to this story.</p>\n",
      "enclosure": [],
      "categories": []
    };*/
  articles = articles.concat(a);
  res.status(201).send(a);
});

app.post('/api/uploadImage', upload.any(), (req, res) => {
  const file = R.head(req.files);
  imgur.uploadFile(file.path).then((d) => {
    fs.unlink(`${__dirname}/../${file.path}`);
    res.status(201).send({files:[{url: d.data.link}]})
  }).catch((err) => {
    fs.unlink(`${__dirname}/../${file.path}`);
  })
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
