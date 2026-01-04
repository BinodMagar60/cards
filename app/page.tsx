import TiltCard from '@/components/tiltcard/TiltCard'
import React from 'react'

const Page = () => {
  return (
    <div className='w-full min-h-screen'>

      <div className='w-full p-10 max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2'>
          <TiltCard />
          <TiltCard />
          <TiltCard />
          <TiltCard />
          <TiltCard />
          <TiltCard />
          <TiltCard />
          <TiltCard />
        </div>
      </div>

    </div>
  )
}

export default Page