import { useState } from 'react'
import { Button } from '../components/common/Button.tsx'
import { InvitationModal } from '../components/features/InvitationModal.tsx'
import { SuccessModal } from '../components/features/SuccessModal.tsx'

export const Content = () => {
  const [showInvitationModal, setShowInvitationModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  return (
    <>
      <div className='flex-1 flex flex-col items-center justify-center p-4'>
        <h1 className='text-center text-neutral-500 font-medium text-3xl sm:text-5xl'>
          A better way <br />to enjoy every day.
        </h1>
        <p className='my-8 text-center text-neutral-400 text-lg'>Be the first to know when we launch</p>
        <Button
          className='mb-8'
          onClick={() => { setShowInvitationModal(true) }}
        >
          Request an invite
        </Button>
      </div>
      {
        showInvitationModal ? (
          <InvitationModal
            onClose={() => {
              setShowInvitationModal(false)
            }}
            onSuccess={() => {
              setShowInvitationModal(false)
              setShowSuccessModal(true)
            }}
          />
        ) : null
      }
      {
        showSuccessModal ? (
          <SuccessModal onClose={() => {setShowSuccessModal(false)}} />
        ): null
      }
    </>
  )
}