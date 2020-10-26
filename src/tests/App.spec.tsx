import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import App from '../App'

const createMockStore = configureMockStore([thunk])
const store = createMockStore({
  userState: {
    user: null,
    logingIn: false,
    isLoggedIn: false
  },
  menuState: {
    menus: null,
    count: 0,
    fetching: false,
    fetched: false
  }
})

window.scrollTo = jest.fn()
describe('App', () => {
  const props = {}

  let wrapper: any
  beforeAll(() => {
    wrapper = render(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    )
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  test('renders App component', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
