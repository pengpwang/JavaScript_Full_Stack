import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { getHomeList } from './store/actions';
class Home extends React.Component {
  render() {
    return (
      <Fragment>
        <Header></Header>
        <div>Home! {this.props.name}</div>
        <button onClick={() => alert(1)}>click</button>
      </Fragment>
    );
  }

  componentDidMount() {
    this.props.getHomeList();
  }
}

const mapStateToProps = (state) => ({
  name: state.home.name 
});

const mapDispatchToProps = (dispatch) => ({
  getHomeList() {
    dispatch(getHomeList())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);