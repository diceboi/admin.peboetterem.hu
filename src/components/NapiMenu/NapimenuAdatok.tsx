"use client"

import SaveButton from "../UI/SaveButton"

import { useState } from "react"
import { toast } from "sonner";

export default function NapimenuAdatok({ id, amenuar, bmenuar, amenucsakfoetel, bmenucsakfoetel, menurendeles, menukiszallitas }:any) {

    const [updatedData, setUpdatedData] = useState({
        amenuar,
        bmenuar,
        amenucsakfoetel,
        bmenucsakfoetel,
        menurendeles,
        menukiszallitas
        });

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/updateNapimenuadatok/${id}`, {
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
    <section className='flex flex-col w-full h-auto p-8 border-b border-neutral-300'>
        <div className='flex justify-between items-center w-full h-full border-b border-neutral-300'>
            <h1>Napimenü adatok</h1>
        </div>
        <div className='flex flex-col gap-4 py-8'>
            <div className='flex flex-col items-start'>
                <div className="flex items-center flex-wrap w-full lg:flex-nowrap border-b border-neutral-200 py-4">
                    <h2 className='w-1/4 pb-4 lg:pb-0'>A menü ár:</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                        <div className='flex items-center w-full gap-4'>
                            <label htmlFor="a-menu-leves">Egész&#10240;menü:</label> 
                            <input
                                id='a-menu-leves'
                                type='text'
                                placeholder={amenuar}
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.amenuar} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    amenuar: e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>
                            </div>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <label htmlFor="a-menu-foetel">Csak&#10240;főétel:</label> 
                            <input
                                id='a-menu-foetel'
                                type='text'
                                placeholder={amenucsakfoetel}
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.amenucsakfoetel} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    amenucsakfoetel: e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center flex-wrap w-full lg:flex-nowrap border-b border-neutral-200 py-4">
                    <h2 className='w-1/4 pb-4 lg:pb-0'>B menü ár:</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                        <div className='flex items-center w-full gap-4'>
                            <label htmlFor="b-menu-leves">Egész&#10240;menü:</label> 
                            <input
                                id='b-menu-leves'
                                type='text'
                                placeholder={bmenuar}
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.bmenuar} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    bmenuar: e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>
                            </div>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <label htmlFor="b-menu-foetel">Csak&#10240;főétel:</label> 
                            <input
                                id='b-menu-foetel'
                                type='text'
                                placeholder={bmenucsakfoetel}
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.bmenucsakfoetel} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    bmenucsakfoetel: e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>  
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center flex-wrap w-full lg:flex-nowrap border-b border-neutral-200 py-4">
                    <h2 className='w-1/4 pb-4 lg:pb-0'>Menü rendelés:</h2>
                    <div className="grid grid-cols-1 gap-2 w-full">
                        <div className='flex items-center w-full gap-4'>
                            <input
                                id='b-menu-leves'
                                type='text'
                                placeholder={menurendeles}
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.menurendeles} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    menurendeles: e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center flex-wrap w-full lg:flex-nowrap border-b border-neutral-200 py-4">
                    <h2 className='w-1/4 pb-4 lg:pb-0'>Menü kiszállítás:</h2>
                    <div className="grid grid-cols-1 gap-2 w-full">
                        <div className='flex items-center w-full gap-4'>
                            <input
                                id='b-menu-leves'
                                type='text'
                                placeholder={menukiszallitas}
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.menukiszallitas} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    menukiszallitas: e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <SaveButton buttontxt={"Mentés"} onClick={handleSave} />
    </section>
  )
}
