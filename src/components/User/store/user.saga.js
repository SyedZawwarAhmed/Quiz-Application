import {call, put, takeEvery} from 'redux-saga/effects';
import {getUsers} from './user.service';
import {
  fetchUsersError,
  fetchUsersRequest,
  fetchUsersSuccess,
} from './user.actions';

function* fetchUsers() {
  try {
    const response = yield call(getUsers);
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersError(error.message));
  }
}

function* usersSaga() {
  yield takeEvery(fetchUsersRequest().type, fetchUsers);
}

export default usersSaga;
