import type { ReactNode } from 'react'

export function KioskLayout({ children }: { children: ReactNode }) {
  return <div className="kiosk-shell">{children}</div>
}
