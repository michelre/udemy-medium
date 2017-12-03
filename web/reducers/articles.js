import * as R from 'ramda';

const articles = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_ARTICLE_SUCCESS':
      return state.concat(action.article);
    case 'UPDATE_ARTICLE_SUCCESS':
      return R.map((article) => {
        if(article.id === action.article.id){
          return action.article;
        }
        return article;
      }, state);
    case 'PUBLISH_ARTICLE_SUCCESS':
      return R.map((article) => {
        if(article.id === action.article.id){
          return action.article;
        }
        return article;
      }, state);
    case 'DELETE_ARTICLE_SUCCESS':
      return R.filter((article) => article.id !== action.articleId, state);
    default:
      return state;
  }
};

export default articles;
