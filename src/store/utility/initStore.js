import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

export default function initStore() {
  const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
  );

  return store;
}