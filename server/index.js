const express = require('express');

const app = express();
const port = 3000;

let articles = [
  { id: 1, title: 'How to make your life easier using functional programming in TypeScript' }
];

app.get('/articles', (req, res) => {
  res.send(articles)
});

app.post('/articles', (req, res) => {

});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
