import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Playball } from 'next/font/google'
import './globals.css'
import { ApolloWrapper } from '@/lib/apollo-wrapper'

import Nav from '@/components/UI/Nav'

const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'], 
  weight: ['400'],
  variable: '--font-bebas' 
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playball = Playball({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-playball'
})

export const metadata: Metadata = {
  title: 'PEBo Étterem | Admin',
  description: 'Szerkesztői felület',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ApolloWrapper>
      <body className={`${bebasNeue.variable} ${inter.variable} ${playball.variable}`}>
        <div className='w-max-full'>
          <Nav />
          {children}
        </div>
      </body>
      </ApolloWrapper>
    </html>
  )
}
