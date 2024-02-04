import './globals.css'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Viktor Recour',
  description: 'Lvl II Full Stack Engineer at Lighthouse',
}

export default function RootLayout({ children }) {
  return (
    <html className='scroll-smooth bg-slate-900' lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
