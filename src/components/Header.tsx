import React, { FC } from 'react'
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

import { IRootState } from '../redux/reducers'
import { IUserState } from '../types/usersTypes'
import { logout } from '../redux/actions/users'

interface Props extends RouteComponentProps<void> {
  executeScrollToMenu: (history: any)  => void,
  history: any
  onModalShow: Function
  userState: IUserState
  logout: () => void
}
const Header: FC<Props> = ({ history, executeScrollToMenu, onModalShow, userState , logout}) => {
  return (
    <Navbar bg='black' expand='lg' variant="dark" className='sticky-top'>
      <Navbar.Brand href='/home'>React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav activeKey='/home' className='m-auto main-tabs'>
          <Nav.Link href='/home'>HOME</Nav.Link>
          <Nav.Link href='#' onClick={() => executeScrollToMenu(history)}>MENU</Nav.Link>
          <Nav.Link href='/reservation'>BOOK A TABLE</Nav.Link>
        </Nav>
        <Nav className='mr'>
          {userState.isLoggedIn ? (<Button href="#" variant="outline-darkkhaki" onClick={() => logout()}>LOGOUT</Button>) : (<Button href="#" variant="outline-darkkhaki" onClick={() => onModalShow()}>LOGIN</Button>)}
          {userState.isLoggedIn && <Button href='/profile' variant="outline-transparent"><i className="fa fa-shopping-cart text-white"></i></Button>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state: IRootState) => ({ userState: state.userState })
const mapDispatchToProps = ({ logout })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
