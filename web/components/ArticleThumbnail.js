import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "../scss/article-thumbnail.scss";

import noImage from '../assets/no-image.jpg';

const ArticleThumbnail = ({ article }) => {
  return <Link to={`/articles/${article.id}/view`} className="article-thumb">
    <div className="thumbnail-image" style={{ backgroundImage: `url(${article.thumbnail || noImage})` }}></div>
    <div>
      <div className="content">
        <h3>{article.title}</h3>
        <h4>{article.description}</h4>
        <div className="extra-infos">
          <div className="author-details">
            <img src={article.author.image} />
            <div>
              <div className="author-name">{article.author.name}</div>
              <div>{(!article.pubDate) ? 'Draft' : `${moment(article.pubDate).format('MMM DD')} - ${article.duration} min. read`}</div>
            </div>
          </div>
          <div>
            <i className="fa fa-bookmark-o" /> <i className="fa fa-chevron-down" />
          </div>
        </div>
      </div>
    </div>
  </Link>
};

export default ArticleThumbnail;
