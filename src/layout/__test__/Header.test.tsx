import { render } from '@testing-library/react'
import { Header } from '../Header'

test('renders name', () => {
  const { asFragment, getByText } = render(<Header />)

  expect(getByText('BROCCOLI & CO')).toBeDefined()
  expect(asFragment()).toMatchSnapshot()
})
