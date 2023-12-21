'use client'

import NapimenuTile from '@/components/NapiMenu/NapimenuTile'
import { useState, useEffect } from 'react';

const getNapimenu = async () => {
  try {
      const res = await fetch('/api/napimenu', { cache: 'no-store' });

      if (!res.ok) {
          throw new Error("Az adatok letöltése nem sikerült");
      }

      return res.json();
  } catch (error) {
      console.log("Az adatok betöltése sikertlen", error);
      return null;
  }
};

const Napimenu = () => {

  const days = ['Hétfő' , 'Kedd' , 'Szerda' , 'Csütörtök' , 'Péntek']

  const [napimenu, setNapimenu] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getNapimenu();
            if (data && data.data && Array.isArray(data.data.Napimenu)) {
              setNapimenu(data.data.Napimenu);
            } else {
                throw new Error("Invalid data format received");
            }
        } catch (error) {
            console.error("Error fetching or handling data:", error);
        }
    };
    fetchData();
}, []);

  return (
    <section className='container py-20 px-8 lg:px-32 m-auto'>
      <div className='flex flex-col gap-8'>

      {napimenu.map((item, index) => (

        <NapimenuTile key={item._id} id={item._id} day={days[index]} date={item.date} aMenuLeves={item.aMenuLeves} aMenuFoetel={item.aMenuFoetel} bMenuLeves={item.bMenuLeves} bMenuFoetel={item.bMenuFoetel}/>

      ))}

      </div>
    </section>
  )
}

export default Napimenu;
