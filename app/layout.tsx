import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ŌRBIT — Studio Nativo en IA',
  description: 'Studio nativo en IA que construye plataformas web y sistemas inteligentes sobre el stack de frontera.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
