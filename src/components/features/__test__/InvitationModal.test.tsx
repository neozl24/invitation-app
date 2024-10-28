import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Mock } from 'vitest'
import { InvitationModal } from '../InvitationModal.tsx'
import { requestInvitation } from '../../../utils/request.ts'

vi.mock('../../../utils/request.ts', () => ({
  requestInvitation: vi.fn<(name: string, email: string) => Promise<string | Error>>(),
}))

describe('InvitationModal Component', () => {
  const mockOnSuccess = vi.fn()
  const mockOnClose = vi.fn()

  const namePlaceholder = 'Full name'
  const emailPlaceholder = 'Email'
  const confirmEmailPlaceholder = 'Confirm email'

  const nameError = 'At least 3 characters long'
  const emailError = 'Not a valid email format'
  const confirmEmailError = 'The two email inputs are different'

  beforeEach(() => {
    render(<InvitationModal onSuccess={mockOnSuccess} onClose={mockOnClose} />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('should render the modal title', () => {
    const title = screen.getByText('Request an invite')
    expect(title).toBeInTheDocument()
  })

  test('should render the submit button by default', () => {
    const submitButton = screen.getByRole('button', { name: 'Send' })
    expect(submitButton).toBeInTheDocument()
  })

  test('should render the submit button by default', () => {
    const submitButton = screen.getByRole('button', { name: 'Send' })
    expect(submitButton).toBeInTheDocument()
  })

  test('should render three inputs', () => {
    const nameInput = screen.getByPlaceholderText<HTMLInputElement>(namePlaceholder)
    const emailInput = screen.getByPlaceholderText<HTMLInputElement>(emailPlaceholder)
    const confirmEmailInput = screen.getByPlaceholderText<HTMLInputElement>(confirmEmailPlaceholder)

    expect(nameInput).toBeInTheDocument()
    expect(nameInput.type).toBe('text')

    expect(emailInput).toBeInTheDocument()
    expect(emailInput.type).toBe('email')

    // input with "email" type will have some auto check by browser.
    // That is not needed for the "Confirm Email" input, so we set its type to "text"
    expect(confirmEmailInput).toBeInTheDocument()
    expect(confirmEmailInput.type).toBe('text')
  })

  test('should show error message properly and only trigger onSuccess callback when all inputs valid', () => {
    (requestInvitation as Mock).mockResolvedValue('Registered')

    const nameInput = screen.getByPlaceholderText<HTMLInputElement>(namePlaceholder)
    const emailInput = screen.getByPlaceholderText<HTMLInputElement>(emailPlaceholder)
    const confirmEmailInput = screen.getByPlaceholderText<HTMLInputElement>(confirmEmailPlaceholder)

    const submitButton = screen.getByRole('button', { name: 'Send' })

    // Error messages are not shown by default
    expect(screen.queryByText(nameError)).not.toBeInTheDocument()
    expect(screen.queryByText(emailError)).not.toBeInTheDocument()
    expect(screen.queryByText(confirmEmailError)).not.toBeInTheDocument()

    fireEvent.focus(nameInput)
    fireEvent.click(submitButton)

    // After submitting, validation on three inputs would be triggered
    expect(screen.queryByText(nameError)).toBeInTheDocument()
    expect(screen.queryByText(emailError)).toBeInTheDocument()

    // With all three inputs empty, the ConfirmEmail input value is the same as the Email input value.
    // Thus ConfirmEmail error message is not shown now
    expect(screen.queryByText(confirmEmailError)).not.toBeInTheDocument()

    // And of course, requestInvitation won't be called
    expect(requestInvitation).not.toHaveBeenCalledTimes(1)

    fireEvent.focus(nameInput)

    // When focus on one input, its error message is hidden,
    // because we don't want to interupt user typing.
    expect(screen.queryByText(nameError)).not.toBeInTheDocument()

    fireEvent.change(nameInput, { target: { value: 'To' }})
    fireEvent.blur(nameInput)

    // type a string with not enough characters
    expect(nameInput.value).toBe('To')
    expect(screen.queryByText(nameError)).toBeInTheDocument()

    // type a name which meets the validation
    fireEvent.focus(nameInput)
    fireEvent.change(nameInput, { target: { value: 'Tom Cruise' }})
    fireEvent.blur(nameInput)

    expect(nameInput.value).toBe('Tom Cruise')
    expect(screen.queryByText(nameError)).not.toBeInTheDocument()

    fireEvent.focus(emailInput)
    fireEvent.change(emailInput, { target: { value: 'abcde' }})
    fireEvent.blur(emailInput)

    expect(emailInput.value).toBe('abcde')
    expect(screen.queryByText(emailError)).toBeInTheDocument()
    
    // before focus on ConfirmEmail input or trigger sumbit,
    // ConfirmEmail error message will not be displayed
    expect(screen.queryByText(confirmEmailError)).not.toBeInTheDocument()

    fireEvent.focus(emailInput)
    fireEvent.change(emailInput, { target: { value: 'tom@example.com' }})
    fireEvent.blur(emailInput)

    expect(emailInput.value).toBe('tom@example.com')
    expect(screen.queryByText(emailError)).not.toBeInTheDocument()
    expect(screen.queryByText(confirmEmailError)).not.toBeInTheDocument()

    fireEvent.focus(confirmEmailInput)
    fireEvent.blur(confirmEmailInput)
    expect(screen.queryByText(confirmEmailError)).toBeInTheDocument()

    // make ConfirmEmail input value the same with Email input
    fireEvent.focus(confirmEmailInput)
    fireEvent.change(confirmEmailInput, { target: { value: 'tom@example.com' }})
    fireEvent.blur(confirmEmailInput)

    // now all three inputs have valid values, so no error messages can be seen
    expect(screen.queryByText(nameError)).not.toBeInTheDocument()
    expect(screen.queryByText(emailError)).not.toBeInTheDocument()
    expect(screen.queryByText(confirmEmailError)).not.toBeInTheDocument()
  })

  test('should be able to trigger submit request when all inputs have valid values', async () => {
    (requestInvitation as Mock).mockResolvedValue('Registered')

    const nameInput = screen.getByPlaceholderText<HTMLInputElement>(namePlaceholder)
    const emailInput = screen.getByPlaceholderText<HTMLInputElement>(emailPlaceholder)
    const confirmEmailInput = screen.getByPlaceholderText<HTMLInputElement>(confirmEmailPlaceholder)

    const submitButton = screen.getByRole('button', { name: 'Send' })

    fireEvent.focus(nameInput)
    fireEvent.change(nameInput, { target: { value: 'Tom Cruise' }})
    fireEvent.blur(nameInput)

    fireEvent.focus(emailInput)
    fireEvent.change(emailInput, { target: { value: 'tom@example.com' }})
    fireEvent.blur(emailInput)

    fireEvent.focus(confirmEmailInput)
    fireEvent.change(confirmEmailInput, { target: { value: 'tom@example.com' }})
    fireEvent.blur(confirmEmailInput)

    // click submit button or trigger submit in other ways (e.g. press Enter key)
    // for multiple times within a short period of time.
    fireEvent.click(submitButton)
    fireEvent.click(submitButton)
    fireEvent.click(submitButton)
    fireEvent.submit(screen.getByTestId('invitation-form'))
    fireEvent.submit(screen.getByTestId('invitation-form'))

    // requestInvitation won't be called repeatedly
    expect(requestInvitation).toHaveBeenCalledTimes(1)

    // make sure the button text changes when loading request
    expect(screen.queryByRole('button', { name: 'Send' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Sending, please wait...' })).toBeInTheDocument()

    // wait for the requestInvitation promise to resolve
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Send' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Sending, please wait...' })).not.toBeInTheDocument()
      expect(mockOnSuccess).toHaveBeenCalledTimes(1)
    })
  })

  test('should show error message from server when requestInvitation rejects', async () => {
    const mockError = new Error('Bad Request: Email is already in use')
    ;(requestInvitation as Mock).mockRejectedValue(mockError)

    const nameInput = screen.getByPlaceholderText<HTMLInputElement>(namePlaceholder)
    const emailInput = screen.getByPlaceholderText<HTMLInputElement>(emailPlaceholder)
    const confirmEmailInput = screen.getByPlaceholderText<HTMLInputElement>(confirmEmailPlaceholder)

    const submitButton = screen.getByRole('button', { name: 'Send' })

    fireEvent.change(nameInput, { target: { value: 'Tom Cruise' }})
    fireEvent.change(emailInput, { target: { value: 'tom@example.com' }})
    fireEvent.change(confirmEmailInput, { target: { value: 'tom@example.com' }})

    fireEvent.click(submitButton)

    expect(requestInvitation).toHaveBeenCalledTimes(1)

    expect(screen.queryByRole('button', { name: 'Send' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Sending, please wait...' })).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Send' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Sending, please wait...' })).not.toBeInTheDocument()
      expect(mockOnSuccess).not.toHaveBeenCalled()

      const errorMessage = screen.getByText('Bad Request: Email is already in use')
      expect(errorMessage).toHaveClass('text-red-600')
    })
  })
})