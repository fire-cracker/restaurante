import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import PaymentForm from '../../components/PaymentForm'
import { reservation, stripeCharge } from '../mocks/reservations.mock'
import { INewReservation, IStripeCharge } from '../../types/reservationsTypes'
import * as mocks from '../mocks/stripe.mock'

interface IProps {
  reservation: INewReservation
  history: any
  addReservation: (reservation: any, stripeToken: any) => Promise<IStripeCharge>
  handleSubmit: () => void
}

describe('PaymentForm', () => {
  const props: IProps = {
    reservation: reservation,
    history: {},
    addReservation: jest.fn().mockResolvedValue({ stripeCharge }),
    handleSubmit: jest.fn()
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

  // test('should trigger onchange when card details is changed', async () => {
  //   const mockHandler = jest.fn()
  //   render(
  //     <Elements stripe={mockStripe}>
  //       {/* @ts-ignore */}
  //       <PaymentForm {...props} onClick={mockHandler} />
  //     </Elements>
  //   )
  //   const changeEventMock = Symbol('change')
  //   userEvent.type(mockElement, simulateChange(changeEventMock))
  //   waitFor(() => {
  //     expect(mockHandler).toHaveBeenCalledWith(changeEventMock)
  //   })
  // })

  test('should submit charge on click if there is reservation', async () => {
    const mockHandler = jest.fn()
    const { getByText } = render(
      <Elements stripe={mockStripe}>
        {/* @ts-ignore */}
        <PaymentForm {...props} onClick={mockHandler} />
      </Elements>
    )
    const payButton = getByText('Pay $2000')
    userEvent.click(payButton)
    waitFor(() => {
      expect(mockHandler).toHaveBeenCalled()
    })
  })

  // test('should not show price if there is no reservation', async () => {
  //   const { findByText } = render(
  //     <Elements stripe={mockStripe}>
  //       {/* @ts-ignore */}
  //       <PaymentForm />
  //     </Elements>
  //   )
  //   const payButton = await findByText('Pay $2000')
  //   expect(payButton).not.toBeInTheDocument()
  // })
})
