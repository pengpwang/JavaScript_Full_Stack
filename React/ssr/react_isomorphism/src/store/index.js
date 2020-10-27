import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import clientAxios from '../client/request';
import serverAxios from '../server/request';
import { reducer as HomeReducer } from '../containers/Home/store';

const reducer = combineReducers({
  home: HomeReducer
});

export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
}

export const getClientStore = () => {
  const defaultStore = window.context.state;
  return createStore(reducer, defaultStore, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}
