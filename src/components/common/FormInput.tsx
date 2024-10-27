type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string | null
}

export const FormInput = ({
  errorMessage,
  ...props
}: FormInputProps) => {
  const baseClassName = `
    w-full
    px-4
    h-12
    outline
    outline-1
    outline-neutral-600
  `
  const normalStatusClassName = 'focus:outline-2 focus:outline-blue-700'
  const errorStatusClassName = 'outline-2 outline-red-600'
  const statusClassName = errorMessage ? errorStatusClassName : normalStatusClassName

  const className = `${baseClassName} ${statusClassName} ${props.className || ''}`

  return (
    <>
      <input className={className} {...props} />
      <p className='mt-1 mb-4 h-4 pl-1 text-red-600 text-xs'>
        {errorMessage || ''}
      </p>
    </>
  )
}