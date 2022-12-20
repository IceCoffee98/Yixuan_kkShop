import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loggerMiddleware } from './middleware/logger';

// root-reducer(combination of all our reducers)

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['user', 'categories'],
  whitelist: ['cart'],
};

const sageMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// not in production, render the logger
const middleWares = [process.env.NODE_ENV === 'development' && logger, sageMiddleware].filter(
  Boolean
);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

// after sagemiddle in the store is instantiated, run it
sageMiddleware.run(rootSaga);

export const persistor = persistStore(store);
