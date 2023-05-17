export const fetchUsersRequest = () => ({
  type: 'FETCH_USERS_REQUEST',
});

export const fetchUsersSuccess = users => ({
  type: 'FETCH_USERS_SUCCESS',
  payload: users,
});

export const fetchUsersError = error => ({
  type: 'FETCH_USERS_ERROR',
  payload: error,
});

export const selectUser = user => ({
  type: 'SELECT_USER',
  payload: user,
});

export const unselectUser = user => ({
  type: 'UNSELECT_USER',
  payload: user,
});

export const moveUserToPassed = userId => ({
  type: 'MOVE_USER_TO_PASSED',
  payload: userId,
});

export const moveUserToFailed = userId => ({
  type: 'MOVE_USER_TO_FAILED',
  payload: userId,
});

export const updateUserScore = ({userId, score}) => ({
  type: 'UPDATE_USER_SCORE',
  payload: {userId, score},
});

export const resestUserScore = userId => ({
  type: 'RESET_USER_SCORE',
  payload: userId,
});

export const updateUserNumberOfAttempts = userId => ({
  type: 'UPDATE_USER_NUMBER_OF_ATTEMPTS',
  payload: userId,
});
