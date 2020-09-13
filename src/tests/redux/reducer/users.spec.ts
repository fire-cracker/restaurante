import userReducer from '../../../redux/reducers/users'
import { ActionType } from '../../../types/actionsTypes'
import { user, userState } from '../../mocks/users.mock'

const initialState = {
  user: null,
  logingIn: false,
  isLoggedIn: false
}

it('Should return default state', () => {
  const state = userReducer(undefined, {
    type: '@@INIT'
  })

  expect(state).toEqual(initialState)
})

it('Should handle GET_PROFILE_REQUEST_SUCCESS', () => {
  const state = userReducer(initialState, {
    type: ActionType.GET_PROFILE_REQUEST_SUCCESS,
    payload: user
  })
  expect(state).toEqual(userState)
})

it('Should handle GET_PROFILE_REQUEST_FAILED', () => {
  const state = userReducer(initialState, {
    type: ActionType.GET_PROFILE_REQUEST_FAILED
  })
  expect(state).toEqual({ user: null, logingIn: false, isLoggedIn: false })
})

it('Should handle LOGIN_REQUEST_PENDING', () => {
  const state = userReducer(initialState, {
    type: ActionType.LOGIN_REQUEST_PENDING
  })
  expect(state).toEqual({ user: null, logingIn: true, isLoggedIn: false })
})

it('Should handle LOGIN_REQUEST_SUCCESS', () => {
  const state = userReducer(initialState, {
    type: ActionType.LOGIN_REQUEST_SUCCESS,
    payload: user
  })
  expect(state).toEqual(userState)
})

it('Should handle LOGIN_REQUEST_FAILED', () => {
  const state = userReducer(initialState, {
    type: ActionType.LOGIN_REQUEST_FAILED
  })
  expect(state).toEqual({ user: null, logingIn: false, isLoggedIn: false })
})

it('Should handle SIGNUP_REQUEST_PENDING', () => {
  const state = userReducer(initialState, {
    type: ActionType.SIGNUP_REQUEST_PENDING
  })
  expect(state).toEqual({ user: null, logingIn: true, isLoggedIn: false })
})

it('Should handle SIGNUP_REQUEST_SUCCESS', () => {
  const state = userReducer(initialState, {
    type: ActionType.SIGNUP_REQUEST_SUCCESS,
    payload: user
  })
  expect(state).toEqual(userState)
})

it('Should handle SIGNUP_REQUEST_FAILED', () => {
  const state = userReducer(initialState, {
    type: ActionType.SIGNUP_REQUEST_FAILED
  })
  expect(state).toEqual({ user: null, logingIn: false, isLoggedIn: false })
})

it('Should handle LOGOUT_REQUEST_SUCCESS', () => {
  const state = userReducer(initialState, {
    type: ActionType.LOGOUT_REQUEST_SUCCESS
  })
  expect(state).toEqual({ user: null, logingIn: false, isLoggedIn: false })
})
