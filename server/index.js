const express = require('express');
const fs = require('fs');
const R = require('ramda');

const app = express();
const port = 3000;

app.get('/api/articles', (req, res) => {
  fs.createReadStream(`${__dirname}/articles.json`, 'utf8').pipe(res)
});

app.get('/api/categories', (req, res) => {
  fs.createReadStream(`${__dirname}/categories.json`, 'utf8').pipe(res)
});

app.get('/api/articles/:id', (req, res) => {
  fs.readFile(`${__dirname}/articles.json`, 'utf8', (err, data) => {
    res.send(R.find(({ id }) => id === req.params.id, JSON.parse(data).items))
  });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
