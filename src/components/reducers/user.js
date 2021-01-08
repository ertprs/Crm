import {
  FETCH_USER,
  LOGIN_SUCCESS,
  LOG_OUT,
  STORE_USER_ERROR_MSG,
  SET_PROFILE_IMAGE,
  PUNCHED_IN,
  PUNCHED_OUT,
} from '../actions/types';

const initialState = {
  user: {},
  loading: true,
  errorMessage: '',
  isAuthenticated: false,
  punchedIn: false,
  punchOutDay: null,
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

    case PUNCHED_IN: 
    console.log('punchin', action);
    return {
      ...state,
      punchedIn: true,
      punchOutDay: action.punchOutDay,
    };
    case PUNCHED_OUT: 
    return {
      ...state,
      punchedIn: false,
    }
    case LOG_OUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default UserReducer;
