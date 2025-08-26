'use client'

import React, { Suspense } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>{children}</div>
    </Suspense>
  )
}

export default Layout
