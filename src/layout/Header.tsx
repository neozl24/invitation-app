import broccoliLogo from '/broccoli.svg'

export const Header = () => {
  return (
    <div className='w-full h-20 sm:h-24 flex justify-center border-b border-solid border-b-neutral-300'>
      <div className='flex h-full items-center justify-center w-full lg:w-[1000px] lg:justify-start'>
        <img src={broccoliLogo} width='32' alt="Broccoli logo" className='mr-4' />
        <h3 className='font-bold text-neutral-500 text-3xl sm:text-4xl'>BROCCOLI & CO</h3>
      </div>
    </div>
  )
}
