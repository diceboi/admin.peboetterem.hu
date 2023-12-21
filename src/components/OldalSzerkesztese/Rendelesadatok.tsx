import React from 'react'
import DeleteButton from '../UI/DeleteButton'
import EditButton from '../UI/EditButton'

export default function RendelesAdatok() {
  return (
    <section className='flex flex-col w-full h-auto shadow-box p-8 rounded-xl'>
        <div className='flex justify-start items-center w-full h-full border-b border-neutral-300'>
            <h1>Rendeléssel kapcsolatos információk</h1>
        </div>
        <div className='flex flex-col gap-4 py-8'>            
            <div className='flex items-center gap-4'>
                <h2>Nyitvatartás:</h2>
                <label htmlFor="h-p">Hétfő - Péntek</label>
                <input disabled id='h-p' type="time" value="info@peboetterem.hu" className='p-2 bg-neutral-100' />
                <label htmlFor="szo">Szombat</label>
                <input disabled id='szo'type="time" value="info@peboetterem.hu" className='p-2 bg-neutral-100' />
                <label htmlFor="va">Vasárnap</label>
                <input disabled id='va' type="time" value="info@peboetterem.hu" className='p-2 bg-neutral-100' />
                <div className='flex justify-center items-center'>
                    <EditButton />
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <h2>Rendelésfelvétel:</h2>
                <label htmlFor="rendelesfelvetel">Eddig:</label>
                <input disabled id='rendelesfelvetel' type="time" value="info@peboetterem.hu" className='p-2 bg-neutral-100' />
                <div className='flex justify-center items-center'>
                    <EditButton />
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <h2>Napi menü árak:</h2>
                <div className='flex flex-col'>
                    <label htmlFor="amenu">A menü:</label>
                    <input disabled id='amenu' type="text" value="1500" className='p-2 bg-neutral-100' />
                    <label htmlFor="bmenu">B menü:</label>
                    <input disabled id='bmenu' type="text" value="1700" className='p-2 bg-neutral-100' />
                    <label htmlFor="amenu-csakfoetel">A menü csak főétel:</label>
                    <input disabled id='amenu-csakfoetel' type="text" value="1200" className='p-2 bg-neutral-100' />
                    <label htmlFor="bmenu-csakfoetel">B menü csak főétel:</label>
                    <input disabled id='bmenu-csakfoetel' type="text" value="1400" className='p-2 bg-neutral-100' />
                </div>
                <div className='flex justify-center items-center'>
                    <EditButton />
                </div>
            </div>
        </div>
    </section>
  )
}
