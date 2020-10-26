import React, { Dispatch, SetStateAction } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import ReservationPage from '../../views/ReservationPage'
import { IUser, IUserState } from '../../types/usersTypes'
import { INewReservation } from '../../types/reservationsTypes'
import { user } from '../mocks/users.mock'

const createMockStore = configureMockStore([thunk])

interface IProps {
  setReservation: Dispatch<SetStateAction<INewReservation | null>>
  userState: IUserState
  onModalShow: () => void
}

describe('Login/Signup Modal', () => {
  const defaultProps: IProps = {
    setReservation: jest.fn(),
    userState: {
      user: user,
      logingIn: false,
      isLoggedIn: true
    },
    onModalShow: jest.fn()
  }

  const initialState = {
    userState: {
      user: user,
      logingIn: false,
      isLoggedIn: true
    }
  }
  const history = {
    push: jest.fn
  }

  const onhandleChange = jest.fn
  const handleSubmit = jest.fn
  const setup = (newProps?: any, newStore?: any) => {
    const props = { ...defaultProps, ...newProps }
    const store = createMockStore({
      ...initialState,
      userState: { ...initialState.userState, ...newStore }
    })

    return render(
      <BrowserRouter>
        <Provider store={store}>
          <ReservationPage
            {...props}
            history={history}
            onhandleChange={onhandleChange}
            handleSubmit={handleSubmit}
          />
        </Provider>
      </BrowserRouter>
    )
  }

  afterAll(() => {
    jest.clearAllMocks()
    cleanup()
  })

  test('renders Reservation Page', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
    const { getByText } = wrapper
    const linkElement = getByText('BOOK YOUR TABLE')
    expect(linkElement).toBeInTheDocument()
  })

  test('user is redirected to homepage if not looged in', async () => {
    const wrapper = setup(
      { userState: { ...defaultProps.userState, isLoggedIn: false } },
      { isLoggedIn: false }
    )
    const { findByText } = wrapper
    const linkElement = findByText('BOOK YOUR TABLE')
    waitFor(() => {
      expect(linkElement).not.toBeInTheDocument()
    })
  })

  test('should trigger onchange when date is changed', async () => {
    const wrapper = setup()
    const { getByTestId } = wrapper
    const dateInput = getByTestId('date')
    expect(dateInput).toBeInTheDocument()
    await userEvent.type(dateInput, '04/04/2020')
    waitFor(() => {
      expect(dateInput).toHaveValue('04/04/2020')
      expect(onhandleChange).toHaveBeenCalledTimes(10)
    })
  })

  it('should submit reservation if input is correct', async () => {
    const wrapper = setup()
    const { getByText, getByTestId } = wrapper
    const dateInput = getByTestId('date')
    const personsInput = getByTestId('persons')
    const timeInput = getByTestId('time')
    const typeInput = getByTestId('type')
    await userEvent.type(dateInput, '04/04/2020')
    await userEvent.type(personsInput, '3 persons')
    await userEvent.type(timeInput, '3:00')
    await userEvent.type(typeInput, 'dinner')
    const reservationButton = getByText('Book A Table')
    await userEvent.click(reservationButton)
    waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled()
    })
  })
})
