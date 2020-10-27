import { CHANGE_HOME_LIST } from './contants';

const changeHomeList = (list) => ({
  type: CHANGE_HOME_LIST,
  list
});

const getHomeList = () => {
  return (dispatch, getState, request) => {
    return request.get('/api/news')
      .then(res => {
        dispatch(changeHomeList(res.data.data));
      }).catch(e => console.log(111, e));
  }
}

export {
  getHomeList
}