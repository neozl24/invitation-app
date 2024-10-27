import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

test('renders children as content and can trigger callback when clicked', () => {
  const { asFragment, getByText } = render(<Button>Click Me</Button>)

  expect(asFragment()).toMatchSnapshot()
  expect(getByText('Click Me')).toBeDefined()
})

test('Can trigger callback when clicked', () => {
  const callback = vi.fn()

  render(<Button onClick={callback}>Click Me</Button>)

  const button = screen.getByRole('button', { name: 'Click Me' })
  expect(button).toBeInTheDocument()

  fireEvent.click(button)
  expect(callback).toHaveBeenCalled()
})
