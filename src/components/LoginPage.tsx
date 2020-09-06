import React, { FC, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface Props {
  show?: boolean
  onHide?: () => any
}

const LoginPage: FC<Props> = (props) => {
  const [validated, setValidated] = useState(false)
  const [loginState, setLoginStated] = useState(true)
  const [UserState, setUserState] = useState({
    username: 1,
    email: '',
    password: '',
  })

  const onhandleChange = ({ target: { name, value } }: { target: { name: string; value: any } }) => {
    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (event: any) => {
    const form = event.currentTarget
    if (form && form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  const toggleLoginSignup = () => {
    setLoginStated(!loginState)
  }
  console.log('state>>>>', loginState)

  return (
    <Modal show={true} size='lg' aria-labelledby='contained-modal-title-vcenter' className='modal-wrapper' centered>
      <Row className='wrapper-row'>
        <Col className='wrapper-row-col p-3 justify-content-center align-items-center'>
          <Modal.Header className='border-0 p-0 pr-2 pt-2' closeButton>
          </Modal.Header>
          <Modal.Body>
            <Row className='modal-body-row justify-content-center align-items-center text-center'>
              <Col md={12} className='flex-column justify-content-center align-items-center'>
                <Col>
                  <h2>{loginState ? 'Login' : 'Signup'}</h2>
                </Col>
                <Col className='divider mt-1 mb-3 text-darkkhaki d-flex flex-row justify-content-center align-items-center'>
                  <p className='line my-2 mx-1'>&nbsp;</p>
                  <p className='icon'>
                    <img src='/images/entwined.svg' alt='entwined' className='fa fa-cutlery'></img>
                  </p>
                  <p className='line my-2 mx-1'>&nbsp;</p>
                </Col>
              </Col>
              <Col md={12} className='justify-content-center align-items-center'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Row className='flex-column justify-content-center align-items-center'>
                    {loginState && (
                      <Form.Group as={Col} controlId='validationCustom01'>
                        <Form.Label></Form.Label>
                        <Form.Control required type='text' placeholder='username' onChange={onhandleChange} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    )}
                    <Form.Group as={Col} controlId='validationCustom01'>
                      <Form.Label></Form.Label>
                      <Form.Control required type='text' placeholder='email' onChange={onhandleChange} />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId='validationCustom02'>
                      <Form.Label></Form.Label>
                      <Form.Control required type='text' placeholder='password' onChange={onhandleChange} />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row className='justify-content-center align-items-center'>
                    <Button className='bg-black border-0 rounded-0' type='submit'>
                      {loginState ? 'Login' : 'Signup'}
                    </Button>
                  </Form.Row>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className='justify-content-center align-items-center'>
            {loginState ? "Don't have an account?" : 'Already have an account?'}
            <Button variant='link' onClick={toggleLoginSignup}>
              {loginState ? 'Sign Up' : 'Log in'}
            </Button>
          </Modal.Footer>
        </Col>
      </Row>
    </Modal>
  )
}

export default LoginPage
