import { Navbar } from '@/components/navbar'
import React from 'react'

export default function Sponsors() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-[#1c1c1d] text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-12">Our Sponsors</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add your sponsor cards here */}
          </div>
        </div>
      </div>
    </div>
  )
}