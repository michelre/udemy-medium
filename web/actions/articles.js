import { postArticle } from "../services";

export const addArticle = (article) => {
  return (dispatch) => {
    dispatch({ type: 'CREATE_ARTICLE_START' });
    return postArticle(article).then((articleResponse) => {
      dispatch({ type: 'CREATE_ARTICLE_SUCCESS', article: articleResponse });
      return articleResponse;
    })
  }
};
