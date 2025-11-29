import '../styles/globals.css'

export const metadata = {
  title: 'Rustic Store - Loja Online Moderna',
  description: 'Loja online de móveis e decoração rústica artesanal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}

