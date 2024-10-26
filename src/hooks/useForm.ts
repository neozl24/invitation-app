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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()  // default behavior would refresh page

    setFocusStatus((prev) => {
      const newStatus = {...prev}
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

    if (checkIfNoError(errors)) {
      console.log('=== all fields valid, send request now...')
    }
  }

  return {
    formData,
    focusStatus,
    errors,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleSubmit,
  }
}

const getInitialFormData = <T extends readonly FieldConfig[]>(fields: T): { [K in T[number]['name']]: string } => {
  const data = {} as { [K in T[number]['name']]: string }

  fields.forEach((field) => {
    data[field.name as T[number]['name']] = ''
  })

  return data
}

type FocusValue = typeof FOCUS_STATUS[keyof typeof FOCUS_STATUS]

const getInitialFocusStatus = <T extends readonly FieldConfig[]>(fields: T): { [K in T[number]['name']]: FocusValue } => {
  const status = {} as { [K in T[number]['name']]: FocusValue }

  fields.forEach((field) => {
    status[field.name as T[number]['name']] = FOCUS_STATUS.NEVER_FOCUSED
  })

  return status
}

const getInitialErrors = <T extends readonly FieldConfig[]>(fields: T): { [K in T[number]['name']]: string | null } => {
  const errors = {} as { [K in T[number]['name']]: string | null }

  fields.forEach((field) => {
    errors[field.name as T[number]['name']] = null
  })

  return errors
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
