'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SettingsModal from './SettingsModal'

export default function Nav() {
  const pathname = usePathname()
  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav-logo">Prompt Library</Link>
        <div className="nav-links">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Builder</Link>
          <Link href="/library" className={`nav-link ${pathname === '/library' ? 'active' : ''}`}>Library</Link>
          <button className="nav-settings-btn" onClick={() => setShowSettings(true)} title="Settings">⚙</button>
        </div>
      </nav>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </>
  )
}
