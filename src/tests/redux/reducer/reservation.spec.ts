import reservationReducer from '../../../redux/reducers/reservations'
import { ActionType } from '../../../types/actionsTypes'
import { reservation, reservationState } from '../../mocks/reservations.mock'

const initialState = {
  reservation: null,
  fetching: false,
  fetched: false
}

it('Should return default state', () => {
  const state = reservationReducer(undefined, {
    type: '@@INIT'
  })

  expect(state).toEqual(initialState)
})

it('Should handle ADD_RESERVATION_REQUEST_PENDING', () => {
  const state = reservationReducer(initialState, {
    type: ActionType.ADD_RESERVATION_REQUEST_PENDING
  })
  expect(state).toEqual({ reservation: null, fetching: true, fetched: false })
})

it('Should handle ADD_RESERVATION_REQUEST_SUCCESS', () => {
  const state = reservationReducer(initialState, {
    type: ActionType.ADD_RESERVATION_REQUEST_SUCCESS,
    payload: reservation
  })
  expect(state).toEqual(reservationState)
})

it('Should handle ADD_RESERVATION_REQUEST_FAILED', () => {
  const state = reservationReducer(initialState, {
    type: ActionType.ADD_RESERVATION_REQUEST_FAILED
  })
  expect(state).toEqual({ reservation: null, fetching: false, fetched: false })
})
