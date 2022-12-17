import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

// root-reducer(combination of all our reducers)

// custimize my own middleware
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) return next(action);

  console.log('type: ', action.type);
  console.log('paload: ', action.payload);
  console.log('current state: ', store.getState());

  next(action);

  console.log('next state: ', store.getState());
};

const middleWares = [logger];

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composeEnhancers);
