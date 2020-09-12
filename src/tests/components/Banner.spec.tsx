import React from 'react'
import { render } from '@testing-library/react'

import Banner from '../../components/Banner'

describe('Banner', () => {
  let wrapper: any
  beforeAll(() => {
    wrapper = render(<Banner />)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  test('renders Banner component', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
