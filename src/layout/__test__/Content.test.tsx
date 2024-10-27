import { render, screen, fireEvent } from '@testing-library/react'
import { Content } from '../Content'

vi.mock('../../components/features/InvitationModal.tsx', () => ({
  InvitationModal: ({
    onClose,
    onSuccess
  }: {
    onClose: () => void,
    onSuccess: () => void,
  }) => (
    <div>
      <h2>Invitation Modal</h2>
      <button data-testid="request-success" onClick={onSuccess}>
        Success
      </button>
      <button data-testid="close-invitation-modal" onClick={onClose}>
        Close
      </button>
    </div>
  ),
}))

vi.mock('../../components/features/SuccessModal.tsx', () => ({
  SuccessModal: ({ onClose }: { onClose: () => void }) => (
    <div>
      <h2>Success Modal</h2>
      <button data-testid="close-success-modal" onClick={onClose}>
        Close
      </button>
    </div>
  ),
}))

test('renders Content component', () => {
  const { asFragment } = render(<Content />)

  expect(asFragment()).toMatchSnapshot()

  expect(screen.getByText(/A better way/)).toBeInTheDocument()

  const button = screen.getByRole('button', {
    name: 'Request an invite'
  })
  expect(button).toBeInTheDocument()
})

test('opens InvitationModal on button click', () => {
  render(<Content />)

  const button = screen.getByRole('button', {
    name: 'Request an invite'
  })
  fireEvent.click(button)

  expect(screen.getByText('Invitation Modal')).toBeInTheDocument()

  // Trigger onClose callback in mock InvitationModal
  const closeModalButton = screen.getByTestId('close-invitation-modal')
  fireEvent.click(closeModalButton)
  expect(screen.queryByText('Invitation Modal')).not.toBeInTheDocument()
})

test('shows SuccessModal after invitation successfully', () => {
  render(<Content />)

  const button = screen.getByRole('button', {
    name: 'Request an invite'
  })
  fireEvent.click(button)

  // Trigger onSuccess callback in mock InvitationModal
  const successButton = screen.getByTestId('request-success')
  fireEvent.click(successButton)

  // Mock SuccessModal should be rendered
  expect(screen.getByText('Success Modal')).toBeInTheDocument()

  const closeButton = screen.getByTestId('close-success-modal')
  fireEvent.click(closeButton)
  expect(screen.queryByText('Success Modal')).not.toBeInTheDocument()
})
