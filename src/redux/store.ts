import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import reducer from './rootReducer';
import logger from 'redux-logger';

const middleware = new MiddlewareArray().concat(logger);
const store = configureStore({
  reducer,
  middleware,
});

// useSelector 사용시 타입으로 사용하기 위함
export type RootState = ReturnType<typeof store.getState>;
// useDispatch를 좀 더 명확하게 사용하기 위함
export type AppDispatch = typeof store.dispatch;
export default store;
