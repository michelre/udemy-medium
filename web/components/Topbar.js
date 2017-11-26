import React from 'react';
import '../scss/topbar.scss';
import profileIcon from '../assets/profile-placeholder.jpg';
import mediumIcon from '../assets/medium.svg';
import * as R from 'ramda';
import {NavLink} from 'react-router-dom';
import Tooltip from 'react-portal-tooltip';
import TooltipContent from './TooltipContent';

class Topbar extends React.Component {

  constructor() {
    super();
    this.state = {
      tooltipUser: false,
    }
  }

  render() {
    const tooltipStyle = {
      style: {
        padding: 0,
        border: '1px solid rgba(0,0,0, 0.1)',
        boxShadow: 'none'
      },
      arrowStyle: {
        color: '#FFF',
        borderColor: 'rgba(0,0,0, 0.1)',
      }
    };
    const {categories} = this.props;
    if (!categories) return null;
    return <div className="topbar-container">
      <div>
        <div className="title-container">
          <button className="medium-btn">Upgrade</button>
          <img className="medium-logo" src={mediumIcon}/>
          <div>
            <i className="fa fa-search"/>
            <i className="fa fa-bell-o"/>
            <img className="profile" src={profileIcon} id="tooltip-parent"
                 onClick={() => this.setState({tooltipUser: !this.state.tooltipUser})}/>
            <Tooltip style={tooltipStyle} tooltipTimeout={0} active={this.state.tooltipUser} position="bottom" arrow="center" parent="#tooltip-parent">
              <TooltipContent/>
            </Tooltip>
          </div>
        </div>
        <ul className="categories-container">
          {R.map((category) => <li
            key={category.slug}>
            <NavLink
              exact
              activeClassName="selected"
              to={(category.slug === 'home') ? '/' : `/topic/${category.slug}`}
              className={(category.selected ? 'selected' : '')}>{category.name}</NavLink>
          </li>, categories)}
        </ul>
      </div>
    </div>
  }

}

export default Topbar;
