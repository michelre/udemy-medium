import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Articles from './Articles';
import Article from './Article';
import ArticleEditor from './ArticleEditor';
import Topbar from './Topbar';
import TopbarEditor from "./TopbarEditor";

class App extends React.Component {

  render(){
    const { location } = this.props;
    const topbar = (location.pathname === '/new-story') ? <TopbarEditor /> : <Topbar categories={this.props.categories}/>;
    return <div>
      {topbar}
      <Route exact path="/" component={Articles}/>
      <Route exact path="/topic/:category" component={Articles}/>
      <Route exact path="/:articleId" component={Article}/>
      <Route exact path="/new-story" component={ArticleEditor}/>
      <Route exact path="/:articleId/edit" component={ArticleEditor}/>
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    user: state.user,
  }
}

export default withRouter(connect(mapStateToProps )(App));
