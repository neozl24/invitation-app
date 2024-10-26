import { requestInvitation } from '../../utils/request.ts'
import { Modal } from '../common/Modal.tsx'
import { Button } from '../common/Button.tsx'
import { FormInput } from '../common/FormInput.tsx'
import { useForm, FOCUS_STATUS } from '../../hooks/useForm.ts'
import { useState } from 'react'

const fields = [{
  name: 'fullName',
  type: 'text',
  placeholder: 'Full name',
  validate: (value: string) => {
    const valid = value.trim().length >= 3
    return valid ? null : 'At least 3 characters long'
  }
}, {
  name: 'email',
  type: 'email',
  placeholder: 'Email',
  validate: (value: string) => {
    const valid = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value.trim())
    return valid ? null : 'Not a valid email format'
  },
}, {
  name: 'confirmEmail',
  type: 'text',
  placeholder: 'Confirm email',
  validate: (value: string, formData: { [key: string]: string }) => {
    const valid = value === formData.email
    return valid ? null : 'The two email inputs are different'
  },
}] as const

export const InvitationModal = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: () => void
}) => {
  const {
    formData,
    focusStatus,
    errors,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleFormSubmit,
  } = useForm(fields)

  const [loading, setLoading] = useState(false)
  const [requestError, setRequestError] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()  // submit default behavior would refresh page

    if (loading) {
      return
    }

    setRequestError('')

    const callback = async () => {
      setLoading(true)
      try {
        await requestInvitation<string>(formData.fullName, formData.email)
        onSuccess()
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        setRequestError(errorMessage)
      }
      setLoading(false)
    }

    handleFormSubmit(callback)
  }

  return (
    <Modal className='w-11/12 sm:max-w-[500px] min-w-[320px]' title='Request an invite' onClose={onClose}>
      <form className='w-full' onSubmit={onSubmit}>
        {
          fields.map((field) => {
            const fieldName = field.name
            const errorMessage =
              focusStatus[fieldName] === FOCUS_STATUS.FOCUSED_BEFORE ? errors[fieldName] : null
            return (
              <FormInput
                key={fieldName}
                name={fieldName}
                type={field.type}
                autoComplete='off'
                placeholder={field.placeholder}
                value={formData[fieldName]}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                errorMessage={errorMessage}
              />
            )
          })
        }
        <Button type='submit' className='w-full mt-16' disabled={loading}>
          {loading ? 'Sending, please wait...' : 'Send'}
        </Button>
      </form>
      <p className='my-4 h-6 italic text-center text-red-600'>{requestError}</p>
    </Modal>
  )
}


