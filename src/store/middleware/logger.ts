import { Middleware } from 'redux';
import { RootState } from '../store';
// custimize my own middleware
export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (!action.type) return next(action);
  console.log('------------------------------------------------------------------------------');
  console.log('type: ', action.type);
  console.log('paload: ', action.payload);
  console.log('current state: ', store.getState());

  next(action);

  console.log('next state: ', store.getState());
};
