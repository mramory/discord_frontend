import { Providers } from '@/Redux/providers'
import './globals.scss'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import ToasterContext from '@/context/ToasterContext'

const NotoSans = Noto_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Discord App',
  description: 'Discord app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body id='app' className={NotoSans.className}>
        <Providers>
          <ToasterContext />
          {children}
        </Providers>
      </body>
    </html>
  )
}
