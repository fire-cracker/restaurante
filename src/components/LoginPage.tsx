import React, { FC, useState, ReactElement } from 'react'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ClipLoader from 'react-spinners/ClipLoader'

import { login, signup } from '../redux/actions/users'
import { IRootState } from '../redux/reducers'
import { IUser, IUserState } from '../types/usersTypes'

interface IProps {
  show: boolean
  onHide: () => void
  login: (email: string, password: string) => Promise<IUser>
  signup: (username: string, email: string, password: string) => Promise<IUser>
  userState: IUserState
}

const LoginPage: FC<IProps> = ({ show, onHide, login, signup, userState }): ReactElement => {
  const [validated, setValidated] = useState(false)
  const [loginState, setLoginStated] = useState(true)
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  })

  const onhandleChange = ({
    target: { name, value }
  }: {
    target: { name: string; value: any }
  }) => {
    setUserDetails(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const form = event.currentTarget
    const { email, password, username } = userDetails
    if (form && form.checkValidity() === false) {
      event.stopPropagation()
      return
    }
    setValidated(true)
    let user
    if (loginState) user = await login(email, password)
    else if (!loginState) user = await signup(username, email, password)
    if (user) onHide()
  }

  const toggleLoginSignup = () => {
    setLoginStated(!loginState)
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="modal-wrapper"
      centered>
      <Row className="wrapper-row">
        <Col className="wrapper-row-col p-3 justify-content-center align-items-center">
          <Modal.Header className="border-0 p-0 pr-2 pt-2" closeButton></Modal.Header>
          <Modal.Body>
            <Row className="modal-body-row justify-content-center align-items-center text-center">
              <Col md={12} className="flex-column justify-content-center align-items-center">
                <Col>
                  <h2>{loginState ? 'Login' : 'Signup'}</h2>
                </Col>
                <Col className="divider mt-1 mb-3 text-darkkhaki d-flex flex-row justify-content-center align-items-center">
                  <p className="line my-2 mx-1">&nbsp;</p>
                  <p className="icon">
                    <img src="/images/entwined.svg" alt="entwined" className="fa fa-cutlery"></img>
                  </p>
                  <p className="line my-2 mx-1">&nbsp;</p>
                </Col>
              </Col>
              <Col md={12} className="justify-content-center align-items-center">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Row className="flex-column justify-content-center align-items-center">
                    {!loginState && (
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label></Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="username"
                          name="username"
                          onChange={onhandleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    )}
                    <Form.Group as={Col} controlId="validationCustom01">
                      <Form.Label></Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="email"
                        name="email"
                        onChange={onhandleChange}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="validationCustom02">
                      <Form.Label></Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={onhandleChange}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row className="justify-content-center align-items-center">
                    <Button className="bg-black border-0 rounded-0" type="submit">
                      {userState.logingIn ? (
                        <ClipLoader size={30} color={'#00acc1'} loading={true} />
                      ) : loginState ? (
                        'Login'
                      ) : (
                        'Signup'
                      )}
                    </Button>
                  </Form.Row>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="justify-content-center align-items-center">
            {loginState ? "Don't have an account?" : 'Already have an account?'}
            <Button variant="link" onClick={toggleLoginSignup}>
              {loginState ? 'Sign Up' : 'Log in'}
            </Button>
          </Modal.Footer>
        </Col>
      </Row>
    </Modal>
  )
}

const mapStateToProps = (state: IRootState) => ({ userState: state.userState })
const mapDispatchToProps = { login, signup }

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
