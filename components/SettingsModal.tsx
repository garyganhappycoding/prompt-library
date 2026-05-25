'use client'
import { useState, useEffect } from 'react'
import { loadApiKey, saveApiKey } from '@/lib/storage'

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const [key, setKey] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setKey(loadApiKey())
  }, [])

  function handleSave() {
    saveApiKey(key.trim())
    setSaved(true)
    setTimeout(() => { setSaved(false); onClose() }, 800)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>API Settings</div>
            <div style={{ color: 'var(--text-2)', fontSize: 12, marginTop: 2 }}>Your key is stored locally, never shared</div>
          </div>
          <button className="btn-ghost" onClick={onClose} style={{ fontSize: 20, padding: '4px 10px' }}>×</button>
        </div>
        <div className="modal-body">
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-2)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Gemini API Key
          </label>
          <input
            type="password"
            placeholder="AIza..."
            value={key}
            onChange={e => setKey(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20, lineHeight: 1.7 }}>
            Get your free API key from{' '}
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer"
               style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Google AI Studio →
            </a>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={handleSave} disabled={!key.trim()}>
              {saved ? '✓ Saved' : 'Save Key'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
