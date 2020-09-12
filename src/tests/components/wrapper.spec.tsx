import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'

import Wrapper from '../../components/Wrapper'

interface IProps {
  children: ReactNode
}

describe('Banner', () => {
  const props: IProps = {
    children: <div>Hello</div>
  }

  let wrapper: any
  beforeEach(() => {
    wrapper = render(<Wrapper {...props} />)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  test('renders Wrapper component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('renders component text', () => {
    const { getByText } = wrapper
    const textElement = getByText('Hello')
    expect(textElement).toBeInTheDocument()
  })
})
