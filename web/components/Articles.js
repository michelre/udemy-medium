import React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import ArticleThumbnail from './ArticleThumbnail';
import { getVisibleArticles } from '../services';
import '../scss/articles.scss';

class Articles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
    };
  }

  render() {
    return (
      <div className="articles-container">
        {R.map(
          article => <ArticleThumbnail key={article.id} article={article} />,
          this.props.articles
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;

  return {
    articles: getVisibleArticles(state.articles, match.params.category),
  };
};

export default connect(mapStateToProps)(Articles);
