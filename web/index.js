import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';

import Root from './components/Root';

configureStore().then(store => {
  ReactDOM.render(<Root store={store} />, document.querySelector('#app'));
});
