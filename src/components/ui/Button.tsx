'use client'

import Link from 'next/link'

type Variant = 'primary' | 'secondary'

interface BaseProps {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

interface AsButton extends BaseProps {
  href?: never
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

interface AsLink extends BaseProps {
  href: string
  onClick?: never
  type?: never
  disabled?: never
}

type ButtonProps = AsButton | AsLink

const base =
  'px-4 py-[1rem] text-[1.6rem] text-center no-underline cursor-pointer transition-all duration-200 hover:-translate-y-0.5'

const variants: Record<Variant, string> = {
  primary: 'bg-[#212529] text-white hover:bg-[#31373d]',
  secondary: 'border-2 border-[#212529] bg-transparent text-[#212529] hover:bg-[#d9d9d9]',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  href,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]}${className ? ` ${className}` : ''}`

  if (href !== undefined) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes}${disabled ? ' disabled:cursor-not-allowed disabled:opacity-60' : ''}`}
    >
      {children}
    </button>
  )
}
