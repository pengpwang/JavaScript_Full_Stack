import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { getHomeList } from './store/actions';
class Home extends React.Component {

  getHomeNewsList() {
    const { list } = this.props;
    return list.map(item => <div key={item.id}>{ item.title }</div>)
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
        <div>Home! {this.props.name}</div>
        { this.getHomeNewsList() }
        <button onClick={() => alert(1)}>click</button>
      </Fragment>
    );
  }

  componentDidMount() {
    this.props.getHomeList();
  }
}

const mapStateToProps = (state) => ({
  list: state.home.newsList,
  name: state.home.name 
});

const mapDispatchToProps = (dispatch) => ({
  getHomeList() {
    dispatch(getHomeList())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);