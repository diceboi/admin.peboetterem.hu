"use client"

import DeleteButton from "../UI/DeleteButton";
import SaveButton from "../UI/SaveButton"
import { toast } from 'sonner';

import { useState, useEffect } from "react"

async function fetchCategories() {
    try {
        const res = await fetch("/api/etlap"); // Replace with your API endpoint
        if (res.ok) {
            const data = await res.json();
            if (data?.data?.Termekek) {
                const categories = data.data.Termekek.reduce((acc: any[], termek: { kategoria: any; }) => {
                    if (termek?.kategoria) {
                        acc.push(termek.kategoria);
                    }
                    return acc;
                }, []);

                const uniqueCategoriesSet = new Set(categories);
                const uniqueCategoriesArray: string[] = Array.from(uniqueCategoriesSet, (category) => String(category));

                return uniqueCategoriesArray;
            }
        }
        throw new Error("Failed to fetch categories");
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export default function Etlaptile({ id, nev, kategoria, elsodlegesar, masodlagosar, elsoelotag, masodikelotag, allergenek }:any) {

    const [updatedData, setUpdatedData] = useState({
        nev,
        kategoria,
        elsodlegesar,
        masodlagosar,
        elsoelotag,
        masodikelotag,
        allergenek,
        });

    const [categories, setCategories] = useState<string[]>([]); // State for categories
    const [newCategory, setNewCategory] = useState(""); // State for a new category input

    useEffect(() => {
        fetchCategories()
          .then((fetchedCategories: string[]) => {
            setCategories(fetchedCategories);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      }, []);
    
      const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        setUpdatedData((prevData) => ({
          ...prevData,
          kategoria: selectedCategory,
        }));
      };
    
      const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(e.target.value);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/updateEtlap/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ updatedData }),
            });

            if (res.ok) {
                toast.success('Termék frissítve');
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

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/updateEtlap/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (res.ok) {
                toast.success('Termék törölve');
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                toast.error('A törlés nem sikerült');
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

  return (
    <section className='flex flex-col w-full h-auto shadow-box p-8 rounded-xl'>
        <div className='flex flex-col lg:flex-row justify-start gap-4 items-start lg:items-end w-full h-full border-b border-neutral-300'>
            <h1>{nev}</h1>
            <p className="py-1 px-2 mb-1 bg-neutral-100 rounded-full min-w-fit ">{updatedData.kategoria}</p>
        </div>
        <div className='flex flex-col gap-4 py-8'>
            <div className='flex flex-col items-start'>
                <div className='flex items-center w-full gap-4 pb-4'>
                    <label htmlFor="monday-date">Név:</label> 
                    <input
                        id='monday-date'
                        placeholder={nev}
                        className='p-2 transition-all bg-neutral-100 rounded-md w-full'
                        value={updatedData.nev} // Set value to updatedData.date
                        onChange={e => setUpdatedData(prevData => ({
                            ...prevData,
                            nev: e.target.value // Update the specific field in the state
                        }))} // Capture changes
                    />
                </div>
                <div className="flex items-center flex-wrap w-full lg:flex-nowrap border-b border-neutral-200 py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                        <div className='flex items-center w-full'>
                            <label className="mr-4" htmlFor="elsodlegesar">Elsődleges&#10240;ár:</label> 
                            <input
                                id='elsodlegesar'
                                type='text'
                                placeholder={elsodlegesar}
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.elsodlegesar} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    elsodlegesar: e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>
                            </div>
                        </div>
                        <div className='flex items-center w-full'>
                            <label className="mr-4" htmlFor="elsoelotag">Előtag:</label> 
                            <input
                                id='elsoelotag'
                                type='text'
                                placeholder="pl: 2db, 32cm..."
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.elsoelotag} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    elsoelotag: e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center flex-wrap w-full lg:flex-nowrap border-b border-neutral-200 py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                        <div className='flex items-center w-full'>
                            <label className="mr-4" htmlFor="masodlagosar">Másodlagos&#10240;ár:</label> 
                            <input
                                id='masodlagosar'
                                type='text'
                                placeholder={masodlagosar}
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.masodlagosar} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    masodlagosar: e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>
                            </div>
                        </div>
                        <div className='flex items-center w-fulló'>
                            <label className="mr-4" htmlFor="masodikelotag">Előtag:</label> 
                            <input
                                id='masodikelotag'
                                type='text'
                                placeholder="pl: 2db, 32cm..."
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.masodikelotag} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    masodikelotag : e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>  
                            </div>
                        </div>
                    
                    </div>
                </div>

                <div className="flex items-center flex-wrap w-full lg:flex-nowrap border-b border-neutral-200 py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                        <div className='flex flex-col lg:flex-row w-full'>
                            <label className="mr-4" htmlFor="kategoria">Kategória:</label> 
                            <select
                                id='kategoria'
                                value={updatedData.kategoria}
                                onChange={handleCategoryChange}
                                className="border border-neutral-300 p-2 rounded-md mb-2 mr-0 lg:mb-0 lg:mr-2"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                    {category}
                                    </option>
                                ))}
                                <option value={newCategory}>{newCategory}</option>
                            </select>
                            {/* Input for a new category */}
                            <input
                                type="text"
                                placeholder="Új kategória"
                                value={newCategory}
                                onChange={handleNewCategoryChange}
                                className="p-2 w-full transition-all bg-neutral-100 rounded-md"
                            />
                            <div 
                                className='flex justify-center items-center'>
                            </div>
                        </div>
                        <div className='flex items-center w-full'>
                            <label className="mr-4" htmlFor="allergenek">Allergének:</label> 
                            <input
                                id='allergenek'
                                type='text'
                                placeholder=""
                                className='p-2 w-full transition-all bg-neutral-100 rounded-md'
                                value={updatedData.allergenek} // Set value to updatedData.date
                                onChange={e => setUpdatedData(prevData => ({
                                    ...prevData,
                                    allergenek : e.target.value // Update the specific field in the state
                                }))} // Capture changes
                            />
                            <div className='flex justify-center items-center'>  
                            </div>
                        </div>
                    
                    </div>
                </div>

            </div>
        </div>
        <div className="flex gap-4">
            <SaveButton buttontxt={"Mentés"} onClick={handleSave} />
            <DeleteButton buttontxt={"Törlés"} onClick={handleDelete}/>
        </div>
        
    </section>
  )
}
