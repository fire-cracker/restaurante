import menusReducer from '../../../redux/reducers/menus'
import { ActionType } from '../../../types/actionsTypes'
import { menus, menuState } from '../../mocks/menus.mock'

const initialState = {
  menus: null,
  count: 0,
  fetching: false,
  fetched: false
}

it('Should return default state', () => {
  const state = menusReducer(undefined, {
    type: '@@INIT'
  })

  expect(state).toEqual(initialState)
})

it('Should handle GET_MENUS_REQUEST_PENDING', () => {
  const state = menusReducer(initialState, {
    type: ActionType.GET_MENUS_REQUEST_PENDING
  })
  expect(state).toEqual({ menus: null, count: 0, fetching: true, fetched: false })
})

it('Should handle GET_MENUS_REQUEST_SUCCESS', () => {
  const state = menusReducer(initialState, {
    type: ActionType.GET_MENUS_REQUEST_SUCCESS,
    payload: { menus, count: 3 }
  })
  expect(state).toEqual(menuState)
})

it('Should handle GET_MENUS_REQUEST_FAILED', () => {
  const state = menusReducer(initialState, {
    type: ActionType.GET_MENUS_REQUEST_FAILED
  })
  expect(state).toEqual({ menus: null, count: 0, fetching: false, fetched: false })
})
