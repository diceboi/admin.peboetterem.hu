import React from 'react'
import Alapadatok from './OldalSzerkesztese/Alapadatok'
import RendelesAdatok from './OldalSzerkesztese/Rendelesadatok'

export default function Oldalszerkesztese() {
  return (
    <>
      <div className='flex flex-col gap-8'>
        <Alapadatok />
        <RendelesAdatok />
      </div>
    </>
  )
}
