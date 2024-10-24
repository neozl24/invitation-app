import heartLogo from '../assets/heart.svg'

export const Footer = () => {
  return (
    <div className='w-full h-20 sm:h-24 flex flex-col justify-center items-center border-t border-solid border-t-neutral-300'>
      <Line className='mb-1'>
        Made with
        <img src={heartLogo} alt='love icon' width='20' className='inline ml-1 mr-1' />
        in Melbourne.
      </Line>
      <Line>
        &copy;
        2016 Broccoli & Co. All rights reserved.
      </Line>
    </div>
  )
}

interface LineProps extends React.ButtonHTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const Line = ({
  className = '',
  children,
  ...props
}: LineProps) => {
  const baseClassName = 'flex items-center text-sm italic text-neutral-400'
  return (
    <p className={`${baseClassName} ${className}`} {...props}>
      {children}
    </p>
  )
}