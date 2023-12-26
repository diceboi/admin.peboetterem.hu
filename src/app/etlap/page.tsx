'use client'

import EtlapNewTile from '@/components/Etlap/EtlapNewTile';
import EtlapTile from '@/components/Etlap/EtlapTile'
import AddButton from '@/components/UI/AddButton';
import { useState, useEffect } from 'react';
import { useRouter , useSearchParams } from 'next/navigation';


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

  const router = useRouter();
  const searchparams = useSearchParams();

  const [termekek, setTermekek] = useState<any[]>([]);
  const [showNewTile, setShowNewTile] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedItems, setSearchedItems] = useState<any[]>([]);

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

const handleCategoryClick = (category: string) => {
  const newCategory = category === selectedCategory ? null : category;

  setSelectedCategory(newCategory);
  setSearchQuery('');
  setSearchedItems([]);

  const query = newCategory ? `?category=${newCategory}` : '';
  router.push(`/etlap/${query}`);
};

useEffect(() => {
  extractCategories(termekek);
}, [termekek]);

// Filter items based on selected category
const filteredTermekek = selectedCategory
? termekek.filter((item) => item.kategoria === selectedCategory)
: termekek;

useEffect(() => {
  const category = searchparams.get('category'); // Access the 'category' query parameter from router.query
  if (typeof category === 'string') {
    setSelectedCategory(category); // Set the selectedCategory based on URL param
  }
}, [searchparams]);

const toggleNewTile = () => {
  setShowNewTile((prev) => !prev); // Toggle the state to show/hide the new tile
};

const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  const query = event.target.value;
  
  // Reset the search state and params if the query is empty
  if (!query) {
    setSearchQuery('');
    setSearchedItems([]);
    return;
  }

  setSearchQuery(query);
  
  // Perform the new search
  const results = termekek.filter((item) =>
    item.nev.toLowerCase().includes(query.toLowerCase())
  );
  setSearchedItems(results);
};

const performSearch = (items: any[], query: string) => {
  return items.filter((item) =>
    item.nev.toLowerCase().includes(query.toLowerCase())
  );
};

const filteredByCategory = selectedCategory
    ? termekek.filter((item) => item.kategoria === selectedCategory)
    : termekek;

  // Filter items based on search query
  const filteredBySearch = searchQuery
  ? performSearch(termekek, searchQuery)
  : filteredByCategory;

  // Render items based on whether there's a search query or selected category
  const itemsToRender = searchQuery ? filteredBySearch : filteredByCategory;


  return (
    <section className='container py-20 px-8 lg:px-32 m-auto'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4 items-center w-full'>
          <div className='flex overflow-x-scroll w-full'>
            <div className='flex flex-wrap gap-2 min-w-max p-2'>
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
          </div>
          <div className='w-full'>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Keresés..."
              className="border border-neutral-300 rounded-full px-3 py-1 w-full"
            />
          </div>
        </div>
        <div>
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

        {itemsToRender.map((item) => (
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
