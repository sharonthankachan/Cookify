import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen z-50">
    <div className="relative">
      <div className="relative w-32 h-32">
        <div
          className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-amber-300 border-b-amber-300 animate-spin"
          style={{animationDuration: "3s"}}
        ></div>
  
        <div
          className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-amber-300 animate-spin"
          style={{animationDuration: "2s", animationDirection: "reverse"}}
        ></div>
      </div>
  
      <div
        className="absolute inset-0 bg-gradient-to-tr from-[#fcd34d]/10 via-transparent to-[#fcd34d]/5 animate-pulse rounded-full blur-sm"
      ></div>
    </div>
  </div>
  )
}

export default Loader
