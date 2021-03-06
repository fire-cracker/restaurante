import { ActionType, Action } from '../../types/actionsTypes'
import { IUserState } from '../../types/usersTypes'

const {
  LOGIN_REQUEST_PENDING,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  SIGNUP_REQUEST_PENDING,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAILED,
  GET_PROFILE_REQUEST_SUCCESS,
  GET_PROFILE_REQUEST_FAILED,
  LOGOUT_REQUEST_SUCCESS
} = ActionType

const initialState: IUserState = {
  user: null,
  logingIn: false,
  isLoggedIn: localStorage.token ? true : false
}
export default (state = initialState, action: Action<any>): IUserState => {
  switch (action.type) {
    case LOGIN_REQUEST_PENDING:
      return {
        ...state,
        logingIn: true
      }

    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        logingIn: false
      }

    case LOGIN_REQUEST_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        logingIn: false
      }

    case SIGNUP_REQUEST_PENDING:
      return {
        ...state,
        logingIn: true
      }

    case SIGNUP_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        logingIn: false
      }

    case SIGNUP_REQUEST_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        logingIn: false
      }

    case GET_PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true
      }

    case GET_PROFILE_REQUEST_FAILED:
      return {
        ...state,
        isLoggedIn: false
      }

    case LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        logingIn: false
      }

    default:
      return state
  }
}
