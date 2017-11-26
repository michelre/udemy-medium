import { combineReducers } from 'redux';
import articles from './articles';
import categories from './categories';

const app = combineReducers({
  articles,
  categories
});

export default app;
