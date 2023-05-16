import {combineReducers} from 'redux';
import usersReducer from '../components/User/store/user.reducer';

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
