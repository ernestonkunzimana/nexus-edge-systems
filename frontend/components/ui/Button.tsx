"use client"
import * as React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export default function Button({ variant = 'primary', className = '', ...props }: Props) {
  const base = 'px-4 py-2 rounded font-medium'
  const styles = variant === 'primary' ? 'bg-cyan-500 text-white hover:bg-cyan-600' : 'bg-transparent text-white/90'
  return <button className={`${base} ${styles} ${className}`} {...props} />
}
