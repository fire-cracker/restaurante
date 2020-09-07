import { ActionType, Action } from '../../types/actionsTypes'
import { IMenuState } from '../../types/menusTypes'

const {
  GET_MENUS_REQUEST_PENDING,
  GET_MENUS_REQUEST_SUCCESS,
  GET_MENUS_REQUEST_FAILED
} = ActionType

const initialState: IMenuState = {
  menus: null,
  count: 0,
  fetching: false,
  fetched: false
}
export default (state = initialState, action: Action<any>): IMenuState => {
  switch (action.type) {
    case GET_MENUS_REQUEST_PENDING:
      return {
        ...state,
        fetching: true
      }

    case GET_MENUS_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        fetching: false,
        fetched: true
      }

    case GET_MENUS_REQUEST_FAILED:
      return {
        ...state,
        fetching: false,
        fetched: false
      }

    default:
      return state
  }
}
