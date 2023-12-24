"use client"

import SaveButton from '../UI/SaveButton';
import { useEffect, useState } from 'react';

const getAlapadatok = async () => {
    try {
        const res = await fetch('/api/alapadatok', { cache: 'no-store' });

        if (!res.ok) {
            throw new Error("Az adatok letöltése nem sikerült");
        }
        console.log(res);
        return res.json();
    } catch (error) {
        console.log("Az adatok betöltése sikertlen", error);
        return null;
    }
};  

const Alapadatok = () => {

    const [alapadatok, setAlapadatok] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAlapadatok();
                if (data && data.data && Array.isArray(data.data.Alapadatok)) {
                    setAlapadatok(data.data.Alapadatok);
                } else {
                    throw new Error("Invalid data format received");
                }
            } catch (error) {
                console.error("Error fetching or handling data:", error);
            }
        };
        fetchData();
    }, []);

    const id = alapadatok[0]?._id;
    
    const handleSave = async () => {
        try {
            const res = await fetch('/api/updateAlapadatok/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, alapadatok }),
            });

            const data = await res.json();
            console.log(data); // Handle success or error
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleInputChange = (name: string, value: string) => {
        const updatedData = alapadatok.map(item => {
            if (item.hasOwnProperty(name)) {
                return { ...item, [name]: value };
            }
            return item;
        });
        setAlapadatok(updatedData);
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
                        value={alapadatok[0]?.mobil || ''}
                        placeholder={alapadatok[0]?.mobil || ''}
                        className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                        onChange={(e) => handleInputChange('mobil', e.target.value)}
                    />
                </div>

                <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2'>
                    <h2 className='w-96'>Vezetékes:</h2>
                    <input
                        type='text'
                        value={alapadatok[0]?.vezetekes || ''}
                        placeholder={alapadatok[0]?.vezetekes || ''}
                        className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                        onChange={(e) => handleInputChange('vezetekes', e.target.value)}
                    />
                </div>

                <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2'>
                    <h2 className='w-96'>Email:</h2>
                    <input
                        type='text'
                        value={alapadatok[0]?.email || ''}
                        placeholder={alapadatok[0]?.email || ''}
                        className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                </div>

                <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2'>
                    <h2 className='w-96'>Cím:</h2>
                    <input
                        type='text'
                        value={alapadatok[0]?.cim || ''}
                        placeholder={alapadatok[0]?.cim || ''}
                        className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                        onChange={(e) => handleInputChange('cim', e.target.value)}
                    />
                </div>

                <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2'>
                    <h2 className='w-96'>Facebook cím:</h2>
                    <input
                        type='text'
                        value={alapadatok[0]?.facebook || ''}
                        placeholder={alapadatok[0]?.facebook || ''}
                        className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                        onChange={(e) => handleInputChange('facebook', e.target.value)}
                    />
                </div>

                <div className='flex flex-wrap items-center gap-4 border-t border-neutral-300 pt-4'>
                    <h2 className='w-96'>Nyitvatartás:</h2>
                    <div className='flex flex-col lg:flex-row w-full gap-4'>
                        <div>
                            <label htmlFor="hetfo-pentek">Hétfő - Péntek</label>
                            <input
                                type='text'
                                value={alapadatok[0]?.nyitvatartashepe || ''}
                                placeholder={alapadatok[0]?.nyitvatartashepe || ''}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={(e) => handleInputChange('nyitvatartashepe', e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="szombat">Szombat</label>
                            <input
                                type='text'
                                value={alapadatok[0]?.nyitvatartasszo || ''}
                                placeholder={alapadatok[0]?.nyitvatartasszo || ''}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={(e) => handleInputChange('nyitvatartasszo', e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="vasarnap">Vasárnap</label>
                            <input
                                type='text'
                                value={alapadatok[0]?.nyitvatartasv || ''}
                                placeholder={alapadatok[0]?.nyitvatartasv || ''}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={(e) => handleInputChange('nyitvatartasv', e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="vasarnap">Rendelésfelvétel</label>
                            <input
                                type='text'
                                value={alapadatok[0]?.rendelesfelvetel || ''}
                                placeholder={alapadatok[0]?.rendelesfelvetel || ''}
                                className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                                onChange={(e) => handleInputChange('rendelesfelvetel', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                

        </div>
        <SaveButton buttontxt={"Mentés"} onClick={handleSave} />
    </section>
  )
}

export default Alapadatok;