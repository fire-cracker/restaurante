import { Dispatch } from 'redux'
import { toast } from 'react-toastify'

import axios from '../../utils/axiosConfig'
import { ActionType, Action } from '../../types/actionsTypes'
import { IUser } from '../../types/usersTypes'

const {
  LOGIN_REQUEST_PENDING,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  SIGNUP_REQUEST_PENDING,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAILED,
  SET_USER_STATE,
  GET_PROFILE_REQUEST_PENDING,
  GET_PROFILE_REQUEST_SUCCESS,
  GET_PROFILE_REQUEST_FAILED,
  LOGOUT_REQUEST_SUCCESS
} = ActionType

const api = process.env.REACT_APP_API_URL

export const setLoggedInState = (data: IUser) => ({
  type: SET_USER_STATE,
  payload: data
})

export const loginRequestPending = () => ({
  type: LOGIN_REQUEST_PENDING
})

export const loginRequestSuccess = (data: IUser) => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: data
})

export const loginRequestFailed = () => ({
  type: LOGIN_REQUEST_FAILED
})

export const signupRequestPending = () => ({
  type: SIGNUP_REQUEST_PENDING
})

export const signupRequestSuccess = (data: IUser) => ({
  type: SIGNUP_REQUEST_SUCCESS,
  payload: data
})

export const signupRequestFailed = () => ({
  type: SIGNUP_REQUEST_FAILED
})

export const getProfileRequestPending = () => ({
  type: GET_PROFILE_REQUEST_PENDING
})

export const getProfileRequestSuccess = (data: IUser) => ({
  type: GET_PROFILE_REQUEST_SUCCESS,
  payload: data
})

export const getProfileRequestFailed = () => ({
  type: GET_PROFILE_REQUEST_FAILED
})

export const login = (email: string, password: string) => async (dispatch: Dispatch<Action<any>>) => {
  try {
    dispatch(loginRequestPending())
    const {
      data: {
        data: { user, token }
      }
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
        data: { user, token }
      }
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

export const getUserProfile = (userId: string) => async (dispatch: Dispatch<Action<any>>) => {
  try {
    dispatch(getProfileRequestPending())
    const {
      data: {
        data: { user }
      }
    } = await axios.get(`${api}/users/${userId}`)
    dispatch(getProfileRequestSuccess(user))
    return user
  } catch (error) {
    dispatch(getProfileRequestFailed())
    toast.error(error.response.data.data.message)
    throw error
  }
}

export const logout = () => async (dispatch: Dispatch<Action<any>>) => {
  localStorage.clear()
  dispatch({ type: LOGOUT_REQUEST_SUCCESS })
}
