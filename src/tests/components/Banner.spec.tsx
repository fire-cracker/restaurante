import React from 'react'
import { render } from '@testing-library/react'

import Banner from '../../components/Banner'

describe('Banner', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = render(<Banner />)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  test('renders Banner component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('renders component text', () => {
    const { getByText } = wrapper
    const linkElement = getByText('Restaurante Exquisite Cuisine')
    const openingTimeElement = getByText('OPENING HOURS')
    expect(linkElement).toBeInTheDocument()
    expect(openingTimeElement).toBeInTheDocument()
  })
})
