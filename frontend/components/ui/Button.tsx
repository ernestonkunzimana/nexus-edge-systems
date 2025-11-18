"use client"
import * as React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline'
}

function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'px-4 py-2 rounded font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed'
  const styles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    ghost: 'bg-transparent text-white/90 hover:bg-white/10',
    outline: 'border border-slate-600 text-gray-300 hover:bg-slate-700',
  }
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />
}

export default Button
export { Button }
export type { ButtonProps }
