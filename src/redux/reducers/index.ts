import { combineReducers } from 'redux';

import usersReducer from './users';
import { IUserState } from '../../types/usersTypes'

export interface IRootState {
  userState: IUserState
}

export default combineReducers<IRootState>({
  userState: usersReducer
});