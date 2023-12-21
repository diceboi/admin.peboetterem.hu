import Oldalszerkesztese from '@/components/Oldalszerkesztese'
import React from 'react'

export default function page() {
  return (
    <section className='container py-20 px-8 lg:px-32 m-auto'>
      <div className='w-full h-[100vh]'>
        <Oldalszerkesztese />
      </div>
    </section>
  )
}
