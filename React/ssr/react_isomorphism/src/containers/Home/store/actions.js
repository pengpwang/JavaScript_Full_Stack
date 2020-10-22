import axios from 'axios';

const getHomeList = () => {
  return () => {
    axios.get('http://localhost:4000/api/news')
      .then(res => {
        console.log(res);
      })
  }
}

export {
  getHomeList
}