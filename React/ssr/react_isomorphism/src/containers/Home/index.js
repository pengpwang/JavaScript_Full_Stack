import React, { Fragment } from 'react';
import Header from '../../components/Header';

const Home = () => {
  return (
    <Fragment>
      <Header></Header>
      <div>Home!</div>
      <button onClick={() => alert(1)}>click</button>
    </Fragment>
  );
}

export default Home;