import React, { FC, useEffect, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import Row from 'react-bootstrap/Row'
import Wrapper from '../components/Wrapper'
import { addReservation } from '../redux/actions/reservations'
import PaymentForm from '../components/PaymentForm'
import { IRootState } from '../redux/reducers'
import { INewReservation, IStripeCharge } from '../types/reservationsTypes'
import { IUserState } from '../types/usersTypes'

const stripeKey = process.env.REACT_APP_STRIPE_KEY
const stripePromise = loadStripe(stripeKey || '')

interface IProps extends RouteComponentProps {
  reservation: INewReservation | null
  addReservation: (
    reservation: INewReservation,
    stripeToken: string
  ) => Promise<IStripeCharge | undefined>
  userState: IUserState
}

const Checkout: FC<IProps> = ({
  history,
  reservation,
  addReservation,
  userState
}): ReactElement => {
  if (reservation === null) history.push('/reservation')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!userState.isLoggedIn) {
      history.push('/')
    }
  }, [userState.isLoggedIn, history])

  return (
    <div className="checkout-form">
      <Wrapper>
        <Row className="checkout-wrapper justify-content-center align-items-center">
          <Elements stripe={stripePromise}>
            <PaymentForm
              reservation={reservation}
              addReservation={addReservation}
              history={history}
            />
          </Elements>
        </Row>
      </Wrapper>
    </div>
  )
}

const mapStateToProps = (state: IRootState) => ({ userState: state.userState })
const mapDispatchToProps = { addReservation }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
