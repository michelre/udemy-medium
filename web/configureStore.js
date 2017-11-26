import {createStore} from 'redux';
import reducers from './reducers';
import {getArticles, getCategories} from "./services";

const configureStore = () => {
  return Promise.all([
    getArticles(),
    getCategories()
  ]).then(([articles, categories]) => createStore(reducers, { articles, categories }))
};

export default configureStore;
