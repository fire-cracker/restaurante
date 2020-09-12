import { Dispatch } from 'redux'
import { toast } from 'react-toastify'

import axios from '../../utils/axiosConfig'
import { ActionType, Action } from '../../types/actionsTypes'
import { IMenu } from '../../types/menusTypes'

const {
  GET_MENUS_REQUEST_PENDING,
  GET_MENUS_REQUEST_SUCCESS,
  GET_MENUS_REQUEST_FAILED
} = ActionType

const api = process.env.REACT_APP_API_URL

export const getMenusRequestPending = (): Action<any> => ({
  type: GET_MENUS_REQUEST_PENDING
})

export const getMenusRequestSuccess = (data: {
  menus: IMenu[]
  count: number
}): Action<{ menus: IMenu[]; count: number }> => ({
  type: GET_MENUS_REQUEST_SUCCESS,
  payload: data
})

export const getMenusRequestFailed = (): Action<any> => ({
  type: GET_MENUS_REQUEST_FAILED
})

export const getMenus = () => async (
  dispatch: Dispatch<Action<any>>
): Promise<{ menus: IMenu[]; count: number }> => {
  try {
    dispatch(getMenusRequestPending())
    const {
      data: { data }
    } = await axios.get(`${api}/menus`)
    dispatch(getMenusRequestSuccess(data))
    return data
  } catch (error) {
    dispatch(getMenusRequestFailed())
    toast.error(error.message)
    throw error
  }
}
