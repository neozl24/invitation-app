import { render, screen, fireEvent } from '@testing-library/react'
import { FormInput } from '../FormInput.tsx'

describe('useForm hook', () => {
  const emailPlaceholder = 'Please input your email'

  test('shows placeholder text when value is empty', () => {
    render(<FormInput data-testid='email-input' placeholder={emailPlaceholder} />)

    const input = screen.getByTestId('email-input')
    expect(input).toBeInTheDocument()

    const placeholder = screen.getByPlaceholderText(emailPlaceholder)
    expect(placeholder).toBeInTheDocument()
  })
  
  test('updates value when user types text', () => {
    render(<FormInput data-testid='email-input' placeholder={emailPlaceholder} />)

    const input = screen.getByTestId<HTMLInputElement>('email-input')
  
    fireEvent.change(input, { target: { value: 'tom@cat.com' } })
    expect(input.value).toBe('tom@cat.com')
  })

  test('shows error message when errorMessage prop is provided', () => {
    render(<FormInput errorMessage="This field is required" placeholder="Enter text" />)
    
    const errorMessage = screen.getByText('This field is required')
    expect(errorMessage).toBeInTheDocument()

    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveClass('outline-2 outline-red-600')
  })

  test('should combine className prop with default classes', () => {
    render(<FormInput className="custom-class" placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveClass('custom-class')
  })
})
