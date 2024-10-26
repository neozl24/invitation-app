import { useRef } from "react"

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
  return (
    <Mask onClick={onClose}>
      <div className={`px-10 py-16 bg-white border border-neutral-600 ${className}`}>
        <h4 className='mb-12 text-center text-2xl italic text-neutral-500'>{title}</h4>
        {children}
      </div>
    </Mask>
  )
}

const Mask = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className='fixed w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.4)]'
      onClick={(e) => {
        if (e.target === containerRef.current) {
          onClick?.()
        }        
      }}
      ref={containerRef}
    >
      {children}
    </div>
  )
}