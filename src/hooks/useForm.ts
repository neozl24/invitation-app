import { useState } from 'react'

export const FOCUS_STATUS = {
  NEVER_FOCUSED: 0, // never been focused
  FOCUSED_NOW: 1,  // currently being focused
  FOCUSED_BEFORE: 2, // was focused before, but not focused now
} as const

export interface FieldConfig {
  name: string
  type: string
  placeholder?: string
  validate?: (value: string, formData: { [key: string]: string }) => (string | null)
}

export const useForm = <T extends readonly FieldConfig[]>(fields: T) => {
  const [formData, setFormData] = useState(getInitialFormData(fields))
  const [focusStatus, setFocusStatus] = useState(getInitialFocusStatus(fields))
  const [errors, setErrors] = useState(getInitialErrors(fields))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name
    setFocusStatus((prev) => ({
      ...prev,
      [fieldName]: FOCUS_STATUS.FOCUSED_NOW,
    }))
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name
    setFocusStatus((prev) => ({
      ...prev,
      [fieldName]: FOCUS_STATUS.FOCUSED_BEFORE,
    }))

    const error = validateField(fieldName, formData[fieldName as T[number]['name']])
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }))
  }

  const validateField = (fieldName: string, value: string) => {
    const targetField = fields.find((filed) => (filed.name === fieldName))
    const validate = targetField?.validate
    return validate?.(value, formData) || null
  }

  const handleFormSubmit = (cbWhenValid?: () => void) => {
    // if trigger submit, we will consider all inputs as they have been focused before
    setFocusStatus((prev) => {
      const newStatus = { ...prev }
      const keys = Object.keys(newStatus) as T[number]['name'][]
      for (const key of keys) {
        newStatus[key] = FOCUS_STATUS.FOCUSED_BEFORE
      }
      return newStatus
    })

    const formErrors = fields.reduce((acc, field) => {
      const fieldName = field.name as T[number]['name']
      return {
        ...acc,
        [field.name]: validateField(fieldName, formData[fieldName])
      }
    }, {} as { [K in T[number]['name']]: string | null })

    setErrors(formErrors)

    if (checkIfNoError(formErrors)) {
      cbWhenValid?.()
    }
  }

  return {
    formData,
    focusStatus,
    errors,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleFormSubmit,
  }
}

const getInitialValue = <
  T extends readonly FieldConfig[],
  V
>(
  fields: T,
  getDefaultValue: () => V
): { [K in T[number]['name']]: V } => {
  const initialValue = {} as { [K in T[number]['name']]: V }

  fields.forEach((field) => {
    initialValue[field.name as T[number]['name']] = getDefaultValue()
  })

  return initialValue
}

const getInitialFormData = <T extends readonly FieldConfig[]>(fields: T) => {
  return getInitialValue(fields, () => '')
}

type FocusValue = typeof FOCUS_STATUS[keyof typeof FOCUS_STATUS]

const getInitialFocusStatus = <
  T extends readonly FieldConfig[]
>(
  fields: T
): { [K in T[number]['name']]: FocusValue } => {
  return getInitialValue(fields, () => FOCUS_STATUS.NEVER_FOCUSED)
}

const getInitialErrors = <
  T extends readonly FieldConfig[]
>(
  fields: T
): { [K in T[number]['name']]: string | null } => {
  return getInitialValue(fields, () => null)
}

/**
 * According to the error info object, check if there is no real error found.
 */
const checkIfNoError = (errorInfo: { [key: string]: string | null }) => {
  const keys = Object.keys(errorInfo)
  for (const key of keys) {
    if (errorInfo[key]) {
      return false
    }
  }
  return true
}
