import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { getArticles, getCategories, getUser } from './services';

const configureStore = () => {
  return Promise.all([getArticles(), getCategories(), getUser()]).then(
    ([articles, categories, user]) =>
      createStore(
        reducers,
        { articles, categories, user },
        applyMiddleware(thunk)
      )
  );
};

export default configureStore;
