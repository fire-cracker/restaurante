import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  addReservationRequestPending,
  addReservationRequestSuccess,
  addReservation
} from '../../redux/actions/reservations'
import { stripeCharge, newReservation, invalidReservation } from '../mocks/reservations.mock'

import axios from '../../utils/axiosConfig'

const createMockStore = configureMockStore([thunk])

jest.mock('../../utils/axiosConfig')

describe('Users Profile actions', () => {
  const store = createMockStore({})
  beforeEach(() => {
    store.clearActions()
  })

  it('Should get the initial state of the store', () => {
    const store = createMockStore({})
    store.dispatch(addReservationRequestPending())
    const [action] = store.getActions()
    expect(action).toEqual({
      type: 'ADD_RESERVATION_REQUEST_PENDING'
    })
  })

  it('Should dispatch success when request to add reservation is successful', () => {
    const store = createMockStore({})
    store.dispatch(addReservationRequestSuccess(stripeCharge))
    const [action] = store.getActions()
    expect(action).toEqual({
      type: 'ADD_RESERVATION_REQUEST_SUCCESS',
      payload: stripeCharge
    })
  })

  it('Should post reservation if request is correct', async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          data: {
            stripeCharge
          }
        }
      })
    )
    const expectedActions = [
      {
        type: 'ADD_RESERVATION_REQUEST_PENDING'
      },
      {
        type: 'ADD_RESERVATION_REQUEST_SUCCESS',
        payload: stripeCharge
      }
    ]
    await store.dispatch(addReservation(newReservation))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('Should throw error if request to post reservation request is incorrect', async () => {
    axios.post.mockImplementationOnce(() => Promise.reject({ message: 'an error occurred' }))
    const expectedActions = [
      {
        type: 'ADD_RESERVATION_REQUEST_PENDING'
      },
      {
        type: 'ADD_RESERVATION_REQUEST_FAILED'
      }
    ]
    try {
      await store.dispatch(addReservation(invalidReservation))
    } catch (error) {
      expect(store.getActions()).toEqual(expectedActions)
    }
  })
})
