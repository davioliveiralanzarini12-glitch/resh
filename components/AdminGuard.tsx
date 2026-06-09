'use client'

import { useEffect } from 'react'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = localStorage.getItem('studio-resh-admin-token')
    if (!token) {
      window.location.href = '/admin/login'
    }
  }, [])

  return <>{children}</>
}
