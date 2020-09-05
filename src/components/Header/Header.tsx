import React, { FC } from 'react'
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

interface Props extends RouteComponentProps {
  executeScrollToMenu: (history: any)  => void,
  history: any
}

const Header: FC<Props> = ({ history, executeScrollToMenu }) => {
  return (
    <Navbar bg='black' expand='lg' variant="dark" className='sticky-top'>
      <Navbar.Brand href='/home'>React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav activeKey='/' className='m-auto main-tabs'>
          <Nav.Link href='/'>HOME</Nav.Link>
          <Nav.Link href='#' onClick={() => executeScrollToMenu(history)}>MENU</Nav.Link>
          <Nav.Link href='/book-a-table'>BOOK A TABLE</Nav.Link>
        </Nav>
        <Nav className='mr'>
          <Button href="/login" variant="outline-darkkhaki">LOGIN</Button>
          <Button href='/profile' variant="outline-transparent"><i className="fa fa-shopping-cart text-white"></i></Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default withRouter(Header)
