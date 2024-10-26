interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClassName = `
    flex
    items-center
    justify-center
    h-[50px]
    px-4
    border
    text-sm
    outline-none
  `
  const statusClassName = disabled ? `
    text-neutral-300
    border-neutral-300
  ` : `
    text-neutral-500
    border-neutral-600
    focus-visible:outline-blue-700
    focus-visible:outline-2
    hover:bg-neutral-100
    active:hover:bg-neutral-50
  `

  return (
    <button
      className={`${baseClassName} ${statusClassName} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}