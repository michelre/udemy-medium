import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MediumEditor from 'medium-editor';
import * as articleActions from '../actions/articles';
import debounce from 'debounce';
import * as R from 'ramda';
import $ from 'jquery';
import '../scss/article-editor.scss';
import 'medium-editor/src/sass/medium-editor.scss';
import 'medium-editor/src/sass/themes/default.scss';
import 'medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css';

require('medium-editor-insert-plugin')($);

class ArticleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = null;
    this.editorTitleRef = null;
    this.handleChange = debounce(this.handleChange.bind(this), 1000);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const { article } = this.props;
    const placeholder = { placeholder: { text: 'Tell your story' } };
    const dom = ReactDOM.findDOMNode(this.editorRef);
    const titleDom = ReactDOM.findDOMNode(this.editorTitleRef);
    this.medium = new MediumEditor(dom, placeholder);
    this.mediumTitle = new MediumEditor(titleDom, placeholder);
    $(dom).mediumInsert({
      editor: this.medium,
      addons: {
        images: {
          preview: false,
          deleteScript: null,
          fileUploadOptions: {
            url: '/api/uploadImage',
          },
        },
      },
    });
    if (article && article.content) {
      this.medium.setContent(article.content);
    }
    if (article && article.title) {
      this.mediumTitle.setContent(article.title);
    }
    this.medium.subscribe('editableInput', (event, editable) => {
      this.handleChange($(editable).html(), 'content');
    });
    this.mediumTitle.subscribe('editableInput', (event, editable) => {
      this.handleChange($(editable).html(), 'title');
    });
  }

  handleChange(text, key) {
    const { match, articleActions, history, user } = this.props;
    if (!match.params.articleId) {
      articleActions.addArticle({ [key]: text, author: user }).then(article => {
        history.push(`/articles/${article.id}/edit`);
      });
    } else {
      articleActions.updateArticle(match.params.articleId, { [key]: text });
    }
  }

  render() {
    const { user, article } = this.props;
    return (
      <div className="article-editor-container">
        <div className="author-details m-t-md">
          <img src={user.image} />
          <div>
            <div className="author-name">{user.name}</div>
          </div>
        </div>

        <div className="m-t-lg">
          <h1 ref={elem => (this.editorTitleRef = elem)} />
          <div ref={elem => (this.editorRef = elem)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  return {
    user: state.user,
    article: R.find(
      article => article.id === match.params.articleId,
      state.articles
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return { articleActions: bindActionCreators(articleActions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditor);
