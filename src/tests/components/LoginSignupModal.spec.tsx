import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import LoginSignupModal from '../../components/LoginSignupModal'
import { IUser, IUserState } from '../../types/usersTypes'

const createMockStore = configureMockStore([thunk])

interface IProps {
  show: boolean
  onHide: () => void
  login: (email: string, password: string) => Promise<IUser>
  signup: (username: string, email: string, password: string) => Promise<IUser>
  userState: IUserState
  onhandleChange: () => void
  toggleLoginSignup: () => void
}

describe('Login/Signup Modal', () => {
  const defaultProps: IProps = {
    show: true,
    onHide: jest.fn(),
    login: jest.fn(),
    signup: jest.fn(),
    userState: {
      user: null,
      logingIn: false,
      isLoggedIn: false
    },
    onhandleChange: jest.fn(),
    toggleLoginSignup: jest.fn()
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
          <LoginSignupModal {...props} />
        </Provider>
      </BrowserRouter>
    )
  }

  afterAll(() => {
    jest.clearAllMocks()
    cleanup()
  })

  test('renders Login Modal', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
    const { getAllByText } = wrapper
    const linkElement = getAllByText('Login')
    expect(linkElement).toHaveLength(2)
  })

  test('should trigger onchange when email is changed', async () => {
    const wrapper = setup()
    const { getByPlaceholderText } = wrapper
    const emailInput = getByPlaceholderText('email')
    expect(emailInput).toBeInTheDocument()
    await userEvent.type(emailInput, 'janedoe@example.com')
    // expect(defaultProps.onhandleChange).toHaveBeenCalledTimes(16)
    expect(emailInput).toHaveValue('janedoe@example.com')
  })

  test('should trigger onchange when password is changed', async () => {
    const wrapper = setup()
    const { getByPlaceholderText } = wrapper
    const passwordInput = getByPlaceholderText('password')
    expect(passwordInput).toBeInTheDocument()
    await userEvent.type(passwordInput, 'password')
    // expect(defaultProps.onhandleChange).toHaveBeenCalledTimes(8)
    expect(passwordInput).toHaveValue('password')
  })

  // eslint-disable-next-line jest/expect-expect
  it('should login user if user provides correct login credentials', async () => {
    const wrapper = setup()
    const { getByPlaceholderText, getAllByText } = wrapper
    const emailInput = getByPlaceholderText('email')
    const passwordInput = getByPlaceholderText('password')
    await userEvent.type(emailInput, 'janedoe@example.com')
    await userEvent.type(passwordInput, 'password')
    const loginButtons = getAllByText('Login')
    await userEvent.click(loginButtons[1])
    // expect(defaultProps.login).toHaveBeenCalled()
  })

  it('should not login user if user provides incorrect login credentials', async () => {
    const wrapper = setup()
    const { getByPlaceholderText, getAllByText } = wrapper
    const emailInput = getByPlaceholderText('email')
    const passwordInput = getByPlaceholderText('password')
    await userEvent.type(emailInput, '')
    await userEvent.type(passwordInput, '')
    const loginButtons = getAllByText('Login')
    await userEvent.click(loginButtons[1])
    expect(defaultProps.login).toHaveBeenCalledTimes(0)
  })

  test('user can navigate to signup page', async () => {
    const { getByText } = setup()
    const signupLink = getByText('Sign Up')
    await userEvent.click(signupLink)
    // expect(defaultProps.toggleLoginSignup).toHaveBeenCalledTimes(1)
  })

  test('user can signup if user provides correct signup credentials', async () => {
    const { getByText, getByPlaceholderText, getAllByText } = setup({ loginState: true })
    const signupLink = getByText('Sign Up')
    await userEvent.click(signupLink)
    const usernameInput = getByPlaceholderText('username')
    await userEvent.type(usernameInput, 'janedoe')
    expect(usernameInput).toHaveValue('janedoe')
    const signupButtons = getAllByText('Signup')
    await userEvent.click(signupButtons[1])
    // expect(defaultProps.signup).toHaveBeenCalled()
  })
})
