import axios from 'axios';
import { CHANGE_HOME_LIST } from './contants';

const changeHomeList = (list) => ({
  type: CHANGE_HOME_LIST,
  list
});

const getHomeList = () => {
  return (dispatch) => {
    axios.get('http://localhost:4000/api/news')
      .then(res => {
        dispatch(changeHomeList(res.data.data));
      })
  }
}

export {
  getHomeList
}