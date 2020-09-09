import { combineReducers } from 'redux'

import { IUserState } from '../../types/usersTypes'
import { IMenuState } from '../../types/menusTypes'
import { IReservationState } from '../../types/reservationsTypes'
import usersReducer from './users'
import menusReducer from './menus'
import reservationsReducer from './reservations'

export interface IRootState {
  userState: IUserState
  menuState: IMenuState
  reservationState: IReservationState
}

export default combineReducers<IRootState>({
  userState: usersReducer,
  menuState: menusReducer,
  reservationState: reservationsReducer
})
