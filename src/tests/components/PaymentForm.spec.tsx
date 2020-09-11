import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import PaymentForm from '../../components/PaymentForm'
import { reservation } from '../mocks/reservations.mock'
import { INewReservation } from '../../types/reservationsTypes'
import * as mocks from '../mocks/stripe.mock'

const stripePromise = loadStripe('pk_test_s7dzKE4O2saVThp2USNgEFoW00hc0xxPft')

interface IProps {
  reservation: INewReservation
  history: any
  addReservation: (reservation: any, stripeToken: any) => any
}

describe('PaymentForm', () => {
  const props: IProps = {
    reservation: reservation,
    history: {},
    addReservation: jest.fn()
  }

  let mockStripe: any
  let mockElements: any
  let mockElement: any
  let simulateChange: any
  let simulateBlur: any
  let simulateFocus: any
  let simulateEscape: any
  let simulateReady: any
  let simulateClick: any

  beforeEach(() => {
    mockStripe = mocks.mockStripe()
    mockElements = mocks.mockElements()
    mockElement = mocks.mockElement()
    mockStripe.elements.mockReturnValue(mockElements)
    mockElements.create.mockReturnValue(mockElement)
    jest.spyOn(React, 'useLayoutEffect')
    mockElement.on = jest.fn((event, fn) => {
      switch (event) {
        case 'change':
          simulateChange = fn
          break
        case 'blur':
          simulateBlur = fn
          break
        case 'focus':
          simulateFocus = fn
          break
        case 'escape':
          simulateEscape = fn
          break
        case 'ready':
          simulateReady = fn
          break
        case 'click':
          simulateClick = fn
          break
        default:
          throw new Error('TestSetupError: Unexpected event registration.')
      }
    })
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  test('renders PaymentForm component', () => {
    const wrapper = render(
      <Elements stripe={null}>
        <PaymentForm {...props} />
      </Elements>
    )
    expect(wrapper).toMatchSnapshot()
  })

  test('should trigger onchange when card details is changed', async () => {
    const mockHandler = jest.fn()
    render(
      <Elements stripe={mockStripe}>
        {/* @ts-ignore */}
        <PaymentForm onChange={mockHandler} />
      </Elements>
    )
    const changeEventMock = Symbol('change')
    userEvent.type(mockElement, simulateChange(changeEventMock))
    expect(mockHandler).toHaveBeenCalledWith(changeEventMock)
  })

  test('should submit charge on click', async () => {
    const mockHandler = jest.fn()
    const { getByText } = render(
      <Elements stripe={mockStripe}>
        {/* @ts-ignore */}
        <PaymentForm onClick={mockHandler} />
      </Elements>
    )
    const payButton = getByText('Pay')
    userEvent.click(payButton)
    expect(mockHandler).toHaveBeenCalled()
  })
})
