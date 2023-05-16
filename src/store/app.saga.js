import {all} from 'redux-saga/effects';
import userSaga from '../components/User/store/user.saga';

export default function* rootSaga() {
  yield all([userSaga()]);
}
