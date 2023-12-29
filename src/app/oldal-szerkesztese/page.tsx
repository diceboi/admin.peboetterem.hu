'use client'

import Alapadatok from '@/components/OldalSzerkesztese/Alapadatok';
import Specialisarak from '@/components/OldalSzerkesztese/Specialisarak';
import { useState, useEffect } from 'react';

const getAlapadatok = async () => {
  try {
      const res = await fetch('/api/alapadatok', { cache: 'no-store' });

      if (!res.ok) {
          throw new Error("Az adatok letöltése nem sikerült");
      }

      return res.json();
  } catch (error) {
      console.log("Az adatok betöltése sikertlen", error);
      return null;
  }
};

const getSpecialisarak = async () => {
  try {
      const res = await fetch('/api/specialisarak', { cache: 'no-store' });

      if (!res.ok) {
          throw new Error("Az adatok letöltése nem sikerült");
      }

      return res.json();
  } catch (error) {
      console.log("Az adatok betöltése sikertlen", error);
      return null;
  }
};

const OldalSzerkesztese = () => {

  const [alapadatok, setAlapadatok] = useState<any[]>([]);
  const [specialisarak, setSpecialisarak] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getSpecialisarak();
            if (data && data.data && Array.isArray(data.data.Specialisarak)) {
              setSpecialisarak(data.data.Specialisarak);
            } else {
                throw new Error("Invalid data format received");
            }
        } catch (error) {
            console.error("Error fetching or handling data:", error);
        }
    };
    fetchData();
  }, []);

  const oldalszerkeszteseData = alapadatok.length > 0 ? alapadatok[0] : null;
  const specialisarakData = specialisarak.length > 0 ? specialisarak[0] : null;

  return (
    <section className='container py-20 px-8 lg:px-32 m-auto'>
      <div className='flex flex-col gap-8'>
      
      {oldalszerkeszteseData && (

        <Alapadatok
          id={oldalszerkeszteseData._id}
          cim={oldalszerkeszteseData.cim}
          email={oldalszerkeszteseData.email}
          facebook={oldalszerkeszteseData.facebook}
          mobil={oldalszerkeszteseData.mobil}
          vezetekes={oldalszerkeszteseData.vezetekes}
          nyitvatartashepe={oldalszerkeszteseData.nyitvatartashepe}
          nyitvatartasszo={oldalszerkeszteseData.nyitvatartasszo}
          nyitvatartasv={oldalszerkeszteseData.nyitvatartasv}
          rendelesfelvetel={oldalszerkeszteseData.rendelesfelvetel}
        />

      )}

      {specialisarakData && (

        <Specialisarak
          id={specialisarakData._id}
          csomagolas={specialisarakData.csomagolas}
          kaposfured={specialisarakData.kaposfured}
          toponar={specialisarakData.toponar}
          juta={specialisarakData.juta}
          kaposujlak={specialisarakData.kaposujlak}
          taszar={specialisarakData.taszar}
        />

      )}
      </div>
    </section>
  )
}

export default OldalSzerkesztese;