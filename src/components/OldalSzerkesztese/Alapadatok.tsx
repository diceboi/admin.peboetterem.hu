"use client"

import { toast } from 'sonner';
import SaveButton from '../UI/SaveButton';
import { useState } from 'react';

export default function Alapadatok({ id, cim, email, facebook, mobil, vezetekes, nyitvatartashepe, nyitvatartasszo, nyitvatartasv, rendelesfelvetel }:any) {

const [updatedData, setUpdatedData] = useState({
    cim,
    email,
    facebook,
    mobil,
    vezetekes,
    nyitvatartashepe,
    nyitvatartasszo,
    nyitvatartasv,
    rendelesfelvetel
    });

const handleSave = async () => {
    try {
        const res = await fetch(`/api/updateAlapadatok/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedData }),
        });

        if (res.ok) {
            toast.success('Sikeres frissítés');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            toast.error('A frissítés nem sikerült');
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }
};
    

  return (
    <section className='flex flex-col w-full h-auto shadow-box p-8 rounded-xl'>
        <div className='flex justify-start items-center w-full h-full border-b border-neutral-300'>
            <h1>Oldal adatai</h1>
        </div>
        <div className='flex flex-col gap-4 py-8'>

                <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2'>
                    <h2 className='w-auto lg:w-96'>Mobiltelefonszám:</h2>
                    <input
                        type='text'
                        value={updatedData.mobil}
                        placeholder={mobil}
                        className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                        onChange={e => setUpdatedData(prevData => ({
                            ...prevData,
                            mobil: e.target.value // Update the specific field in the state
                        }))}
                    />
                </div>

                <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2'>
                    <h2 className='w-96'>Vezetékes:</h2>
                    <input
                        type='text'
                        value={updatedData.vezetekes}
                        placeholder={vezetekes}
                        className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                        onChange={e => setUpdatedData(prevData => ({
                            ...prevData,
                            vezetekes: e.target.value // Update the specific field in the state
                        }))}
                    />
                </div>

                <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2'>
                    <h2 className='w-96'>Email:</h2>
                    <input
                        type='text'
                        value={updatedData.email}
                        placeholder={email}
                        className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                        onChange={e => setUpdatedData(prevData => ({
                            ...prevData,
                            email: e.target.value // Update the specific field in the state
                        }))}
                    />
                </div>

                <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2'>
                    <h2 className='w-96'>Cím:</h2>
                    <input
                        type='text'
                        value={updatedData.cim}
                        placeholder={cim}
                        className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                        onChange={e => setUpdatedData(prevData => ({
                            ...prevData,
                            cim: e.target.value // Update the specific field in the state
                        }))}
                    />
                </div>

                <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2'>
                    <h2 className='w-96'>Facebook cím:</h2>
                    <input
                        type='text'
                        value={updatedData.facebook}
                        placeholder={facebook}
                        className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                        onChange={e => setUpdatedData(prevData => ({
                            ...prevData,
                            facebook: e.target.value // Update the specific field in the state
                        }))}
                    />
                </div>

                <div className='flex flex-wrap items-center gap-4 border-t border-neutral-300 pt-4'>
                    <h2 className='w-96'>Nyitvatartás:</h2>
                    <div className='flex flex-col lg:flex-row w-full gap-4'>
                        <div>
                            <label htmlFor="hetfo-pentek">Hétfő - Péntek</label>
                            <input
                                type='text'
                                value={updatedData.nyitvatartashepe}
                                placeholder={nyitvatartashepe}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    nyitvatartashepe: e.target.value // Update the specific field in the state
                                }))}
                            />
                        </div>
                        <div>
                            <label htmlFor="szombat">Szombat</label>
                            <input
                                type='text'
                                value={updatedData.nyitvatartasszo}
                                placeholder={nyitvatartasszo}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    nyitvatartasszo: e.target.value // Update the specific field in the state
                                }))}
                            />
                        </div>
                        <div>
                            <label htmlFor="vasarnap">Vasárnap</label>
                            <input
                                type='text'
                                value={updatedData.nyitvatartasv}
                                placeholder={nyitvatartasv}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    nyitvatartasv: e.target.value // Update the specific field in the state
                                }))}
                            />
                        </div>
                        <div>
                            <label htmlFor="vasarnap">Rendelésfelvétel</label>
                            <input
                                type='text'
                                value={updatedData.rendelesfelvetel}
                                placeholder={rendelesfelvetel}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    rendelesfelvetel: e.target.value // Update the specific field in the state
                                }))}
                            />
                        </div>
                    </div>
                </div>

                

        </div>
        <SaveButton buttontxt={"Mentés"} onClick={handleSave} />
    </section>
  )
}