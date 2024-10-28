import { render, screen, fireEvent } from '@testing-library/react'
import { SuccessModal } from '../SuccessModal'

describe('SuccessModal Component', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    render(<SuccessModal onClose={mockOnClose} />)
  })

  test('should render the modal title and the success message', () => {
    const title = screen.getByText('All done!')
    const message = screen.getByText('You will be one of the first', { exact: false })

    expect(title).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })

  test('should call onClose when the OK button is clicked', () => {
    const buttonElement = screen.getByRole('button', { name: 'OK' })
    fireEvent.click(buttonElement)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})