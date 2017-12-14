import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TopbarEditor from "./TopbarEditor";
import TopbarBase from "./TopbarBase";

const Topbar = (props) => {
  return <Switch>
    <Route exact path="/articles/new" render={() => <TopbarEditor {...props} />} />
    <Route exact path="/articles/:id/edit" render={() => <TopbarEditor {...props} />} />
    <Route path="/" render={() => <TopbarBase {...props} />} />
  </Switch>
}

export default Topbar;
