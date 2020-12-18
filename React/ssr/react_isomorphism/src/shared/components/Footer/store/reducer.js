import { CHANGE_FOOTER_LIST } from './contants';

const defaultState = {
  name: 'Footer Robin Li',
  newsList: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_FOOTER_LIST:
      return {
        ...state,
        newsList: action.list
      }
    default:
      return state;
  }
};