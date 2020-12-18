import { CHANGE_FOOTER_LIST } from './contants';

const changeFooterList = (list) => ({
  type: CHANGE_FOOTER_LIST,
  list
});

const getFooterList = () => {
  return (dispatch, getState, request) => {
    return request.get('/api/footer_news')
      .then(res => {
        dispatch(changeFooterList(res.data.data));
      })
      .catch(e => console.log(222, e)); // 错误处理，及日志记录
  }
}

export {
  getFooterList
}