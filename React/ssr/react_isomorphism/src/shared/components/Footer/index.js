import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getFooterList } from './store/actions';

class Footer extends React.Component {

  getFooterNewsList() {
    const { list } = this.props;
    return list.map(item => <div key={item.id}>{ item.title }</div>)
  }

  render() {
    return (
      <div>
        <div>Footer! {this.props.name}</div>
        { this.getFooterNewsList() }
        <button onClick={() => alert('Footer')}>click</button>
      </div>
    );
  }

  componentDidMount() {
    if(!this.props.list.length){
      this.props.getFooterList();
    }
  }
}

// loadData 函数负责在服务器端渲染之前，把这个路由需要的数据提前加载好
Footer.loadData = (store) => {
  return store.dispatch(getFooterList())
}

const mapStateToProps = (state) => ({
  list: state.footer.newsList,
  name: state.footer.name
});

const mapDispatchToProps = (dispatch) => ({
  getFooterList() {
    dispatch(getFooterList())
  }
});

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Home, styles));
export default connect(mapStateToProps, mapDispatchToProps)(Footer);