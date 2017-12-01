import { combineReducers } from 'redux';
import articles from './articles';
import categories from './categories';
import user from './user';

const app = combineReducers({
  articles,
  categories,
  user
});

export default app;
