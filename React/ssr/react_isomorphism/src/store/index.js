import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import clientAxios from '../client/request';
import serverAxios from '../server/request';
import { reducer as HomeReducer } from '../shared/containers/Home/store';
import { reducer as FooterReducer } from '../shared/components/Footer/store';
 
const reducer = combineReducers({
  home: HomeReducer,
  footer: FooterReducer
});

export const getServerStore = (req) => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))));
}

export const getClientStore = () => {
  const defaultStore = window.context ? window.context.__INIT_STATE__ : {};
  return createStore(reducer, defaultStore, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}
