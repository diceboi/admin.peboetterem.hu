"use client"

import RendelesTile from '@/components/Rendeles/RendelesTile'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const getNapimenuadatok = async () => {
  try {
      const res = await fetch('/api/napimenuadatok', { cache: 'no-store' });

      if (!res.ok) {
          throw new Error("Az adatok letöltése nem sikerült");
      }

      return res.json();
  } catch (error) {
      console.log("Az adatok betöltése sikertlen", error);
      return null;
  }
};

export default function Rendelesek() {

  const [rendelesek, setRendelesek] = useState<any[]>([]);
  const [napimenuadatok, setNapimenuadatok] = useState<any[]>([]);
  const [amenutoggle, setAmenuToggle] = useState(false);
  const [bmenutoggle, setBmenuToggle] = useState(false);
  const [amenulevestoggle, setAmenuLevesToggle] = useState(false);
  const [bmenulevestoggle, setBmenuLevesToggle] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    amenuelfogyott: false,
    bmenuelfogyott: true,
    amenuleveselfogyott: false,
    bmenuleveselfogyott: true,
  });

  const toggleAmenu = () => setAmenuToggle(prevState => !prevState);
  const toggleBmenu = () => setBmenuToggle(prevState => !prevState);
  const toggleAmenuLeves = () => setAmenuLevesToggle(prevState => !prevState);
  const toggleBmenuLeves = () => setBmenuLevesToggle(prevState => !prevState);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/rendelesek');
      if (!res.ok) {
        throw new Error('Az adatok letöltése nem sikerült');
      }
      const data = await res.json();
      setRendelesek(data.data.Rendelesek);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Polling every 5 seconds, adjust as needed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNapimenuadatok();
        if (data && data.data && Array.isArray(data.data.Napimenuadatok)) {
          setNapimenuadatok(data.data.Napimenuadatok);
  
          const initialData = data.data.Napimenuadatok[0];
          setUpdatedData({
            amenuelfogyott: initialData.amenuelfogyott,
            bmenuelfogyott: initialData.bmenuelfogyott,
            amenuleveselfogyott: initialData.amenuleveselfogyott,
            bmenuleveselfogyott: initialData.bmenuleveselfogyott,
          });
  
          // Update the initial state based on fetched data
          setAmenuToggle(initialData.amenuelfogyott);
          setBmenuToggle(initialData.bmenuelfogyott);
          setAmenuLevesToggle(initialData.amenuleveselfogyott);
          setBmenuLevesToggle(initialData.bmenuleveselfogyott);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching or handling data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    handleSave();
  }, [amenutoggle, bmenutoggle, amenulevestoggle, bmenulevestoggle]);

  const napimenuadatokData = napimenuadatok.length > 0 ? napimenuadatok[0] : null;

  const handleSave = async () => {
    try {
      const updatedDataToSend = {
        amenuelfogyott: amenutoggle,
        bmenuelfogyott: bmenutoggle,
        amenuleveselfogyott: amenulevestoggle,
        bmenuleveselfogyott: bmenulevestoggle,
      };

      const res = await fetch(`/api/updateNapimenuadatok/${napimenuadatokData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedData: updatedDataToSend }),
      });

      if (res.ok) {
        toast.success('Sikeres frissítés');
      } else {
        toast.error('A frissítés nem sikerült');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <section className='container py-20 px-8 lg:px-32 m-auto'>

      <div className='flex flex-col lg:flex-row justify-around gap-8 w-full pb-20'>
        <div className='flex flex-nowrap gap-2'>
          <p>A menü rendelhető?</p>
          <div onClick={() => { toggleAmenu()}} className={`flex h-6 w-12 cursor-pointer rounded-full p-[1px] ${amenutoggle? 'bg-red-200 justify-end' : 'bg-green-200 justify-start'}`}>
            <motion.div 
              className={`h-5 w-5 rounded-full bg-black`} 
              layout
              transition={{type: 'spring' , stiffness: 700, damping: 30}}
            />
          </div>
        </div>

        <div className='flex flex-nowrap gap-2'>
          <p>B menü rendelhető?</p>
          <div onClick={() => { toggleBmenu()}} className={`flex h-6 w-12 cursor-pointer rounded-full p-[1px] ${bmenutoggle? 'bg-red-200 justify-end' : 'bg-green-200 justify-start'}`}>
            <motion.div 
              className={`h-5 w-5 rounded-full bg-black`} 
              layout
              transition={{type: 'spring' , stiffness: 700, damping: 30}}
            />
          </div>
        </div>

        <div className='flex flex-nowrap gap-2'>
          <p>A menü leves rendelhető?</p>
          <div onClick={() => { toggleAmenuLeves()}} className={`flex h-6 w-12 cursor-pointer rounded-full p-[1px] ${amenulevestoggle? 'bg-red-200 justify-end' : 'bg-green-200 justify-start'}`}>
            <motion.div 
              className={`h-5 w-5 rounded-full bg-black`} 
              layout
              transition={{type: 'spring' , stiffness: 700, damping: 30}}
            />
          </div>
        </div>

        <div className='flex flex-nowrap gap-2'>
        <p>B menü leves rendelhető?</p>
          <div onClick={() => { toggleBmenuLeves()}} className={`flex h-6 w-12 cursor-pointer rounded-full p-[1px] ${bmenulevestoggle? 'bg-red-200 justify-end' : 'bg-green-200 justify-start'}`}>
            <motion.div 
              className={`h-5 w-5 rounded-full bg-black`} 
              layout
              transition={{type: 'spring' , stiffness: 700, damping: 30}}
            />
          </div>
        </div>

      </div>

      <div className='flex flex-col gap-8'>

      {rendelesek.slice().reverse().map((rendelesekData, index) => (
        <RendelesTile 
        key={index} 
        data={rendelesekData}
        />
      ))}

      </div>
    </section>
  )
}
