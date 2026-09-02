import type { ButtonHTMLAttributes } from 'react'

export function KioskButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} />
}
