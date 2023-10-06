import './globals.css'
import type { Metadata } from 'next'
import { camptonBook, camptonBold } from './styles/fonts'

export const metadata: Metadata = {
  title: 'Mother Volcano',
  description: 'Creative Coder and Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={camptonBook.className}>{children}</body>
    </html>
  )
}
