import { combineReducers } from 'redux';

import usersReducer from './users';
import { IUserState } from '../../types/usersTypes'

export interface IRootState {
  user: IUserState
}

export default combineReducers<IRootState>({
  user: usersReducer
});