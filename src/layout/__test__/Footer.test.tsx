import { render } from '@testing-library/react'
import { Footer } from '../Footer'

test('renders name', () => {
  const { asFragment } = render(<Footer />)

  expect(asFragment()).toMatchSnapshot()
})
