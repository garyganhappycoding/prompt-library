'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import Toast from '@/components/Toast'
import { loadPrompts, deletePrompt, PromptEntry, FIELD_META } from '@/lib/storage'
import styles from './library.module.css'

export default function LibraryPage() {
  const router = useRouter()
  const [prompts, setPrompts] = useState<PromptEntry[]>([])
  const [selected, setSelected] = useState<PromptEntry | null>(null)
  const [toast, setToast] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  const refresh = useCallback(() => setPrompts(loadPrompts()), [])
  useEffect(() => { refresh() }, [refresh])

  function handleDelete(id: string) {
    deletePrompt(id)
    setSelected(null)
    refresh()
    setToast('Deleted.')
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text)
    setToast('Copied to clipboard!')
  }

  function handleEdit(id: string) {
    router.push(`/?edit=${id}`)
  }

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })
    } catch { return '' }
  }

  return (
    <>
      <Nav />
      <div className="page-wrapper">
        <div className={styles.container}>

          <div className={`${styles.header} fade-up`}>
            <div>
              <div className={styles.eyebrow}>your collection</div>
              <h1 className={styles.heading}>Prompt Library</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <span style={{ color: 'var(--text-3)', fontSize: 13 }}>{prompts.length} prompt{prompts.length !== 1 ? 's' : ''}</span>
              <button className="btn-primary" onClick={() => router.push('/')}>+ New Prompt</button>
            </div>
          </div>

          {prompts.length === 0 ? (
            <div className={`${styles.empty} fade-up fade-up-delay-1`}>
              <div className={styles.emptyIcon}>◻</div>
              <div className={styles.emptyTitle}>No prompts yet</div>
              <div className={styles.emptySub}>Build your first prompt using the Builder</div>
              <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => router.push('/')}>
                Open Builder →
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {prompts.map((p, i) => (
                <div
                  key={p.id}
                  className={`${styles.card} fade-up fade-up-delay-${Math.min(i + 1, 5)}`}
                  onClick={() => { setSelected(p); setShowDetails(false) }}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.cardName}>{p.name}</div>
                    <div className={styles.cardDate}>{formatDate(p.updatedAt || p.createdAt)}</div>
                  </div>
                  <div className={styles.cardPreview}>
                    {p.generatedPrompt.slice(0, 120)}{p.generatedPrompt.length > 120 ? '…' : ''}
                  </div>
                  <div className={styles.cardFooter}>
                    <span className="tag tag-muted">
                      {Object.values(p.fields).filter(v => v.trim()).length} / {Object.keys(p.fields).length} fields
                    </span>
                    <span style={{ color: 'var(--accent)', fontSize: 12 }}>Open →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Prompt modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" style={{ maxWidth: 680 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20 }}>{selected.name}</div>
                <div style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 2 }}>{formatDate(selected.updatedAt || selected.createdAt)}</div>
              </div>
              <button className="btn-ghost" onClick={() => setSelected(null)} style={{ fontSize: 22, padding: '2px 10px' }}>×</button>
            </div>
            <div className="modal-body">

              {/* Generated prompt */}
              <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="tag tag-accent">Prompt</span>
                <button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => handleCopy(selected.generatedPrompt)}>
                  Copy
                </button>
              </div>
              <div className={styles.promptBox}>
                {selected.generatedPrompt}
              </div>

              <hr className="divider" />

              {/* Q&A toggle */}
              <button
                className="btn-ghost"
                style={{ fontSize: 12, padding: '6px 0', marginBottom: showDetails ? 16 : 0 }}
                onClick={() => setShowDetails(v => !v)}
              >
                {showDetails ? '▾ Hide inputs' : '▸ Show original inputs'}
              </button>

              {showDetails && (
                <div className={styles.detailsGrid}>
                  {FIELD_META.map(f => selected.fields[f.key] ? (
                    <div key={f.key} className={styles.detailItem}>
                      <div className={styles.detailLabel}>{f.label}</div>
                      <div className={styles.detailValue}>{selected.fields[f.key]}</div>
                    </div>
                  ) : null)}
                </div>
              )}

              <hr className="divider" />

              <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
                <button className="btn-danger" onClick={() => handleDelete(selected.id)}>Delete</button>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn-secondary" onClick={() => handleEdit(selected.id)}>Edit & Regenerate</button>
                  <button className="btn-primary" onClick={() => handleCopy(selected.generatedPrompt)}>Copy Prompt</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </>
  )
}
