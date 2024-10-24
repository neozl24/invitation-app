import { Button } from '../components/Button.tsx'

export const Content = () => {
  return (
    <div className='flex-1 flex flex-col items-center justify-center p-4'>
      <h1 className='text-center text-neutral-500 font-medium text-3xl sm:text-5xl'>
        A better way <br />to enjoy every day.
      </h1>
      <p className='my-8 text-center text-neutral-400 text-lg'>Be the first to know when we launch</p>
      <Button>Request an invite</Button>
    </div>
  )
}