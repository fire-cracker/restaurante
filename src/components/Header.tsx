import React, { FC, ReactElement } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

import { IRootState } from '../redux/reducers'
import { IUserState } from '../types/usersTypes'
import { logout } from '../redux/actions/users'

interface Props extends RouteComponentProps<void> {
  executeScrollToMenu: (history: any) => void
  history: any
  onModalShow: () => void
  userState: IUserState
  logout: () => void
}
const Header: FC<Props> = ({
  history,
  executeScrollToMenu,
  onModalShow,
  userState,
  logout
}): ReactElement => (
  <Navbar collapseOnSelect bg="black" expand="lg" variant="dark" id="nav" className="sticky-top">
    <Navbar.Brand href="/">Restauranté</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav defaultActiveKey="home" className="m-auto main-tabs">
        <Nav.Link as={Link} to="/" eventKey="home">
          HOME
        </Nav.Link>
        <Nav.Link as={Link} to="/menu" eventKey="menu" onClick={() => executeScrollToMenu(history)}>
          MENU
        </Nav.Link>
        <Nav.Link as={Link} eventKey="reservation" to="/reservation">
          BOOK A TABLE
        </Nav.Link>
      </Nav>
      <Nav className="mr">
        {userState.isLoggedIn ? (
          <Button href="#" variant="outline-darkkhaki" onClick={() => logout()}>
            LOGOUT
          </Button>
        ) : (
          <Button href="#" variant="outline-darkkhaki" onClick={() => onModalShow()}>
            LOGIN
          </Button>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const mapStateToProps = (state: IRootState) => ({ userState: state.userState })
const mapDispatchToProps = { logout }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
