import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const Header = () => {
  return (
    <Navbar bg='black' expand='lg' variant="dark" className='sticky-top'>
      <Navbar.Brand href='/home'>React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav activeKey='/' className='m-auto main-tabs'>
          <Nav.Link href='/'>HOME</Nav.Link>
          <Nav.Link href='/menu'>MENU</Nav.Link>
          <Nav.Link href='/menu'>BOOK A TABLE</Nav.Link>
        </Nav>
        <Nav className='mr'>
          <Button href="/login" variant="outline-darkkhaki">LOGIN</Button>
          <Button href='/profile' variant="outline-transparent"><i className="fa fa-shopping-cart text-white"></i></Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
