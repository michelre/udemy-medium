import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as articleActions from '../actions/articles';
import '../scss/tooltip-content.scss';
import { withRouter } from 'react-router-dom';
import '../scss/tooltip-actions.scss';

class TooltipActions extends React.Component {

  handleDeleteStory(){
    const { history } = this.props;
    const { articleActions, article } = this.props;
    articleActions.deleteArticle(article.id).then(() => {
      history.push('/');
    });
  }

  render() {
    const { article } = this.props;
    return <div className="tooltip-actions-container">
      {
        (!article) ? <div className="tooltip--no-actions p-r-md p-l-md">Actions will become available after you start writing.</div> : <div>
          <ul>
            <li>Actions</li>
          </ul>
          <hr/>
          <ul>
            <li>Add to publication</li>
            <li>Revision history</li>
            <li className="cursor-pointer" onClick={() => this.handleDeleteStory()}>Delete Story</li>
          </ul>
          <hr/>
          <ul>
            <li>Customize title / subtitle</li>
            <li>Customize link</li>
          </ul>
        </div>

      }
    </div>
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { articleActions: bindActionCreators(articleActions, dispatch)  }
};

export default withRouter(connect(null, mapDispatchToProps)(TooltipActions));
