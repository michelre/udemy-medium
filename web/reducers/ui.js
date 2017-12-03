import * as R from 'ramda';

const ui = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_ARTICLE_START':
      return R.merge(state, { articleLoading: true });
    case 'UPDATE_ARTICLE_SUCCESS':
      return R.merge(state, { articleLoading: false });
    case 'UPDATE_ARTICLE_ERROR':
      return R.merge(state, { articleLoading: false });
    default:
      return state;
  }
};

export default ui;
