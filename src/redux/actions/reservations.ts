import { Dispatch } from 'redux'
import { toast } from 'react-toastify'

import axios from '../../utils/axiosConfig'
import { ActionType, Action } from '../../types/actionsTypes'
import { IUser } from '../../types/usersTypes'
import { IMenu } from '../../types/menusTypes'

const {
  ADD_RESERVATION_REQUEST_PENDING,
  ADD_RESERVATION_REQUEST_SUCCESS,
  ADD_RESERVATION_REQUEST_FAILED
} = ActionType

const api = process.env.REACT_APP_API_URL

export const addReservationRequestPending = (): Action<any> => ({
  type: ADD_RESERVATION_REQUEST_PENDING
})

export const addReservationRequestSuccess = (data: IUser): Action<IUser> => ({
  type: ADD_RESERVATION_REQUEST_SUCCESS,
  payload: data
})

export const addReservationRequestFailed = (): Action<any> => ({
  type: ADD_RESERVATION_REQUEST_FAILED
})

export const addReservation = () => async (
  dispatch: Dispatch<Action<any>>
): Promise<{ menus: IMenu[]; count: number }> => {
  try {
    dispatch(addReservationRequestPending())
    const {
      data: { data }
    } = await axios.post(`${api}/reservations`)
    dispatch(addReservationRequestSuccess(data))
    return data
  } catch (error) {
    dispatch(addReservationRequestFailed())
    toast.error(error.response.data.data.message)
    throw error
  }
}
