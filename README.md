export interface PromptEntry {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  fields: PromptFields
  generatedPrompt: string
}

export interface PromptFields {
  task: string
  identity: string
  audience: string
  outputFormat: string
  context: string
  reference: string
  constraints: string
  notes: string
}

export const FIELD_META: { key: keyof PromptFields; label: string; description: string; required?: boolean; rows?: number }[] = [
  {
    key: 'task',
    label: 'Goal / Task',
    description: 'What do you want the AI to do?',
    required: true,
    rows: 2,
  },
  {
    key: 'identity',
    label: 'Identity / Role',
    description: 'What role should the AI take on? (e.g. "Act as a senior copywriter")',
    rows: 2,
  },
  {
    key: 'audience',
    label: 'Target Audience',
    description: 'Who is this output for? (e.g. "Malaysian university students aged 18–22")',
    rows: 2,
  },
  {
    key: 'outputFormat',
    label: 'Output Format',
    description: 'What should the result look like? (e.g. "3 bullet points", "500-word essay", "JSON")',
    rows: 2,
  },
  {
    key: 'context',
    label: 'Context / Background',
    description: 'Any background info or constraints the AI needs to know',
    rows: 3,
  },
  {
    key: 'reference',
    label: 'Reference / Examples',
    description: 'Sample tone, style, or examples you want the AI to follow',
    rows: 3,
  },
  {
    key: 'constraints',
    label: 'Constraints / Rules',
    description: 'Things the AI must NOT do (e.g. "No jargon", "Under 100 words")',
    rows: 2,
  },
  {
    key: 'notes',
    label: 'Notes / Extra',
    description: 'Any other instructions or edge cases to include',
    rows: 2,
  },
]

// localStorage helpers
const STORAGE_KEY = 'prompt_library_v1'

export function loadPrompts(): PromptEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function savePrompts(prompts: PromptEntry[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts))
}

export function savePrompt(entry: PromptEntry): void {
  const existing = loadPrompts()
  const idx = existing.findIndex(p => p.id === entry.id)
  if (idx >= 0) {
    existing[idx] = entry
  } else {
    existing.unshift(entry)
  }
  savePrompts(existing)
}

export function deletePrompt(id: string): void {
  const existing = loadPrompts()
  savePrompts(existing.filter(p => p.id !== id))
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

// API key helpers
const API_KEY_STORAGE = 'gemini_api_key'

export function loadApiKey(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(API_KEY_STORAGE) || ''
}

export function saveApiKey(key: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(API_KEY_STORAGE, key)
}
