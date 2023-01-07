import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import type { Middleware } from '@reduxjs/toolkit';

import { rootSaga } from './root-saga';

import categoryReducer from './category/category.slice';
import cartReducer from './cart/cart.slice';
import userReducer from './user/user.slice';

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

// ===================== migrating to redux toolkit =====================
export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
});

// after sagemiddle in the store is instantiated, run it
sageMiddleware.run(rootSaga);
export const persistor = persistStore(store);

// export type NewRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
