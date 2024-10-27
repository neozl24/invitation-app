/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react'
import { useForm, FOCUS_STATUS, FieldConfig } from '../useForm'

const fields: FieldConfig[] = [
  {
    name: 'username',
    type: 'text',
    placeholder: 'Enter your username',
    validate: (value: string) => (value ? null : 'name is required')
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    validate: (value: string) => (value ? null : 'email is required'),
  },
]

describe('useForm hook', () => {
  test('should initialize form data, focus status and errors', () => {
    const { result } = renderHook(() => useForm(fields))

    expect(result.current.formData).toEqual({ username: '', email: '' })
    expect(result.current.focusStatus).toEqual({
      username: FOCUS_STATUS.NEVER_FOCUSED,
      email: FOCUS_STATUS.NEVER_FOCUSED,
    })
    expect(result.current.errors).toEqual({ username: null, email: null })
  })

  test('should handle input change', () => {
    const { result } = renderHook(() => useForm(fields))

    act(() => {
      result.current.handleInputChange({ target: { name: 'username', value: 'Tom' } } as any)
    })
    expect(result.current.formData).toEqual({ username: 'Tom', email: '' })

    act(() => {
      result.current.handleInputChange({ target: { name: 'email', value: 'tom@cat.com' } } as any)
    })
    expect(result.current.formData).toEqual({ username: 'Tom', email: 'tom@cat.com' })
  })

  test('should handle input focus', () => {
    const { result } = renderHook(() => useForm(fields))

    act(() => {
      result.current.handleInputFocus({ target: { name: 'username' } } as any)
    })
    expect(result.current.focusStatus).toEqual({
      username: FOCUS_STATUS.FOCUSED_NOW,
      email: FOCUS_STATUS.NEVER_FOCUSED,
    })

    act(() => {
      result.current.handleInputBlur({ target: { name: 'username' } } as any)
      result.current.handleInputFocus({ target: { name: 'email' } } as any)
    })
    expect(result.current.focusStatus).toEqual({
      username: FOCUS_STATUS.FOCUSED_BEFORE,
      email: FOCUS_STATUS.FOCUSED_NOW,
    })
  })

  test('should handle input blur and validate', () => {
    const { result } = renderHook(() => useForm(fields))

    act(() => {
      result.current.handleInputFocus({ target: { name: 'username' } } as any)
    })
    act(() => {
      result.current.handleInputBlur({ target: { name: 'username' } } as any)
    })
    expect(result.current.focusStatus).toEqual({
      username: FOCUS_STATUS.FOCUSED_BEFORE,
      email: FOCUS_STATUS.NEVER_FOCUSED,
    })
    expect(result.current.errors).toEqual({ username: 'name is required', email: null })

    // Actions will trigger react states change, so they need to be in seperate "act"
    act(() => {
      result.current.handleInputFocus({ target: { name: 'username' } } as any)
    })
    act(() => {
      result.current.handleInputChange({ target: { name: 'username', value: 'Tom' } } as any)
    })
    act(() => {
      result.current.handleInputBlur({ target: { name: 'username' } } as any)
    })
    expect(result.current.focusStatus).toEqual({
      username: FOCUS_STATUS.FOCUSED_BEFORE,
      email: FOCUS_STATUS.NEVER_FOCUSED,
    })
    expect(result.current.errors).toEqual({ username: null, email: null })
  })

  test('should submit form and validate all fields', () => {
    const { result } = renderHook(() => useForm(fields))

    act(() => {
      result.current.handleInputFocus({ target: { name: 'username' } } as any)
    })
    act(() => {
      result.current.handleInputChange({ target: { name: 'username', value: 'tom' } } as any)
    })
    act(() => {
      result.current.handleFormSubmit()
    })

    expect(result.current.errors).toEqual({
      username: null,
      email: 'email is required',
    })
  })

  test('should call callback when form is valid', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useForm(fields))

    act(() => {
      result.current.handleInputFocus({ target: { name: 'username' } } as any)
    })
    act(() => {
      result.current.handleInputChange({ target: { name: 'username', value: 'tom' } } as any)
    })
    act(() => {
      result.current.handleInputFocus({ target: { name: 'email' } } as any)
    })
    act(() => {
      result.current.handleInputChange({ target: { name: 'email', value: 'tom@cat.com' } } as any)
    })
    act(() => {
      result.current.handleFormSubmit(callback)
    })

    expect(callback).toHaveBeenCalled()
  })
})
