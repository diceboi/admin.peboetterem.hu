"use client"

import SaveButton from "../UI/SaveButton"

import { useState } from "react"
import { toast } from "sonner";

export default function Specialisarak({ id, csomagolas, kaposfured, toponar, juta, kaposujlak, taszar }:any) {

    const [updatedData, setUpdatedData] = useState({
        csomagolas,
        kaposfured,
        toponar,
        juta,
        kaposujlak,
        taszar
        });

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/updateSpecialisarak/${id}`, {
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
        <div className='flex justify-between items-center w-full h-full border-b border-neutral-300'>
            <h1>Speciális árak</h1>
        </div>
        <div className='flex flex-wrap items-center gap-4 border-t border-neutral-300 py-8'>
                    <div className='flex flex-col lg:flex-row w-full gap-4'>
                        <div>
                            <label htmlFor="hetfo-pentek">Csomagolás:</label>
                            <input
                                type='text'
                                value={updatedData.csomagolas}
                                placeholder={csomagolas}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    csomagolas: e.target.value // Update the specific field in the state
                                }))}
                            />
                        </div>
                        <div>
                            <label htmlFor="szombat">Kaposfüred:</label>
                            <input
                                type='text'
                                value={updatedData.kaposfured}
                                placeholder={kaposfured}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    kaposfured: e.target.value // Update the specific field in the state
                                }))}
                            />
                        </div>
                        <div>
                            <label htmlFor="vasarnap">Toponár</label>
                            <input
                                type='text'
                                value={updatedData.toponar}
                                placeholder={toponar}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    toponar: e.target.value // Update the specific field in the state
                                }))}
                            />
                        </div>
                        <div>
                            <label htmlFor="vasarnap">Juta</label>
                            <input
                                type='text'
                                value={updatedData.juta}
                                placeholder={juta}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    juta: e.target.value // Update the specific field in the state
                                }))}
                            />
                        </div>
                        <div>
                            <label htmlFor="vasarnap">Kaposújlak</label>
                            <input
                                type='text'
                                value={updatedData.kaposujlak}
                                placeholder={kaposujlak}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    kaposujlak: e.target.value // Update the specific field in the state
                                }))}
                            />
                        </div>
                        <div>
                            <label htmlFor="vasarnap">Taszár</label>
                            <input
                                type='text'
                                value={updatedData.taszar}
                                placeholder={taszar}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    taszar: e.target.value // Update the specific field in the state
                                }))}
                            />
                        </div>
                    </div>
                </div>
        <SaveButton buttontxt={"Mentés"} onClick={handleSave} />
    </section>
  )
}
