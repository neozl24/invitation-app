interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({
  className = '',
  children,
  ...props
}: ButtonProps) => {
  const baseClassName = `
    flex
    items-center
    justify-center
    h-[50px]
    px-4
    border
    border-neutral-600
    text-sm
    text-neutral-400
    outline-none
    focus-visible:outline-blue-700
    focus-visible:outline-2
    hover:bg-neutral-100
    active:hover:bg-neutral-50
  `
  return (
    <button className={`${baseClassName} ${className}`} {...props}>
      {children}
    </button>
  )
}