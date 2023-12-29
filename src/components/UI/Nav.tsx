"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';

export default function Nav() {

  const initialButtonStates = {
    button1Clicked: false,
    button2Clicked: false,
    button3Clicked: false,
    button4Clicked: false,
  };

  const [buttonStates, setButtonStates] = useState(initialButtonStates);

  const handleButtonClick = (buttonName: keyof typeof initialButtonStates) => {
    setButtonStates((prevState) => {
      const newState = { ...initialButtonStates };
      newState[buttonName] = true;
      return newState;
    });
    // Perform additional actions if needed
  };

  const buttonClasses = (buttonName: keyof typeof initialButtonStates) =>
    buttonStates[buttonName]
      ? 'border-neutral-300 border-t border-x rounded-t-md px-4 py-2 cursor-pointer bg-white -mb-[1px]'
      : 'hover:border-neutral-300 border-t border-x border-transparent hover:border-x hover:border-t rounded-t-md px-4 py-2 cursor-pointer hover:bg-white -mb-[1px]';

  return (
    <nav>
        <div className="flex justify-between items-center w-full h-16 border-b border-neutral-300">
          <div className="flex justify-start items-center w-60 h-full p-4">
          <Link href='/rendelesek'><Image src="/pebo-admin-logo.svg" width={150} height={50} alt='logo'/></Link>
          </div>
          <div className='flex justify-center items-end w-1/2 h-full'>
            <ul className='flex justify-center items-end w-full h-full gap-8 flex-nowrap font-bebas text-xl text-[--navy]'>
              <Link href='/oldal-szerkesztese'><li className={buttonClasses('button1Clicked')} onClick={() => handleButtonClick('button1Clicked')}>Oldal szerkesztése</li></Link>
              <Link href='/napimenu'><li className={buttonClasses('button2Clicked')} onClick={() => handleButtonClick('button2Clicked')}>Napi menü</li></Link>
              <Link href='/etlap'><li className={buttonClasses('button3Clicked')} onClick={() => handleButtonClick('button3Clicked')}>Étlap</li></Link>
              <li className={buttonClasses('button4Clicked')} onClick={() => handleButtonClick('button4Clicked')}>Rendelések</li>
            </ul>
          </div>
          <div className='flex justify-end items-center gap-4 w-60 p-4'>
            <p>Hello, Endre</p>
            <button>Kijelentkezés</button>
          </div>
        </div>
    </nav>
  )
}
