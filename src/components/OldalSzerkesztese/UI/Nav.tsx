import Image from 'next/image'

export default function Nav() {
  return (
    <nav>
        <div className="flex justify-between items-center w-full h-16 border-b border-neutral-300">
          <div className="flex justify-start items-center w-60 h-full p-4">
            <Image src="/pebo-admin-logo.svg" width={150} height={50} alt='logo'/>
          </div>
          <div className='flex justify-center items-end w-1/2 h-full'>
            <ul className='flex justify-center items-end w-full h-full gap-8 flex-nowrap font-bebas text-xl text-[--navy]'>
              <li className='hover:border-neutral-300 border-t border-x border-transparent hover:border-x hover:border-t rounded-t-md px-4 py-2 cursor-pointer hover:bg-white -mb-[1px]'>Oldal szerkesztése</li>
              <li className='hover:border-neutral-300 border-t border-x border-transparent hover:border-x hover:border-t rounded-t-md px-4 py-2 cursor-pointer hover:bg-white -mb-[1px]'>Napi menü</li>
              <li className='hover:border-neutral-300 border-t border-x border-transparent hover:border-x hover:border-t rounded-t-md px-4 py-2 cursor-pointer hover:bg-white -mb-[1px]'>Étlap</li>
              <li className='hover:border-neutral-300 border-t border-x border-transparent hover:border-x hover:border-t rounded-t-md px-4 py-2 cursor-pointer hover:bg-white -mb-[1px]'>Rendelések</li>
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