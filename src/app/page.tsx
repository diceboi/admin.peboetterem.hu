import Oldalszerkesztese from '@/components/Oldalszerkesztese'
import LoginForm from '@/components/UI/LoginForm'
import RegisterForm from '@/components/UI/RegisterForm'
import Image from 'next/image'
import Rendelesek from './rendelesek/page'

export default function Home() {
  return (
    <section className='container py-20 px-8 lg:px-32 m-auto'>
      <div className='w-full h-[100vh]'>
        <Rendelesek />
      </div>
    </section>
  )
}
