import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bloom - Morphing Menu Component',
  description:
    'A React component that transforms with fluid morphing animations. Accessible, customizable, and delightful.',
  keywords: [
    'react',
    'menu',
    'popover',
    'animation',
    'morph',
    'framer-motion',
    'ui',
    'component',
  ],
  authors: [{ name: 'Josh' }],
  openGraph: {
    title: 'Bloom - Morphing Menu Component',
    description: 'A React component that transforms with fluid morphing animations.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
