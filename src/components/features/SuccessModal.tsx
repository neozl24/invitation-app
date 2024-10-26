import { Modal } from '../common/Modal.tsx'
import { Button } from '../common/Button.tsx'

export const SuccessModal = ({
  onClose,
}: {
  onClose: () => void
}) => {
  return (
    <Modal title='All done!' onClose={onClose}>
      <p className='my-4 h-6 text-center text-neutral-500'>
        You will be one of the first to experience Broccoli & Co. when we launch.
      </p>
      <Button className='w-full mt-16' onClick={onClose}>OK</Button>
    </Modal>
  )
}


