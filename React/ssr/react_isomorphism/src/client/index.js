import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import routes from '../routes';

const App = () => {
  return <BrowserRouter>
    {routes}
  </BrowserRouter>
}

ReactDom.hydrate(<App />, document.getElementById('root'));
