'use client'
import ProductDetailPage from '@/containers/Product'
import React, { Suspense } from 'react'

const page = () => {
  return (
    // <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetailPage />
      </Suspense>

    // </div>
  )
}

export default page