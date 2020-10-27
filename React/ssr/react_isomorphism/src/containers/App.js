import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from '../components/Header';

const App = (props) => {
  return <div>
    <Header></Header>
    <div className="App_Wrap">{ renderRoutes(props.route.routes) }</div>
  </div>
};

export default App;