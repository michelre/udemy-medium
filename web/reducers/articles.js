import * as R from 'ramda';

const articles = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_ARTICLE_SUCCESS':
      return state.concat(action.article);
    default:
      return state;
  }
};

export default articles;
