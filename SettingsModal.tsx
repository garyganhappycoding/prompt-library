'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Nav from '@/components/Nav'
import Toast from '@/components/Toast'
import { FIELD_META, PromptFields, PromptEntry, loadApiKey, savePrompt, generateId, loadPrompts } from '@/lib/storage'
import { generatePromptWithGemini } from '@/lib/gemini'
import styles from './page.module.css'

type Step = 'name' | 'form' | 'result'

const emptyFields = (): PromptFields => ({
  task: '', identity: '', audience: '', outputFormat: '',
  context: '', reference: '', constraints: '', notes: '',
})

export default function BuilderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')

  const [step, setStep] = useState<Step>('name')
  const [promptName, setPromptName] = useState('')
  const [fields, setFields] = useState<PromptFields>(emptyFields())
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  // Load existing prompt if editing
  useEffect(() => {
    if (editId) {
      const prompts = loadPrompts()
      const found = prompts.find(p => p.id === editId)
      if (found) {
        setEditingId(found.id)
        setPromptName(found.name)
        setFields(found.fields)
        setGeneratedPrompt(found.generatedPrompt)
        setStep('form')
      }
    }
  }, [editId])

  function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!promptName.trim()) return
    setStep('form')
  }

  async function handleGenerate() {
    const apiKey = loadApiKey()
    if (!apiKey) {
      setError('No API key found. Click ⚙ in the nav to add your Gemini API key.')
      return
    }
    if (!fields.task.trim()) {
      setError('Please fill in at least the Goal / Task field.')
      return
    }
    setError('')
    setLoading(true)
    setGeneratedPrompt('')
    try {
      const result = await generatePromptWithGemini(promptName, fields, apiKey)
      setGeneratedPrompt(result)
      setStep('result')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Check your API key.')
    } finally {
      setLoading(false)
    }
  }

  function handleSave() {
    const entry: PromptEntry = {
      id: editingId || generateId(),
      name: promptName,
      createdAt: editingId ? '' : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fields,
      generatedPrompt,
    }
    if (!editingId) entry.createdAt = entry.updatedAt
    savePrompt(entry)
    setToast('Prompt saved!')
    setTimeout(() => router.push('/library'), 900)
  }

  function handleReset() {
    setStep('name')
    setPromptName('')
    setFields(emptyFields())
    setGeneratedPrompt('')
    setError('')
    setEditingId(null)
  }

  return (
    <>
      <Nav />
      <div className="page-wrapper">
        <div className={styles.container}>

          {/* STEP 1: Name entry */}
          {step === 'name' && (
            <div className={`${styles.nameStep} fade-up`}>
              <div className={styles.eyebrow}>new prompt</div>
              <h1 className={styles.heading}>What do you want<br />this prompt to do?</h1>
              <p className={styles.sub}>Give it a name to get started</p>
              <form onSubmit={handleNameSubmit} className={styles.nameForm}>
                <input
                  autoFocus
                  type="text"
                  placeholder="e.g. Instagram caption for study tips"
                  value={promptName}
                  onChange={e => setPromptName(e.target.value)}
                  className={styles.nameInput}
                  maxLength={80}
                />
                <button type="submit" className="btn-primary" disabled={!promptName.trim()}>
                  Continue →
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: Form */}
          {(step === 'form' || step === 'result') && (
            <div className={styles.formStep}>
              <div className={styles.formHeader}>
                <div>
                  <button className="btn-ghost" onClick={handleReset} style={{ marginBottom: 12, fontSize: 12, padding: '4px 0' }}>
                    ← Start over
                  </button>
                  <div className={styles.formTitle}>{promptName}</div>
                </div>
              </div>

              <div className={styles.formGrid}>
                {FIELD_META.map((f, i) => (
                  <div key={f.key} className={`${styles.fieldGroup} fade-up fade-up-delay-${Math.min(i + 1, 5)}`}>
                    <label className={styles.fieldLabel}>
                      {f.label}
                      {f.required && <span style={{ color: 'var(--accent)', marginLeft: 4 }}>*</span>}
                    </label>
                    <div className={styles.fieldDesc}>{f.description}</div>
                    <textarea
                      rows={f.rows || 2}
                      placeholder={`Enter ${f.label.toLowerCase()}...`}
                      value={fields[f.key]}
                      onChange={e => setFields(prev => ({ ...prev, [f.key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>

              {error && (
                <div className={styles.errorBox}>{error}</div>
              )}

              <div className={styles.formActions}>
                <button
                  className="btn-primary"
                  onClick={handleGenerate}
                  disabled={loading || !fields.task.trim()}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="spinner" />
                      Generating...
                    </span>
                  ) : step === 'result' ? 'Regenerate Prompt' : 'Generate Prompt'}
                </button>
              </div>

              {/* STEP 3: Result */}
              {step === 'result' && generatedPrompt && (
                <div className={`${styles.resultBox} fade-up`}>
                  <div className={styles.resultHeader}>
                    <span className="tag tag-accent">Generated Prompt</span>
                    <button
                      className="btn-ghost"
                      style={{ fontSize: 12 }}
                      onClick={() => {
                        navigator.clipboard.writeText(generatedPrompt)
                        setToast('Copied!')
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  <textarea
                    className={styles.resultText}
                    value={generatedPrompt}
                    onChange={e => setGeneratedPrompt(e.target.value)}
                    rows={10}
                    style={{ background: 'transparent', border: 'none', padding: 0, resize: 'vertical' }}
                  />
                  <hr className="divider" />
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn-primary" onClick={handleSave}>
                      Save to Library →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </>
  )
}
