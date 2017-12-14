import React from 'react';
import '../scss/topbar.scss';
import mediumIcon from '../assets/medium.svg';
import * as R from 'ramda';
import { NavLink, Link } from 'react-router-dom';
import TooltipContent from './TooltipContent';
import ReactTooltip from 'react-tooltip';

class TopbarBase extends React.Component {
  constructor() {
    super();
    this.state = {
      tooltipUser: false,
    };
  }

  render() {
    const { categories, article, user } = this.props;
    const showEditButton = article && article.author.name === user.name;
    if (!categories) return null;
    return (
      <div className="topbar-container">
        <div>
          <div className="title-container">
            <button className="medium-btn">Upgrade</button>
            <img className="medium-logo" src={mediumIcon} />
            <div>
              {showEditButton ? (
                <Link to={`/articles/${article.id}/edit`}>Edit</Link>
              ) : (
                ''
              )}
              <i className="fa fa-search" />
              <i className="fa fa-bell-o" />
              <img
                className="profile cursor-pointer"
                src={user.image}
                id="tooltip-parent"
                data-tip="tooltip"
                onClick={() =>
                  this.setState({ tooltipUser: !this.state.tooltipUser })
                }
              />
              <ReactTooltip
                globalEventOff="click"
                type="light"
                className="react-tooltip-custom"
                event="click"
                place="bottom"
              >
                <TooltipContent />
              </ReactTooltip>
            </div>
          </div>
          <ul className="categories-container">
            {R.map(
              category => (
                <li key={category.slug}>
                  <NavLink
                    exact
                    activeClassName="selected"
                    to={
                      category.slug === 'home' ? '/' : `/topic/${category.slug}`
                    }
                    className={category.selected ? 'selected' : ''}
                  >
                    {category.name}
                  </NavLink>
                </li>
              ),
              categories
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default TopbarBase;
