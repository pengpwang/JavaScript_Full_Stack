import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from '../routes';
import getStore from '../store';

const App = () => {
  return (
    <Provider store={getStore()}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </Provider>
  )
}

ReactDom.hydrate(<App />, document.getElementById('root'));
