import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Media from 'react-bootstrap/Media'

const Menus = () => {
  return (
    <Jumbotron fluid className='menu-jumbotron bg-ghostwhite px-0'>
      <Container className='menu-container m-auto'>
        <Row className='container-wrapper px-0'>
          <Tab.Container defaultActiveKey='breakfast'>
            <Container className='container-body m-0 d-flex flex-column justify-content-center align-items-center'>
              <Row className='navs-container mb-4 w-100'>
                <Nav className='w-100 justify-content-between'>
                <Col lg={3} md={6} className='p-0'>
                  <Nav.Item className='mr-4 mt-1 mb-0 p-0'>
                    <Nav.Link className='py-4 px-3 bg-white' eventKey='breakfast'>
                      <img src='/images/breakfast.svg' alt='breafast icon' />
                      <p>Breakfast</p>
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col lg={3} md={6} className='p-0'>
                  <Nav.Item className='mr-4 mt-1 mb-0 p-0'>
                    <Nav.Link className='py-4 px-3 bg-white' eventKey='lunch'>
                    <img src='/images/lunch.svg' alt='breafast icon' />
                      <p>Lunch</p>
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col lg={3} md={6} className='p-0'>
                  <Nav.Item className='mr-4 mt-1 mb-0 p-0'>
                    <Nav.Link className='py-4 px-3 bg-white' eventKey='dinner'>
                    <img src='/images/dinner.svg' alt='breafast icon' />
                    <p>Dinner</p>
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col lg={3} md={6} className='mr-0 p-0'>
                  <Nav.Item className='mr-0 mt-1 mb-0 p-0'>
                    <Nav.Link className='py-4 px-3 bg-white' eventKey='drinks'>
                    <img src='/images/drink.svg' alt='breafast icon' />
                    <p>Drinks</p>
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                </Nav>
              </Row>
              <Row className='menu-body mx-0 pt-5'>
                <Tab.Content>
                  <Tab.Pane eventKey='breakfast'>
                    <Row>
                      <Col lg={6}>
                        <Media>
                          <img width={200} height={150} className='mr-3' src='https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/7/29/0/BX0903H_cinnamon-baked-doughnuts-recipe_s4x3.jpg.rend.hgtvcom.966.725.suffix/1449692373072.jpeg' alt='Generic placeholder' />
                          <Media.Body>
                            <h5 className='d-flex flex-row justify-content-between'>Media Heading <span>300</span></h5>
                            <p>Mushrooms, Ruccola,Popodoro Mozzarella,Olives</p>
                          </Media.Body>
                        </Media>
                      </Col>
                      <Col lg={6}>
                        <Media>
                          <img width={200} height={150} className='mr-3' src='https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/7/29/0/BX0903H_cinnamon-baked-doughnuts-recipe_s4x3.jpg.rend.hgtvcom.966.725.suffix/1449692373072.jpeg' alt='Generic placeholder' />
                          <Media.Body>
                          <h5 className='d-flex flex-row justify-content-between'>Media Heading <span>300</span></h5>
                            <p>Mushrooms, Ruccola,Popodoro Mozzarella,Olives</p>
                          </Media.Body>
                        </Media>
                      </Col>
                      <Col lg={6}>
                        <Media>
                          <img width={200} height={150} className='mr-3' src='https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/7/29/0/BX0903H_cinnamon-baked-doughnuts-recipe_s4x3.jpg.rend.hgtvcom.966.725.suffix/1449692373072.jpeg' alt='Generic placeholder' />
                          <Media.Body>
                          <h5 className='d-flex flex-row justify-content-between'>Media Heading <span>300</span></h5>
                            <p>Mushrooms, Ruccola,Popodoro Mozzarella,Olives</p>
                          </Media.Body>
                        </Media>
                      </Col>
                      <Col lg={6}>
                        <Media>
                          <img width={200} height={150} className='mr-3' src='https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/7/29/0/BX0903H_cinnamon-baked-doughnuts-recipe_s4x3.jpg.rend.hgtvcom.966.725.suffix/1449692373072.jpeg' alt='Generic placeholder' />
                          <Media.Body>
                          <h5 className='d-flex flex-row justify-content-between'>Media Heading <span>300</span></h5>
                            <p>Mushrooms, Ruccola,Popodoro Mozzarella,Olives</p>
                          </Media.Body>
                        </Media>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey='lunch'>
                    <div>Helllo there, Here is your Lunch</div>
                  </Tab.Pane>
                  <Tab.Pane eventKey='dinner'>
                    <div>Helllo there, Here is your Dinner</div>
                  </Tab.Pane>
                  <Tab.Pane eventKey='drinks'>
                    <div>Helllo there, Here is your Drinks</div>
                  </Tab.Pane>
                </Tab.Content>
              </Row>
            </Container>
          </Tab.Container>
        </Row>
      </Container>
    </Jumbotron>
  )
}

export default Menus
