import { combineReducers } from 'redux'

import { IUserState } from '../../types/usersTypes'
import { IMenuState } from '../../types/menusTypes'
import usersReducer from './users'
import menusReducer from './menus'

export interface IRootState {
  userState: IUserState
  menuState: IMenuState
}

export default combineReducers<IRootState>({
  userState: usersReducer,
  menuState: menusReducer
})
