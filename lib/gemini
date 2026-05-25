import { PromptFields } from './storage'

export async function generatePromptWithGemini(
  promptName: string,
  fields: PromptFields,
  apiKey: string
): Promise<string> {
  const filledFields = Object.entries(fields)
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
    .join('\n')

  const metaPrompt = `You are a world-class prompt engineering expert. Your job is to take a user's rough inputs and synthesise them into a single, polished, production-ready AI prompt.

The user wants to create a prompt named: "${promptName}"

Here are the inputs they provided:
${filledFields}

Your task:
1. Write ONE clear, complete, and reusable AI prompt that incorporates all the user's inputs naturally.
2. The prompt should be ready to paste directly into any AI tool (ChatGPT, Gemini, Claude, etc.).
3. Structure it so it includes: role/identity, clear task, relevant context, output format, and any constraints — woven naturally into the prompt, not as labelled sections.
4. Write in second person ("You are...", "Your task is...").
5. Be specific, not vague. Replace any generic language with concrete detail from the user's inputs.
6. Output ONLY the final prompt. No preamble, no explanation, no labels. Just the prompt itself.`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: metaPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    }
  )

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    const message = (err as any)?.error?.message || `HTTP ${response.status}`
    throw new Error(message)
  }

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('No response from Gemini. Please try again.')
  return text.trim()
}
