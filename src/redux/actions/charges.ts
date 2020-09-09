import { Dispatch } from 'redux'
import { toast } from 'react-toastify'

import axios from '../../utils/axiosConfig'
import { ActionType, Action } from '../../types/actionsTypes'
import { INewReservation } from '../../types/reservationsTypes'

const {
  CREATE_CHARGE_REQUEST_PENDING,
  CREATE_CHARGE_REQUEST_SUCCESS,
  CREATE_CHARGE_REQUEST_FAILED
} = ActionType

const api = process.env.REACT_APP_API_URL

export const createChargeRequestPending = (): Action<any> => ({
  type: CREATE_CHARGE_REQUEST_PENDING
})

export const createChargeRequestSuccess = (data: Record<string, unknown>): Action<any> => ({
  type: CREATE_CHARGE_REQUEST_SUCCESS,
  payload: data
})

export const createChargeRequestFailed = (): Action<any> => ({
  type: CREATE_CHARGE_REQUEST_FAILED
})

export const createReservationCharge = ({ date, time, type, persons }: any) => async (
  dispatch: Dispatch<Action<any>>
): Promise<any> => {
  try {
    dispatch(createChargeRequestPending())
    const {
      data: { data }
    } = await axios.post(`${api}/charges`, { date, time, type, persons })
    dispatch(createChargeRequestSuccess(data))
    return data
  } catch (error) {
    dispatch(createChargeRequestFailed())
    toast.error(error.message)
    throw error
  }
}
