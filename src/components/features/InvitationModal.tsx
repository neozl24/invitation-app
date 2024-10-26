import { Modal } from '../common/Modal.tsx'
import { Button } from '../common/Button.tsx'
import { FormInput } from '../common/FormInput.tsx'
import { useForm, FOCUS_STATUS, FieldConfig } from '../../hooks/useForm.ts'

const fields: FieldConfig[] = [{
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
}: {
  onClose: () => void
}) => {
  const {
    formData,
    focusStatus,
    errors,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleSubmit,
  } = useForm(fields)

  return (
    <Modal className='w-11/12 sm:max-w-[500px] min-w-[320px]' title='Request an invite' onClose={onClose}>
      <form
        className='w-full'
        onSubmit={handleSubmit}
      >
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
        <Button type='submit' className='w-full mt-16'>
          Send
        </Button>
      </form>
      <p className='my-4 h-6 italic text-center text-red-600'></p>
    </Modal>
  )
}


