import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '../auth/AuthContext'
import Link from 'next/link'
import NavBar from '../components/NavBar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SoraStudio',
  description: 'Create AI videos from templates — no prompts required',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <header className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
              <Link href="/" className="text-xl font-semibold tracking-tight"><span className="heading-gradient">SoraStudio</span></Link>
              <NavBar />
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 py-10">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}