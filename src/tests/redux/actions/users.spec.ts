import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  setLoggedInState,
  loginRequestPending,
  loginRequestSuccess,
  login,
  signupRequestPending,
  signupRequestSuccess,
  signup,
  getProfileRequestPending,
  getProfileRequestSuccess,
  getUserProfile
} from '../../../redux/actions/users'
import { user, loginUser, signupUser, invalidUser, userToken } from '../../mocks/users.mock'

import axios from '../../../utils/axiosConfig'

const createMockStore = configureMockStore([thunk])

jest.mock('../../../utils/axiosConfig')

describe('Users actions', () => {
  const store = createMockStore({})
  describe('Users Login actions', () => {
    beforeEach(() => {
      store.clearActions()
    })

    it('Should get the initial state of the store', () => {
      const store = createMockStore({})
      store.dispatch(loginRequestPending())
      const [action] = store.getActions()
      expect(action).toEqual({
        type: 'LOGIN_REQUEST_PENDING'
      })
    })

    it('Should dispatch success when login is successful', () => {
      const store = createMockStore({})
      store.dispatch(loginRequestSuccess(user))
      const [action] = store.getActions()
      expect(action).toEqual({
        type: 'LOGIN_REQUEST_SUCCESS',
        payload: user
      })
    })

    it('Should dispatch login state when page is mounted', () => {
      const store = createMockStore({})
      store.dispatch(setLoggedInState(user))
      const [action] = store.getActions()
      expect(action).toEqual({
        type: 'SET_USER_STATE',
        payload: user
      })
    })

    it('Should login when submit is clicked', async () => {
      axios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: {
              user,
              token: userToken
            }
          }
        })
      )
      const expectedActions = [
        {
          type: 'LOGIN_REQUEST_PENDING'
        },
        {
          type: 'LOGIN_REQUEST_SUCCESS',
          payload: {
            id: 'pi_1HPM4cIqdNTqIhB4sXZMgec',
            username: 'oyedejipeace',
            email: 'oyedejipeace@yahoo.com',
            role: 'customer'
          }
        }
      ]
      await store.dispatch(login(loginUser))
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('Should throw an error if login request fails', async () => {
      axios.post.mockImplementationOnce(() => Promise.reject('an error occurred'))
      try {
        await store.dispatch(login(invalidUser))
      } catch (error) {
        expect(error).toEqual('an error occurred')
      }
    })
  })

  describe('Users signup actions', () => {
    beforeEach(() => {
      store.clearActions()
    })

    it('Should get the initial state of the store', () => {
      const store = createMockStore({})
      store.dispatch(signupRequestPending())
      const [action] = store.getActions()
      expect(action).toEqual({
        type: 'SIGNUP_REQUEST_PENDING'
      })
    })

    it('Should dispatch success when create order is successful', () => {
      const store = createMockStore({})
      store.dispatch(signupRequestSuccess(user))
      const [action] = store.getActions()
      expect(action).toEqual({
        type: 'SIGNUP_REQUEST_SUCCESS',
        payload: user
      })
    })

    it('Should signup user if request is correct', async () => {
      axios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: {
              user,
              token: userToken
            }
          }
        })
      )
      const expectedActions = [
        {
          type: 'SIGNUP_REQUEST_PENDING'
        },
        {
          type: 'SIGNUP_REQUEST_SUCCESS',
          payload: user
        }
      ]
      await store.dispatch(signup(signupUser))
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('Should throw error if user signup request is incorrect', async () => {
      axios.post.mockImplementationOnce(() => Promise.reject({ message: 'an error occurred' }))
      const expectedActions = [
        {
          type: 'SIGNUP_REQUEST_PENDING'
        },
        {
          type: 'SIGNUP_REQUEST_FAILED'
        }
      ]
      try {
        await store.dispatch(signup(invalidUser))
      } catch (error) {
        expect(store.getActions()).toEqual(expectedActions)
      }
    })
  })

  describe('Users Profile actions', () => {
    beforeEach(() => {
      store.clearActions()
    })

    it('Should get the initial state of the store', () => {
      const store = createMockStore({})
      store.dispatch(getProfileRequestPending())
      const [action] = store.getActions()
      expect(action).toEqual({
        type: 'GET_PROFILE_REQUEST_PENDING'
      })
    })

    it('Should dispatch success when request to get user profile is successful', () => {
      const store = createMockStore({})
      store.dispatch(getProfileRequestSuccess(user))
      const [action] = store.getActions()
      expect(action).toEqual({
        type: 'GET_PROFILE_REQUEST_SUCCESS',
        payload: user
      })
    })

    it('Should get user profile if request is correct', async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: {
              user
            }
          }
        })
      )
      const expectedActions = [
        {
          type: 'GET_PROFILE_REQUEST_PENDING'
        },
        {
          type: 'GET_PROFILE_REQUEST_SUCCESS',
          payload: user
        }
      ]
      await store.dispatch(getUserProfile('pi_1HPM4cIqdNTqIhB4sXZMgec'))
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('Should throw error if request to get profile request is incorrect', async () => {
      axios.get.mockImplementationOnce(() => Promise.reject({ message: 'an error occurred' }))
      const expectedActions = [
        {
          type: 'GET_PROFILE_REQUEST_PENDING'
        },
        {
          type: 'GET_PROFILE_REQUEST_FAILED'
        }
      ]
      try {
        await store.dispatch(getUserProfile(invalidUser))
      } catch (error) {
        expect(store.getActions()).toEqual(expectedActions)
      }
    })
  })
})
