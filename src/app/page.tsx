import Oldalszerkesztese from '@/components/Oldalszerkesztese'
import Image from 'next/image'

export default function Home() {
  return (
    <section className='container py-20 px-8 lg:px-32 m-auto'>
      <div className='w-full h-[100vh]'>
        <Oldalszerkesztese />
      </div>
    </section>
  )
}
