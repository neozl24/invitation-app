import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from '../Modal'

describe('Modal Component', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    render(
      <Modal title='Test Modal' onClose={mockOnClose} className='extra-class'>
        <p>Modal Content</p>
      </Modal>
    )
  })

  test('should render the modal with the correct title', () => {
    const title = screen.getByText('Test Modal')
    expect(title).toBeInTheDocument()
  })

  test('should render the children content', () => {
    const content = screen.getByText('Modal Content')
    expect(content).toBeInTheDocument()
  })

  test('should call onClose when the overlay is clicked', () => {
    const overlayElement = screen.getByTestId('modal-overlay')
    fireEvent.click(overlayElement)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  test('should apply additional className if provided', () => {
    const modalElement = screen.getByTestId('modal-content')
    expect(modalElement).toHaveClass('extra-class')
  })
})