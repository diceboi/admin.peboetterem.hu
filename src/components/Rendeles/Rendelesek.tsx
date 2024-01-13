"use client"

import RendelesTile from '@/components/Rendeles/RendelesTile'
import { useEffect, useState } from 'react';

export default function Rendelesek() {

  const [rendelesek, setRendelesek] = useState<any[]>([]);

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

  return (
    <section className='container py-20 px-8 lg:px-32 m-auto'>
      <div className='flex flex-col gap-8'>

      {rendelesek.slice().reverse().map((rendelesekData, index) => (
        <RendelesTile key={index} data={rendelesekData} />
      ))}

      </div>
    </section>
  )
}
