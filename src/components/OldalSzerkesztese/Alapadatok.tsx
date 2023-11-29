"use client"

import EditButton from './UI/EditButton'
import SaveButton from './UI/SaveButton';
import { useEffect, useState } from 'react';

const getAlapadatok = async () => {
    try {
        const res = await fetch('/api/alapadatok');

        if (!res.ok) {
            throw new Error("Az adatok letöltése nem sikerült");
        }

        return res.json();
    } catch (error) {
        console.log("Az adatok betöltése sikertlen", error);
        return null;
    }
};  

const Alapadatok = () => {

    const [alapadatok, setAlapadatok] = useState<any[]>([]);
    const [editMode, setEditMode] = useState<boolean[]>([]);

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

    const handleEdit = (index: number) => {
        const newEditMode = [...editMode];
        newEditMode[index] = true; // Enable edit mode for the clicked item
        setEditMode(newEditMode);
    };

    const handleSave = async (index: number, id: string, newData: string, currentItem: any) => {
        try {
            const res = await fetch(`/api/updateData/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newTitle: currentItem.title, newData }),
            });

            if (!res.ok) {
                throw new Error('Failed to update data');
            }
            
            // Log the data sent to the backend
            console.log('Data sent to backend:', { newTitle: currentItem.title, newData });
    
            // If the backend successfully updates the data, update the frontend state
            const updatedData = [...alapadatok];
            updatedData[index].data = newData; // Update the specific item's data

            setAlapadatok(updatedData);

            // Disable edit mode and reset the button after successful update
            const newEditMode = [...editMode];
            newEditMode[index] = false;
            setEditMode(newEditMode);
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

        {alapadatok && alapadatok.length > 0 && (
            
            <>

            {alapadatok.map((item, index) => (
                <div className='flex items-center gap-4' key={item._id}>
                    <h2 className='w-96'>{item.title}:</h2>
                    <input
                        disabled={!editMode[index]} // Enable/disable based on edit mode
                        type='text'
                        value={item.data}
                        className={`p-2 w-full transition-all ${
                            editMode[index] ? ' bg-green-100' : 'bg-neutral-100'
                        }`}
                        onChange={(e) => {
                            const newData = e.target.value;
                            const updatedData = [...alapadatok];
                            updatedData[index].data = newData;
                            setAlapadatok(updatedData);
                        }}
                    />
                    <div className='flex justify-center items-center'>
                        {!editMode[index] ? (
                            <EditButton onClick={() => handleEdit(index)} />
                        ) : (
                            <SaveButton onClick={() => handleSave(index, item._id, item.data, item)} />
                        )}
                    </div>
                </div>
            ))}

            </>
        )}

        </div>
    </section>
  )
}

export default Alapadatok;