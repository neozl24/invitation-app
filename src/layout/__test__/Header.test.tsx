import { render } from '@testing-library/react'
import { Header } from '../Header'

test('renders name', () => {
  const { getByText } = render(<Header />)

  expect(getByText('BROCCOLI & CO')).toBeDefined()
})
