import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import Editor from 'react-medium-editor';
import * as articleActions from '../actions/articles';
import debounce from 'debounce';

import '../scss/article-editor.scss';
import 'medium-editor/src/sass/medium-editor.scss'
import 'medium-editor/src/sass/themes/default.scss';

class ArticleEditor extends React.Component {

  handleChange(text, medium) {
    const { match, articleActions, history } = this.props;
    if(!match.params.articleId){
      articleActions.addArticle({}).then((article) => {
        history.push(`/${article.id}/edit`);
      })
    } else {
      const fn = debounce(() => console.log(match.params.articleId), 2000)
      fn();
    }
    //const { }
  }

  render() {
    const {user} = this.props;
    return <div className="article-editor-container">
      <div className="author-details m-t-md">
        <img src={user.image}/>
        <div>
          <div className="author-name">{user.name}</div>
        </div>
      </div>

      <Editor
        tag="pre"
        onChange={() => this.handleChange()}
      />

    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {user: state.user}
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { articleActions: bindActionCreators(articleActions, dispatch)  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditor);
