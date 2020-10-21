import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';

const Home = (props) => {
  return (
    <Fragment>
      <Header></Header>
      <div>Home! {props.name1}</div>
      <button onClick={() => alert(1)}>click</button>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  name1: state.name 
});

export default connect(mapStateToProps, null)(Home);