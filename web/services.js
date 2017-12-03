import axios from 'axios';
import * as R from 'ramda';

export const getVisibleArticles = (articles, categorySlug) => {
  if(!categorySlug || categorySlug === 'home') return articles;
  return R.filter(({ categories }) => categories.includes(categorySlug), articles);
};

export const getArticles = () => axios.get('/api/articles')
  .then(({ data }) => data);

export const postArticle = (article) => axios.post('/api/articles', article).then(({ data }) => data);

export const publishArticle = (article) => axios.post(`/api/articles/${article.id}/publish`, article).then(({ data }) => data);

export const deleteArticleAPI = (id) => axios.delete(`/api/articles/${id}`, {});

export const putArticle = (id, article) => axios.put(`/api/articles/${id}`, article).then(({ data }) => data);

export const getUser = () => axios.get('/api/user').then(({ data }) => data);

export const getCategories = () => axios.get('/api/categories')
  .then(({ data }) => data.items);

