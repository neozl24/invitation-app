import { Modal } from '../common/Modal.tsx'
import { Button } from '../common/Button.tsx'
import { FormInput } from '../common/FormInput.tsx'

export const InvitationModal = ({
  onClose,
}: {
  onClose: () => void
}) => {
  return (
    <Modal className='w-11/12 sm:max-w-[500px] min-w-[320px]' title='Request an invite' onClose={onClose}>
      <form
        className='w-full'
        onSubmit={(e) => {
          e.preventDefault()
          console.log('=== submit')
        }}
      >
        <FormInput type='text' placeholder='Full name' />
        <FormInput type='email' placeholder='Email' />
        <FormInput type='email' placeholder='Confirm email' />
        <Button type='submit' className='w-full mt-16'>
          Send
        </Button>
      </form>
      <p className='my-4 h-6 italic text-center text-red-600'></p>
    </Modal>
  )
}


