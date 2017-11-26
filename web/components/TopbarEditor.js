import React from 'react';
import '../scss/topbar.scss';
import profileIcon from '../assets/profile-placeholder.jpg';
import mediumIcon from '../assets/medium-compact.svg';
import * as R from 'ramda';
import {Link} from 'react-router-dom';
import Tooltip from 'react-portal-tooltip';
import TooltipContent from './TooltipContent';

class TopbarEditor extends React.Component {

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
    return <div className="topbar-editor-container">
      <div>
        <div className="title-container">
          <Link to="/">
            <img className="medium-logo" src={mediumIcon}/>
          </Link>
          <div>STATUS</div>
          <div>
            <div>Share</div>
            <div>Publish</div>
            <i>...</i>
            <i className="fa fa-bell-o"/>
            <img className="profile" src={profileIcon} id="tooltip-parent"
                 onClick={() => this.setState({tooltipUser: !this.state.tooltipUser})}/>
            <Tooltip style={tooltipStyle} tooltipTimeout={0} active={this.state.tooltipUser} position="bottom" arrow="center" parent="#tooltip-parent">
              <TooltipContent/>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  }

}

export default TopbarEditor;
