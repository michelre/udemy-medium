import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import moment from 'moment';
import * as R from 'ramda';

import '../scss/article.scss';

class Article extends React.Component {


  render() {
    const { article } = this.props;
    return <div className="article-container">
      <div className="author-details">
        <img src={article.author.image}/>
        <div>
          <div className="author-name">{article.author.name}</div>
          <div>{moment(article.pubDate).format('MMM DD')} - {article.duration} min. read</div>
        </div>
      </div>
      <div className="section section--title">
        <h1>{article.title}</h1>
      </div>
      <div className="section section--content" dangerouslySetInnerHTML={{__html: article.content}} />
    </div>

  }
}

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  return {
    article: R.find((article) => article.id === match.params.articleId, state.articles)
  }
};

export default withRouter(connect(mapStateToProps)(Article));
