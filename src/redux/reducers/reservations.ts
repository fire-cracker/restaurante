import { ActionType, Action } from '../../types/actionsTypes'
import { IReservationState } from '../../types/reservationsTypes'

const {
  ADD_RESERVATION_REQUEST_PENDING,
  ADD_RESERVATION_REQUEST_SUCCESS,
  ADD_RESERVATION_REQUEST_FAILED
} = ActionType

const initialState: IReservationState = {
  reservation: null,
  fetching: false,
  fetched: false
}
export default (state = initialState, action: Action<any>): IReservationState => {
  switch (action.type) {
    case ADD_RESERVATION_REQUEST_PENDING:
      return {
        ...state,
        fetching: true
      }

    case ADD_RESERVATION_REQUEST_SUCCESS:
      return {
        ...state,
        reservation: action.payload,
        fetching: false,
        fetched: true
      }

    case ADD_RESERVATION_REQUEST_FAILED:
      return {
        ...state,
        fetching: false,
        fetched: false
      }

    default:
      return state
  }
}
