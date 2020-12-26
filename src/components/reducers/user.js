import {
  FETCH_USER,
  LOGIN_SUCCESS,
  LOG_OUT,
  STORE_USER_ERROR_MSG,
  SET_PROFILE_IMAGE,
} from '../actions/types';

const initialState = {
  user: {},
  loading: true,
  errorMessage: '',
  isAuthenticated: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SET_PROFILE_IMAGE:
      return {
        ...state,
        user: action.user,
      };

    case STORE_USER_ERROR_MSG:
      return {
        ...state,
        errorMessage: action.message,
      };
    case LOG_OUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};


export default UserReducer;
