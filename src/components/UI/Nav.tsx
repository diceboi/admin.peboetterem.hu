"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'

export default function Nav() {

  const pathName = usePathname();
  const { data: session } = useSession();

  // Fetch order data

  const [rendelesek, setRendelesek] = useState<any[]>([]);
  const [rendelescount, setRendelesCount] = useState(0);
  const [prevRendelesCount, setPrevRendelesCount] = useState(0);

  // Audio element for playing sound
  const newOrderSound = new Audio('/newrendeles.mp3');

  const fetchData = async () => {
    try {
      const res = await fetch('/api/rendelesek');
      if (!res.ok) {
        throw new Error('Az adatok letöltése nem sikerült');
      }
      const data = await res.json();
      const notDeliveredOrders = data.data.Rendelesek.filter((order: any) => !order.kiszallitva);

      // Check if new orders have been received
      if (notDeliveredOrders.length > prevRendelesCount) {
        // Play the sound for new orders
        newOrderSound.play();
      }

      setRendelesek(notDeliveredOrders);
      setPrevRendelesCount(notDeliveredOrders.length); // Update previous count
      setRendelesCount(notDeliveredOrders.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, [rendelesek.length]);

  // Add index signature to allow dynamic access
  const initialButtonStates: { [key: string]: boolean } = {
    button1Clicked: pathName === '/oldal-szerkesztese',
    button2Clicked: pathName === '/napimenu',
    button3Clicked: pathName === '/etlap',
    button4Clicked: pathName === '/rendelesek',
  };

  const [buttonStates, setButtonStates] = useState(initialButtonStates);

  const handleButtonClick = (buttonName: string) => {
    setButtonStates((prevState) => {
      return {
        ...prevState,
        button1Clicked: buttonName === 'button1Clicked' && pathName === '/oldal-szerkesztese',
        button2Clicked: buttonName === 'button2Clicked' && pathName === '/napimenu',
        button3Clicked: buttonName === 'button3Clicked' && pathName === '/etlap',
        button4Clicked: buttonName === 'button4Clicked' && pathName === '/rendelesek',
      };
    });
    // Perform additional actions if needed
  };

  const buttonClasses = (buttonName: string) =>
    buttonStates[buttonName]
      ? 'border-neutral-300 border-t border-x rounded-t-md px-4 py-2 cursor-pointer bg-white -mb-[1px]'
      : 'hover:border-neutral-300 border-t border-x border-transparent hover:border-x hover:border-t rounded-t-md px-4 py-2 cursor-pointer hover:bg-white -mb-[1px]';

  useEffect(() => {
    // Update button states when the route changes
    setButtonStates((prevState) => {
      return {
        ...prevState,
        button1Clicked: pathName === '/oldal-szerkesztese',
        button2Clicked: pathName === '/napimenu',
        button3Clicked: pathName === '/etlap',
        button4Clicked: pathName === '/rendelesek',
      };
    });
  }, [pathName]);

  return (
    <nav>
        <div className="flex justify-between items-center w-full h-16 border-b border-neutral-300">
          <div className="flex justify-start items-center w-60 h-full p-4">
          <Link href='/'><Image src="/pebo-admin-logo.svg" width={150} height={50} alt='logo'/></Link>
          </div>
          <div className='flex justify-center items-end w-1/2 h-full'>
            <ul className='flex justify-center items-end w-full h-full gap-8 flex-nowrap font-bebas text-xl text-[--navy]'>
              <Link href='/oldal-szerkesztese'><li className={buttonClasses('button1Clicked')} onClick={() => handleButtonClick('button1Clicked')}>Oldal szerkesztése</li></Link>
              <Link href='/napimenu'><li className={buttonClasses('button2Clicked')} onClick={() => handleButtonClick('button2Clicked')}>Napi menü</li></Link>
              <Link href='/etlap'><li className={buttonClasses('button3Clicked')} onClick={() => handleButtonClick('button3Clicked')}>Étlap</li></Link>
              <Link href='/rendelesek' className='relative'><span className={rendelescount === 0 ? `absolute text-sm text-white px-2 py-1 -top-3 -right-3 bg-green-700 rounded-full` : `absolute text-sm text-white px-2 py-1 -top-3 -right-3 bg-[--alert] rounded-full`}>{rendelescount}</span><li className={buttonClasses('button4Clicked')} onClick={() => handleButtonClick('button4Clicked')}>Rendelések</li></Link>
            </ul>
          </div>
          <div className='flex justify-end items-center gap-4 w-60 p-4'>

            {session ? (
              <>
              <p className='min-w-max'>{`Hello, ${session.user?.name}`}</p>
              <button onClick={() => signOut()} className='flex px-2 py-1 border rounded-md hover:text-white hover:bg-black hover:border-black transition-all'>Kijelentkezés</button>
              </>
            ) : (
              <>
              <Link href="/login" className='flex px-2 py-1 border rounded-md text-white bg-black border-black hover:text-black hover:bg-neutral-300 hover:border-neutral-400 transition-all'>Bejelentkezés</Link>
              </>
            )}
          </div>
        </div>
    </nav>
  )
}
