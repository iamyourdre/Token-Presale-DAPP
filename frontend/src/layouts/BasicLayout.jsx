import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const BasicLayout = () => {
  return (
    <div className="flex relative">
      <Navbar />
      <div className="px-5 lg:px-20 min-h-screen w-full">
        <Outlet />
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </div>
    </div>
  )
}

export default BasicLayout