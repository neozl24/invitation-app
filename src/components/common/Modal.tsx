interface ModalProps {
  className?: string
  title: string
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({
  className = '',
  title,
  onClose,
  children,
}: ModalProps) => {
  const normalWidthCls = 'w-11/12 sm:max-w-[500px] min-w-[320px]'

  return (
    <div className='fixed w-full h-full flex justify-center items-center z-[1000]'>
      <div className='absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.4)]' onClick={onClose} />
      <div className={`px-10 py-16 bg-white border border-neutral-600 z-[1] ${normalWidthCls} ${className}`}>
        <h4 className='mb-12 text-center text-2xl italic text-neutral-600'>{title}</h4>
        {children}
      </div>
    </div>
  )
}
