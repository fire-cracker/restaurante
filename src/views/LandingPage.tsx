import React from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

const LandingPage: React.FC = () => {
  return (
    <Jumbotron fluid className='p-0'>
      <Container fluid>
        <Row>
          <ResponsiveEmbed aspectRatio='1by1'>
            <Col className='banner d-flex flex-column justify-content-center align-items-center'>
              <div className='text-0 text-darkkhaki'>
                <p>Restaurante Exquisite Cuisine</p>
              </div>
              <div className='text-1 text-white'>
                <p className='font-weight-normal'>Enjoy our Food Experience</p>
              </div>
              <div className='divider text-darkkhaki d-flex flex-row'>
                <p className='line my-2 mx-2'>&nbsp;</p>
                <p className='cutlery-icon'><i className="fa fa-cutlery"></i></p>
                <p className='line my-2 mx-2'>&nbsp;</p>
              </div>
              <div className='text-2 text-white'>
                <p>OPENING HOURS</p>
              </div>
              <div className='text-3 text-white d-flex flex-row'>
                <p className='days'>Monday - Friday:&nbsp;</p>
                <p className='time text-dimgray'>&nbsp;07:30AM - 23:00PM</p>
              </div>
              <div className='text-4 text-white d-flex flex-row'>
                <p className='days'>Weekends:&nbsp;</p>
                <p className='time text-dimgray'>&nbsp;07:30AM - 03:00PM</p>
              </div>
            </Col>
          </ResponsiveEmbed>
        </Row>
      </Container>
    </Jumbotron>
  )
}

export default LandingPage
