import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import '../scss/article.scss';

class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      article: null
    }
  }

  componentDidMount() {
    const {match} = this.props;
    axios.get(`/api/articles/${match.params.articleId}`).then((d) => {
      this.setState({article: d.data})
    })
  }

  render() {
    const {article} = this.state;
    if (!article) {
      return null
    }
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

export default withRouter(connect()(Article));
