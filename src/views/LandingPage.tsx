import React, { FC, RefObject, ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import Banner from '../components/Banner'
import MenusSection from '../components/Menus'

interface Props {
  menuRef: RefObject<HTMLInputElement>
}
const LandingPage: FC<Props> = ({ menuRef }): ReactElement => {
  const { id } = useParams()
  if (!id) window.scrollTo(0, 0)

  return (
    <Container fluid className="home-wrapper p-0">
      <Banner />
      <MenusSection menuRef={menuRef} />
    </Container>
  )
}

export default LandingPage
