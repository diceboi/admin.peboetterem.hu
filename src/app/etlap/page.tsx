'use client'

import EtlapNewTile from '@/components/Etlap/EtlapNewTile';
import EtlapTile from '@/components/Etlap/EtlapTile'
import AddButton from '@/components/UI/AddButton';
import { useState, useEffect } from 'react';

const getEtlap = async () => {
  try {
      const res = await fetch('/api/etlap', { cache: 'no-store' });

      if (!res.ok) {
          throw new Error("Az adatok letöltése nem sikerült");
      }

      return res.json();
  } catch (error) {
      console.log("Az adatok betöltése sikertlen", error);
      return null;
  }
};

const Etlap = () => {

  const [termekek, setTermekek] = useState<any[]>([]);
  const [showNewTile, setShowNewTile] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getEtlap();
            if (data && data.data && Array.isArray(data.data.Termekek)) {
                setTermekek(data.data.Termekek);
            } else {
                throw new Error("Invalid data format received");
            }
        } catch (error) {
            console.error("Error fetching or handling data:", error);
        }
    };
    fetchData();
}, []);

// Function to extract unique categories from 'termekek'
const extractCategories = (data: any[]) => {
  const allCategories = data.map((item) => item.kategoria);
  const uniqueCategories = Array.from(new Set(allCategories));
  setCategories(uniqueCategories);
};

useEffect(() => {
  extractCategories(termekek);
}, [termekek]);

// Filter items based on selected category
const filteredTermekek = selectedCategory
? termekek.filter((item) => item.kategoria === selectedCategory)
: termekek;

const handleCategoryClick = (category: string) => {
setSelectedCategory(category === selectedCategory ? null : category);
};

const toggleNewTile = () => {
  setShowNewTile((prev) => !prev); // Toggle the state to show/hide the new tile
};

  return (
    <section className='container py-20 px-8 lg:px-32 m-auto'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-row items-start'>
          <div className='flex flex-wrap gap-2 w-4/5'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`bg-neutral-100 px-4 py-2 rounded-full ${
                  category === selectedCategory ? 'bg-neutral-200' : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <AddButton onClick={toggleNewTile} buttontxt={'Termék hozzáadása'}/>
        </div>
        
        {showNewTile && (
          <EtlapNewTile
            id="ujtermek"
            nev={'Új termék'}
            kategoria={''}
            elsodlegesar={''}
            masodlagosar={''}
            elsoelotag={''}
            masodikelotag={''}
            allergenek={''}
          />
        )}

        {filteredTermekek.map((item) => (
          <EtlapTile
            key={item._id}
            id={item._id}
            nev={item.nev}
            kategoria={item.kategoria}
            elsodlegesar={item.elsodlegesar}
            masodlagosar={item.masodlagosar}
            elsoelotag={item.elsoelotag}
            masodikelotag={item.masodikelotag}
            allergenek={item.allergenek}
          />
        ))}

      </div>
    </section>
  )
}

export default Etlap;
