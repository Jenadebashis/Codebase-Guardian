import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import scanReducer from './scanReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  scans: scanReducer
});
