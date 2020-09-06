import React, { FC, RefObject } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container'

import Banner from '../components/Banner'
import MenusSection from '../components/Menus'
import LoginPage from '../components/LoginPage'
import { login, signup } from '../redux/actions/users'
import { IUser, IUserState } from '../types/usersTypes'
import { IRootState } from '../redux/reducers'

interface Props extends RouteComponentProps {
  menuRef: RefObject<HTMLInputElement>
  modalShow: boolean
  onModalHide: () => any
  login: (email: string, password: string) => Promise<IUser>
  signup: (username: string, email: string, password: string) => Promise<IUser>
  user: IUserState
}
const LandingPage: FC<Props> = ({ menuRef, modalShow, onModalHide, login, signup, user }) => {
  return (
    <Container fluid className='home-wrapper p-0'>
      <Banner />
      <MenusSection menuRef={menuRef} />
      <LoginPage show={modalShow} onHide={onModalHide} login={login} signup={signup} user={user} />
    </Container>
  )
}

const mapStateToProps = (state: IRootState) => ({ user: state.user })
const mapDispatchToProps = ({ login, signup })

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
