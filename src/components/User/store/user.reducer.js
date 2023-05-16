const initialState = {
  users: null,
  selectedUser: null,
  passedUsers: null,
  failedUsers: null,
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload.users.map(user => ({
          ...user,
          status: 'pending',
          score: 0,
          numberOfAttempts: 0,
        })),
        loading: false,
        error: null,
      };
    case 'FETCH_USERS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SELECT_USER':
      return {
        ...state,
        selectedUser: action.payload,
      };
    case 'UNSELECT_USER':
      return {
        ...state,
        selectedUser: null,
      };
    case 'MOVE_USER_TO_PASSED':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload ? {...user, status: 'passed'} : user,
        ),
      };
    case 'MOVE_USER_TO_FAILED':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload ? {...user, status: 'failed'} : user,
        ),
      };
    case 'UPDATE_USER_SCORE':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload ? {...user, score: user.score + 1} : user,
        ),
      };
    case 'RESET_USER_SCORE':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload ? {...user, score: 0} : user,
        ),
      };
    case 'UPDATE_USER_NUMBER_OF_ATTEMPTS':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload
            ? {...user, numberOfAttempts: user.numberOfAttempts + 1}
            : user,
        ),
      };
    default:
      return state;
  }
}
