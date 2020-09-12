import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Header from '../../components/Header'
import { IUserState } from '../../types/usersTypes'

const createMockStore = configureMockStore([thunk])

interface IProps {
  executeScrollToMenu: (history: any) => void
  history: any
  onModalShow: () => void
  userState: IUserState
  logout: () => void
}

describe('Header', () => {
  const defaultProps: IProps = {
    executeScrollToMenu: jest.fn(),
    history: {},
    onModalShow: jest.fn(),
    userState: {
      user: null,
      logingIn: false,
      isLoggedIn: false
    },
    logout: jest.fn()
  }

  const initialState = {
    userState: {
      user: null,
      logingIn: false,
      isLoggedIn: false
    }
  }

  const setup = (newProps?: any, newStore?: any) => {
    const props = { ...defaultProps, ...newProps }
    const store = createMockStore({
      ...initialState,
      userState: { ...initialState.userState, ...newStore }
    })

    return render(
      <BrowserRouter>
        <Provider store={store}>
          <Header {...props} />
        </Provider>
      </BrowserRouter>
    )
  }

  afterAll(() => {
    jest.clearAllMocks()
    cleanup()
  })

  test('renders Header component', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
    const { getByText } = wrapper
    const linkElement = getByText('LOGIN')
    expect(linkElement).toBeInTheDocument()
  })

  test('show login page on click login', async () => {
    const { getByText } = setup()
    const loginButton = getByText('LOGIN')
    await userEvent.click(loginButton)
    expect(defaultProps.onModalShow).toHaveBeenCalledTimes(1)
  })

  test('user can navigate to menu page', async () => {
    const { getByText } = setup()
    const menuLink = getByText('MENU')
    await userEvent.click(menuLink)
    expect(defaultProps.executeScrollToMenu).toHaveBeenCalledTimes(1)
  })

  test('user can see logout button and logout if logged in', async () => {
    const { getByText } = setup(
      { userState: { ...defaultProps.userState, isLoggedIn: true } },
      { isLoggedIn: true }
    )
    const logoutButton = await getByText('LOGOUT')
    expect(logoutButton).toBeInTheDocument()
    await userEvent.click(logoutButton)
    // expect(defaultProps.logout).toHaveBeenCalledTimes(1)
  })
})
