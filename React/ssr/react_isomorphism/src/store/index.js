import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import clientAxios from '../client/request';
import serverAxios from '../server/request';
import { reducer as HomeReducer } from '../shared/containers/Home/store';

const reducer = combineReducers({
  home: HomeReducer
});

export const getStore = (req) => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))));
}

export const getClientStore = () => {
  const defaultStore = window.context ? window.context.state : {};
  return createStore(reducer, defaultStore, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}
