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
    h-[50px]
    mb-20
    px-4
    border
    text-sm
    text-neutral-400
    border-neutral-600
    hover:bg-neutral-100
    active:hover:bg-neutral-50
  `
  return (
    <button className={`${baseClassName} ${className}`} {...props}>
      {children}
    </button>
  )
}