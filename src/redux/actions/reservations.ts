import { Dispatch } from 'redux'
import { toast } from 'react-toastify'

import axios from '../../utils/axiosConfig'
import { ActionType, Action } from '../../types/actionsTypes'
import { INewReservation, IStripeCharge } from '../../types/reservationsTypes'
import { errorHandler } from '../../utils'

const {
  ADD_RESERVATION_REQUEST_PENDING,
  ADD_RESERVATION_REQUEST_SUCCESS,
  ADD_RESERVATION_REQUEST_FAILED
} = ActionType

const api = process.env.REACT_APP_API_URL

export const addReservationRequestPending = (): Action<any> => ({
  type: ADD_RESERVATION_REQUEST_PENDING
})

export const addReservationRequestSuccess = (data: IStripeCharge): Action<IStripeCharge> => ({
  type: ADD_RESERVATION_REQUEST_SUCCESS,
  payload: data
})

export const addReservationRequestFailed = (): Action<any> => ({
  type: ADD_RESERVATION_REQUEST_FAILED
})

export const addReservation = (reservation: INewReservation, stripeToken: string) => async (
  dispatch: Dispatch<Action<any>>
): Promise<IStripeCharge | undefined> => {
  try {
    dispatch(addReservationRequestPending())
    const {
      data: {
        data: { stripeCharge }
      }
    } = await axios.post(`${api}/reservations`, { ...reservation, stripeToken })
    dispatch(addReservationRequestSuccess(stripeCharge))
    return stripeCharge
  } catch (error) {
    dispatch(addReservationRequestFailed())
    toast.error(errorHandler(error.response))
  }
}
