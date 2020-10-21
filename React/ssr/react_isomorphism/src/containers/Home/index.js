import React, { Fragment } from 'react';

const Home = () => {
  return (
    <Fragment>
      <div>Home!</div>
      <button onClick={() => alert(1)}>click</button>
    </Fragment>
  );
}

export default Home;