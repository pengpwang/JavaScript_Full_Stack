import React from 'react';

class NotFound extends React.Component {
  componentWillMount() {
    // 服务端才会有staticContext，浏览器端为undefined
    if(this.props.staticContext){
      this.props.staticContext.notFound = true;
    }
  }

  render() {
    return <div>404, Not Found ~</div>
  }
}

export default NotFound;