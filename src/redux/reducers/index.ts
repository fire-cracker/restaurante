import { combineReducers } from 'redux'

import { IUserState } from '../../types/usersTypes'
import usersReducer from './users'

export interface IRootState {
  userState: IUserState
}

export default combineReducers<IRootState>({
  userState: usersReducer
})
