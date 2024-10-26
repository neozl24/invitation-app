import { useState } from 'react'
import { Button } from '../components/common/Button.tsx'
import { InvitationModal } from '../components/features/InvitationModal.tsx'

export const Content = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className='flex-1 flex flex-col items-center justify-center p-4'>
        <h1 className='text-center text-neutral-500 font-medium text-3xl sm:text-5xl'>
          A better way <br />to enjoy every day.
        </h1>
        <p className='my-8 text-center text-neutral-400 text-lg'>Be the first to know when we launch</p>
        <Button
          className='mb-8'
          onClick={() => { setShowModal(true) }}
        >
          Request an invite
        </Button>
      </div>
      {
        showModal ? <InvitationModal onClose={() => { setShowModal(false) }} /> : null
      }
    </>
  )
}