import axios from 'axios';
import * as R from 'ramda';

export const getVisibleArticles = (articles, categorySlug) => {
  if(!categorySlug || categorySlug === 'home') return articles;
  return R.filter(({ categories }) => categories.includes(categorySlug), articles);
};

export const getArticles = () => axios.get('/api/articles')
  .then(({ data }) => data.items);

export const getCategories = () => axios.get('/api/categories')
  .then(({ data }) => data.items);

