import {postArticle, putArticle, publishArticle, deleteArticleAPI} from "../services";

export const addArticle = (article) => {
  return (dispatch) => {
    dispatch({ type: 'CREATE_ARTICLE_START' });
    return postArticle(article).then((articleResponse) => {
      dispatch({ type: 'CREATE_ARTICLE_SUCCESS', article: articleResponse });
      return articleResponse;
    })
  }
};

export const updateArticle = (id, article) => {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_ARTICLE_START' });
    return new Promise((res) => {
      setTimeout(() => {
        putArticle(id, article).then((articleResponse) => {
          dispatch({ type: 'UPDATE_ARTICLE_SUCCESS', article: articleResponse });
          return res(articleResponse);
        })
      }, 1000)
    });
  }
};

export const publish = (article) => {
  return (dispatch) => {
    dispatch({ type: 'PUBLISH_ARTICLE_START' });
    return publishArticle(article).then((articleResponse) => {
      dispatch({ type: 'PUBLISH_ARTICLE_SUCCESS', article: articleResponse });
      return articleResponse;
    })
  }
};

export const deleteArticle = (id) => {
  return (dispatch) => {
    dispatch({ type: 'DELETE_ARTICLE_START' });
    return deleteArticleAPI(id).then(() => {
      dispatch({ type: 'DELETE_ARTICLE_SUCCESS', articleId: id });
      return true;
    })
  }
};
