import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions';
import withStyles from '../../withStyles';


import styles from './style.module.css';

class Home extends React.Component {
  // componentWillMount(){
  //   if(this.props.staticContext){
  //     console.log(styles._getCss());
  //   }
  // }
  getHomeNewsList() {
    const { list } = this.props;
    return list.map(item => <div key={item.id}>{ item.title }</div>)
  }

  render() {
    return (
      <div className={styles.wrap}>
        <div>Home! {this.props.name}</div>
        { this.getHomeNewsList() }
        <button onClick={() => alert(1)}>click</button>
      </div>
    );
  }

  componentDidMount() {
    if(!this.props.list.length){
      this.props.getHomeList();
    }
  }
}

// loadData 函数负责在服务器端渲染之前，把这个路由需要的数据提前加载好
Home.loadData = (store) => {
  return store.dispatch(getHomeList())
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Home, styles));