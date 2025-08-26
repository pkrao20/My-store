'use client'
import React from 'react'

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      
      {/* Loading text */}
      <p className="mt-4 text-gray-700 text-lg font-medium">Loading...</p>
    </div>
  )
}

export default Loading