import React from 'react';
import {Link} from 'react-router-dom';
import ReactTooltip from 'react-tooltip'
import TooltipContent from './TooltipContent';
import TooltipPublish from './TooltipPublish';
import TooltipActions from './TooltipActions';

import mediumIcon from '../assets/medium-compact.svg';
import '../scss/topbar.scss';

class TopbarEditor extends React.Component {

  constructor(){
    super();
    this.publishTooltipRef = null;
  }

  renderTooltipPublish(){
    const { article, categories } = this.props;
    if(!article) {
      return <ReactTooltip id="tooltip-publish" globalEventOff='click' event="click" place="bottom">
        <span>Publishing will become available after you start writing</span>
      </ReactTooltip>
    }
    return <ReactTooltip id="tooltip-publish" type="light" className="react-tooltip-custom" event="click" place="bottom">
      <TooltipPublish tooltipRef={this.publishTooltipRef} categories={categories} article={article}/>
    </ReactTooltip>;

  }

  render() {
    const { article, user } = this.props;
    return <div className="topbar-editor-container">
      <div>
        <div className="title-container">
          <Link to="/">
            <img className="medium-logo m-r-md" src={mediumIcon}/>
          </Link>
          {(!article || !article.pubDate) ? <div className="m-r-md">Draft</div> : null}
          <div>{this.props.articleLoading ? 'Saving...' : 'Saved'}</div>
          <div>
            {(!article || !article.pubDate) ? <div>Share</div> : null}
            <div className="green-text cursor-pointer" ref={(e) => this.publishTooltipRef = e} data-for="tooltip-publish" data-tip="tooltip-publish">Publish <i className="fa fa-angle-down" /></div>
            {this.renderTooltipPublish()}
            <i className="other-actions cursor-pointer" data-for="tooltip-actions" data-tip="tooltip-actions">...</i>
            <ReactTooltip id="tooltip-actions" globalEventOff='click' type="light" className="react-tooltip-custom" event="click" place="bottom">
              <TooltipActions article={article}/>
            </ReactTooltip>
            <i className="fa fa-bell-o"/>
            <img className="profile cursor-pointer" src={user.image} id="tooltip-parent"
                 data-tip="tooltip-avatar"
                 data-for="tooltip-avatar" />
            <ReactTooltip id="tooltip-avatar" globalEventOff='click' type="light" className="react-tooltip-custom" event="click" place="bottom">
              <TooltipContent />
            </ReactTooltip>
          </div>
        </div>
      </div>
    </div>
  }

}

export default TopbarEditor;
