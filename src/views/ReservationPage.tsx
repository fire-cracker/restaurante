import React, { FC, useState, useEffect, ReactElement, Dispatch, SetStateAction } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Wrapper from '../components/Wrapper'
import { IRootState } from '../redux/reducers'
import { IUserState } from '../types/usersTypes'
import { INewReservation } from '../types/reservationsTypes'

interface IProps extends RouteComponentProps {
  setReservation: Dispatch<SetStateAction<INewReservation | null>>
  userState: IUserState
  onModalShow: () => void
}

const ReservationPage: FC<IProps> = ({
  history,
  setReservation,
  userState,
  onModalShow
}): ReactElement => {
  const [validated, setValidated] = useState(false)
  const [reservationState, setReservationState] = useState({
    date: '',
    time: '',
    persons: 1,
    type: 'breakfast'
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!userState.isLoggedIn) {
      onModalShow()
      history.push('/')
    }
  }, [userState.isLoggedIn, onModalShow, history])

  const onhandleChange = ({
    target: { name, value }
  }: {
    target: { name: string; value: string }
  }) => {
    setReservationState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (event: any) => {
    const form = event.currentTarget
    if (form && form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
    setReservation(reservationState)
    history.push('/checkout')
  }

  return (
    <div className="reservation-wrapper">
      <Wrapper>
        <Row>
          <Col className="form-col justify-content-center align-items-center" lg={8}>
            <Row className="reservation-header mb-4 flex-column justify-content-center align-items-center">
              <Col>
                <h4 className="text-darkkhaki">FOOD AT FIRST SIGHT</h4>
              </Col>
              <Col>
                <h2>Our Restaurant Menu</h2>
              </Col>
              <Col className="divider mt-1 mb-3 text-darkkhaki d-flex flex-row justify-content-center align-items-center">
                <p className="line my-2 mx-1">&nbsp;</p>
                <p className="icon">
                  <img src="/images/entwined.svg" alt="entwined" className="fa fa-cutlery"></img>
                </p>
                <p className="line my-2 mx-1">&nbsp;</p>
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label></Form.Label>
                    <Form.Control as="select" name="persons" onChange={onhandleChange}>
                      <option>1 person</option>
                      <option>2 persons</option>
                      <option>3 persons</option>
                      <option>4 persons</option>
                      <option>5 persons</option>
                      <option>6 persons</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Label></Form.Label>
                    <Form.Control
                      required
                      name="date"
                      type="date"
                      placeholder="Date"
                      onChange={onhandleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Label></Form.Label>
                    <Form.Control
                      required
                      name="time"
                      type="time"
                      placeholder="Time"
                      onChange={onhandleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label></Form.Label>
                    <Form.Control as="select" name="type" onChange={onhandleChange}>
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Dinner</option>
                      <option>Drinks</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row className="justify-content-center align-items-center">
                  <Button className="bg-black" type="submit">
                    Book A Table
                  </Button>
                </Form.Row>
              </Form>
            </Row>
          </Col>
          <Col lg={3}>
            <Card>Hello</Card>
          </Col>
        </Row>
      </Wrapper>
    </div>
  )
}

const mapStateToProps = (state: IRootState) => ({ userState: state.userState })
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationPage)
