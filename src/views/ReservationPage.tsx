import React, { FC, useState } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ReservationPage: FC = () => {
  const [validated, setValidated] = useState(false)
  const [ReservationState, setReservationState] = useState({
    person: 1,
    date: '',
    time: '',
    type: '',
    cost: '',
    order: []
  })

  const onhandleChange = ({ target: { name, value } }: { target: { name: string, value: any }}) => {
    setReservationState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    console.log('state>>>>', ReservationState)
  }

  const handleSubmit = (event: any) => {
    const form = event.currentTarget
    if (form && form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  return (
    <Jumbotron fluid className='p-0'>
      <Container fluid>
        <Row className='top-banner'></Row>
        <Row className='reservation-wrapper px-0'>
          <Container className='container-body d-flex flex-column justify-content-center align-items-center'>
            <Card className='mt-n5'>
              <Card.Body className=''>
                <Row>
                  <Col className='form-col justify-content-center align-items-center' lg={8}>
                    <Row className='reservation-header mb-4 flex-column justify-content-center align-items-center'>
                      <Col>
                        <h4 className='text-darkkhaki'>FOOD AT FIRST SIGHT</h4>
                      </Col>
                      <Col>
                        <h2>Our Restaurant Menu</h2>
                      </Col>
                      <Col className='divider mt-1 mb-3 text-darkkhaki d-flex flex-row justify-content-center align-items-center'>
                        <p className='line my-2 mx-1'>&nbsp;</p>
                        <p className='icon'>
                          <img src='/images/entwined.svg' alt='entwined' className='fa fa-cutlery'></img>
                        </p>
                        <p className='line my-2 mx-1'>&nbsp;</p>
                      </Col>
                    </Row>
                    <Row className='justify-content-center align-items-center'>
                      <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                          <Form.Group as={Col} controlId='formGridState'>
                            <Form.Label></Form.Label>
                            <Form.Control as='select' onChange={onhandleChange}>
                              <option>1 person</option>
                              <option>2 person</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group as={Col} md='4' controlId='validationCustom01'>
                            <Form.Label></Form.Label>
                            <Form.Control required type='text' placeholder='Date' onChange={onhandleChange}/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group as={Col} md='4' controlId='validationCustom02'>
                            <Form.Label></Form.Label>
                            <Form.Control required type='text' placeholder='Time' onChange={onhandleChange}/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group as={Col} controlId='formGridState'>
                            <Form.Label></Form.Label>
                            <Form.Control as='select' onChange={onhandleChange}>
                              <option>Breakfast</option>
                              <option>Lunch</option>
                              <option>Dinner</option>
                              <option>Drinks</option>
                            </Form.Control>
                          </Form.Group>
                        </Form.Row>

                        <Form.Row className='justify-content-center align-items-center'>
                        <Button className='bg-black' type='submit'>Book A Table</Button>
                        </Form.Row>
                      </Form>
                    </Row>
                  </Col>
                  <Col lg={3}>
                    <Card>
                      Hello
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </Row>
      </Container>
    </Jumbotron>
  )
}

export default ReservationPage
