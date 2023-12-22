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
    
    const handleSave = async () => {
        try {
            const res = await fetch('/api/updateAlapadatok/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ alapadatok }),
            });

            const data = await res.json();
            console.log(data); // Handle success or error
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleInputChange = (index: number, value: string) => {
        const updatedData = [...alapadatok];
        updatedData[index].data = value;
        setAlapadatok(updatedData);
    };
    

  return (
    <section className='flex flex-col w-full h-auto shadow-box p-8 rounded-xl'>
        <div className='flex justify-start items-center w-full h-full border-b border-neutral-300'>
            <h1>Oldal adatai</h1>
        </div>
        <div className='flex flex-col gap-4 py-8'>

        {alapadatok && alapadatok.length > 0 && (
            
            <>

            {alapadatok.map((item, index) => (
                <div className='flex items-center gap-4' key={item._id}>
                    <h2 className='w-96'>{item.title}:</h2>
                    <input
                        type='text'
                        value={item.data}
                        className='p-2 w-full transition-all bg-neutral-100 focus:bg-green-300'
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                </div>
            ))}

            </>
        )}

        </div>
        <SaveButton buttontxt={"Mentés"} onClick={handleSave} />
    </section>
  )
}

export default Alapadatok;