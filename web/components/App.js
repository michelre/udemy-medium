import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import Articles from './Articles';
import Article from './Article';
import ArticleEditor from './ArticleEditor';
import Topbar from './Topbar';
import * as R from 'ramda';

class App extends React.Component {

    render() {
        const {location, ui, categories, articles, user} = this.props;
        const articleId = R.split('/', location.pathname)[2];
        return (
            <div>
                <Topbar
                    user={user}
                    articleLoading={ui.articleLoading}
                    article={R.find(article => article.id === articleId, articles)}
                    categories={categories}
                />
                <Route exact path="/" component={Articles}/>
                <Route exact path="/topic/:category" component={Articles}/>
                <Route exact path="/articles/new" component={ArticleEditor}/>
                <Route exact path="/articles/:articleId/view" component={Article}/>
                <Route
                    exact
                    path="/articles/:articleId/edit"
                    component={ArticleEditor}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.articles,
        categories: state.categories,
        user: state.user,
        ui: state.ui,
    };
};

export default withRouter(connect(mapStateToProps)(App));
