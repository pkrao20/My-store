'use client'

import { Suspense } from 'react';
import AllProducts from "@/containers/AllProducts";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <AllProducts />
    </Suspense>
  );
}
