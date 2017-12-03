import { combineReducers } from 'redux';
import articles from './articles';
import categories from './categories';
import user from './user';
import ui from './ui';

const app = combineReducers({
  articles,
  categories,
  user,
  ui,
});

export default app;
