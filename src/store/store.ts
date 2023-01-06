import { compose, createStore, applyMiddleware, Middleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootSaga } from './root-saga';

import logger from 'redux-logger';
// import { rootReducer } from './root-reducer';
import { loggerMiddleware } from './middleware/logger';

import categoryReducer from './category/category.slice';
import cartReducer from './cart/cart.slice';
import userReducer from './user/user.slice';

// root-reducer(combination of all our reducers)

// export type RootState = ReturnType<typeof rootReducer>;

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }
const rootReducer = combineReducers({
  category: categoryReducer,
  cart: cartReducer,
  user: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};
const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  // blacklist: ['user', 'categories'],
  whitelist: ['cart'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sageMiddleware = createSagaMiddleware();

// not in production, render the logger
const middleWares = [process.env.NODE_ENV === 'development' && logger, sageMiddleware].filter(
  (middleware): middleware is Middleware => Boolean(middleware)
  // Boolean
);

// const composeEnhancer =
//   (process.env.NODE_ENV !== 'production' &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// export const store = createStore(persistedReducer, undefined, composeEnhancers);

// // after sagemiddle in the store is instantiated, run it
// sageMiddleware.run(rootSaga);

// export const persistor = persistStore(store);

// ===================== migrating to redux toolkit =====================
const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
});

// after sagemiddle in the store is instantiated, run it
sageMiddleware.run(rootSaga);
export const persistor = persistStore(store);

// export type NewRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
