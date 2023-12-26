"use client"

import { ObjectId } from "mongoose";
import SaveButton from "../UI/SaveButton"

import { useState } from "react"
import { toast } from "sonner";

export default function NapimenuTile({ id, day, date, aMenuLeves, aMenuFoetel, bMenuLeves, bMenuFoetel}:any) {

    const [updatedData, setUpdatedData] = useState({
        date,
        aMenuLeves,
        aMenuFoetel,
        bMenuLeves,
        bMenuFoetel,
        });

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/updateNapimenu/${id}`, {
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
            <h1>{day}</h1>
        </div>
        <div className='flex flex-col gap-4 py-8'>
            <div className='flex flex-col items-start'>
                <div className='flex items-center w-full gap-4 pb-4'>
                    <label htmlFor="monday-date">Dátum:</label> 
                    <input
                        id='monday-date'
                        placeholder={date}
                        className='p-2 transition-all bg-neutral-100 rounded-md w-20'
                        value={updatedData.date} // Set value to updatedData.date
                        onChange={e => setUpdatedData(prevData => ({
                            ...prevData,
                            date: e.target.value // Update the specific field in the state
                        }))} // Capture changes
                    />
                </div>
                <div className="flex items-center flex-wrap w-full lg:flex-nowrap border-b border-neutral-200 py-4">
                    <h2 className='w-1/4 pb-4'>A menü:</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                        <div className='flex items-center w-full gap-4'>
                            <label htmlFor="a-menu-leves">Leves:</label> 
                            <input
                                id='a-menu-leves'
                                type='text'
                                placeholder={aMenuLeves}
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.aMenuLeves} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    aMenuLeves: e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>
                            </div>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <label htmlFor="a-menu-foetel">Főétel:</label> 
                            <input
                                id='a-menu-foetel'
                                type='text'
                                placeholder={aMenuFoetel}
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.aMenuFoetel} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    aMenuFoetel: e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center flex-wrap w-full lg:flex-nowrap border-b border-neutral-200 py-4">
                    <h2 className='w-1/4 pb-4'>B menü:</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                        <div className='flex items-center w-full gap-4'>
                            <label htmlFor="b-menu-leves">Leves:</label> 
                            <input
                                id='b-menu-leves'
                                type='text'
                                placeholder={bMenuLeves}
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.bMenuLeves} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    bMenuLeves: e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>
                            </div>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <label htmlFor="b-menu-foetel">Főétel:</label> 
                            <input
                                id='b-menu-foetel'
                                type='text'
                                placeholder={bMenuFoetel}
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.bMenuFoetel} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    bMenuFoetel: e.target.value // Update the specific field in the state
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
