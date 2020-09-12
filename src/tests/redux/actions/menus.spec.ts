import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  getMenusRequestPending,
  getMenusRequestSuccess,
  getMenus
} from '../../../redux/actions/menus'
import { menus } from '../../mocks/menus.mock'

import axios from '../../../utils/axiosConfig'

const createMockStore = configureMockStore([thunk])

jest.mock('../../../utils/axiosConfig')

describe('Users Profile actions', () => {
  const store = createMockStore({})
  beforeEach(() => {
    store.clearActions()
  })

  it('Should get the initial state of the store', () => {
    const store = createMockStore({})
    store.dispatch(getMenusRequestPending())
    const [action] = store.getActions()
    expect(action).toEqual({
      type: 'GET_MENUS_REQUEST_PENDING'
    })
  })

  it('Should dispatch success when request to add reservation is successful', () => {
    const store = createMockStore({})
    store.dispatch(getMenusRequestSuccess(menus))
    const [action] = store.getActions()
    expect(action).toEqual({
      type: 'GET_MENUS_REQUEST_SUCCESS',
      payload: menus
    })
  })

  it('Should post reservation if request is correct', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          data: {
            menus
          }
        }
      })
    )
    const expectedActions = [
      {
        type: 'GET_MENUS_REQUEST_PENDING'
      },
      {
        type: 'GET_MENUS_REQUEST_SUCCESS',
        payload: { menus }
      }
    ]
    await store.dispatch(getMenus())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('Should throw error if request to post reservation request is incorrect', async () => {
    axios.post.mockImplementationOnce(() => Promise.reject({ message: 'an error occurred' }))
    const expectedActions = [
      {
        type: 'GET_MENUS_REQUEST_PENDING'
      },
      {
        type: 'GET_MENUS_REQUEST_FAILED'
      }
    ]
    try {
      await store.dispatch(getMenus())
    } catch (error) {
      expect(store.getActions()).toEqual(expectedActions)
    }
  })
})
