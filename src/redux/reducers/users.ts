import { ActionType, Action } from '../../types/actionsTypes'
import { IUserState } from '../../types/usersTypes'

const { LOGIN_REQUEST_PENDING, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAILED, SIGNUP_REQUEST_PENDING, SIGNUP_REQUEST_SUCCESS, SIGNUP_REQUEST_FAILED } = ActionType

const initialState: IUserState = {
  user: null,
  logingIn: false,
  isLoggedIn: false,
}
export default (state = initialState, action: Action<any>): IUserState => {
  switch (action.type) {
    case LOGIN_REQUEST_PENDING:
      return {
        ...state,
        logingIn: true,
      }

    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        logingIn: false,
      }

    case LOGIN_REQUEST_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        logingIn: false,
      }

    case SIGNUP_REQUEST_PENDING:
      return {
        ...state,
        logingIn: true,
      }

    case SIGNUP_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        logingIn: false,
      }

    case SIGNUP_REQUEST_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        logingIn: false,
      }

    default:
      return state
  }
}
