import React from 'react';
import '../scss/tooltip-content.scss';
import { Link } from 'react-router-dom';

const TooltipContent = () => {
  return (
    <div className="tooltip-content-container">
      <ul>
        <li>Become a member</li>
      </ul>
      <hr />
      <ul>
        <li>
          <Link to="/articles/new">New Story</Link>
        </li>
        <li>Stories</li>
        <li>Series</li>
      </ul>
      <hr />
      <ul>
        <li>Medium Partner Program</li>
      </ul>
      <hr />
      <ul>
        <li>Bookmarks</li>
        <li>Publications</li>
      </ul>
    </div>
  );
};

export default TooltipContent;
