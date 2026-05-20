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
      <body>{children}</body>
    </html>
  )
}
