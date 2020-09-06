import { Dispatch } from 'redux'
import { toast } from 'react-toastify'

import axios from '../../utils/axiosConfig'
import { ActionType, Action } from '../../types/actionsTypes'
import { IUser } from '../../types/usersTypes'

const { LOGIN_REQUEST_PENDING, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAILED, SIGNUP_REQUEST_PENDING, SIGNUP_REQUEST_SUCCESS, SIGNUP_REQUEST_FAILED, SET_LOGIN_STATE } = ActionType

const api = process.env.REACT_APP_API_URL
console.log('api>>>', api)

// export const setLoggedInState = (isLoggedIn, data) => ({
//   type: SET_LOGIN_STATE,
//   payload: data,
//   isLoggedIn
// });

export const loginRequestPending = () => ({
  type: LOGIN_REQUEST_PENDING,
})

export const loginRequestSuccess = (data: IUser) => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: data,
})

export const loginRequestFailed = () => ({
  type: LOGIN_REQUEST_FAILED,
})

export const signupRequestPending = () => ({
  type: SIGNUP_REQUEST_PENDING,
})

export const signupRequestSuccess = (data: IUser) => ({
  type: SIGNUP_REQUEST_SUCCESS,
  payload: data,
})

export const signupRequestFailed = () => ({
  type: SIGNUP_REQUEST_FAILED,
})

export const login = (email: string, password: string) => async (dispatch: Dispatch<Action<any>>) => {
  try {
    dispatch(loginRequestPending())
    const {
      data: {
        data: { user, token },
      },
    } = await axios.post(`${api}/auth/login`, { email, password })
    localStorage.setItem('token', token)
    dispatch(loginRequestSuccess(user))
    return user
  } catch (error) {
    dispatch(loginRequestFailed())
    toast.error(error.response.data.data.message)
    throw error
  }
}

export const signup = (username: string, email: string, password: string) => async (dispatch: Dispatch<Action<any>>) => {
  try {
    dispatch(signupRequestPending())
    const {
      data: {
        data: { user, token },
      },
    } = await axios.post(`${api}/auth/signup`, { username, email, password })
    localStorage.setItem('token', token)
    dispatch(signupRequestSuccess(user))
    return user
  } catch (error) {
    dispatch(signupRequestFailed())
    toast.error(error.response.data.data.message)
    throw error
  }
}
