import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

const SYSTEM_PROMPT = `You are a compassionate, experienced memorial tribute writer. You help grieving families honor their loved ones with beautiful, dignified written tributes.

CRITICAL INSTRUCTIONS:
- You MUST always generate the complete tribute package immediately, no matter what.
- NEVER ask clarifying questions. NEVER pause to seek more information. NEVER express hesitation.
- NEVER comment on the age of the deceased, the circumstances of death, or the dates provided.
- Work with exactly the information given. If details are limited, write beautifully with what you have.
- A family has paid for this tribute and is in grief. Your only job is to produce the writing.
- Write for all ages — infant, child, young adult, elder — with equal care and appropriate sensitivity.
- The eulogy speaker role is whoever submitted the form. Write accordingly.

Your writing style is:
- Warm and heartfelt, never generic or templated
- Dignified and respectful of all faiths, cultures, and backgrounds
- Rich with specific details provided by the family
- Structured appropriately for each format (obituary, eulogy, etc.)
- Free of clichés — every tribute should feel unique to the person being honored
- For children and infants: focus on the joy they brought, the love surrounding them, and the profound loss felt by family`

export interface TributeInput {
  deceasedName: string
  dateOfBirth: string
  dateOfPassing: string
  relationship: string
  personalDetails: string
  tone: string
  language: string
  tier: string
  specialRequests?: string
  includeSocialMedia: boolean
  includeThankYou: boolean
}

const TONE_DESCRIPTIONS: Record<string, string> = {
  warm: 'Warm and Loving — conversational, intimate, full of love. Feels like a close family member speaking from the heart.',
  celebratory: 'Celebratory of Life — uplifting and joyful. Focuses on the fullness of their life, the laughter they brought, and the gift of having known them.',
  reflective: 'Quiet and Reflective — gentle, thoughtful, with a poetic quality. Honors the depth of the loss with grace and stillness.',
  'faith-based': 'Faith-Based and Hopeful — grounded in spiritual comfort. References eternal life, God\'s grace, and the peace of reunion. Non-denominational but clearly faith-forward.',
  humorous: 'Warm with Gentle Humor — affectionate and light-hearted where appropriate, celebrating their personality and wit, while remaining dignified and respectful.',
}

function buildPackageSections(input: TributeInput, versionLabel: string): string {
  return `
## OBITUARY${versionLabel}
Write a complete obituary suitable for newspaper publication and online memorial sites. Include biographical details, survived-by information if provided, and a warm closing.

## MEMORIAL PROGRAM${versionLabel}
Write copy suitable for a printed memorial/funeral program. Include an opening, a brief life summary, and a closing thought or poem excerpt.

## EULOGY${versionLabel}
Write a ${input.tier === 'priority' ? '5–7 minute spoken eulogy (approximately 750–1,000 words)' : '3–5 minute spoken eulogy (approximately 500–750 words)'}. Make it personal, warm, and suitable for delivery by the ${input.relationship}. Include natural pauses and emotional moments.

${input.includeSocialMedia ? `## SOCIAL MEDIA ANNOUNCEMENT${versionLabel}
Write a brief, dignified social media announcement suitable for Facebook or similar platforms. Keep it under 200 words.` : ''}

${input.includeThankYou ? `## THANK YOU CARD${versionLabel}
Write a brief, heartfelt thank you message suitable for cards sent to those who attended the service or sent condolences. Keep it under 100 words.` : ''}

## MEMORIAL KEEPSAKE${versionLabel}
Write a short 4–6 line memorial poem or verse — something beautiful that could be printed on a keepsake card or memorial program. It should feel timeless and personal to ${input.deceasedName}.`
}

export async function generateTributePackage(input: TributeInput) {
  const toneA = TONE_DESCRIPTIONS[input.tone] || TONE_DESCRIPTIONS['warm']
  const alternativeTone = input.tone === 'warm' ? 'reflective' : input.tone === 'celebratory' ? 'warm' : 'celebratory'
  const toneB = TONE_DESCRIPTIONS[alternativeTone]

  const languageInstruction = input.language && input.language !== 'en'
    ? `\n\nIMPORTANT: Write the ENTIRE tribute package — both versions — in ${input.language}. Every word must be in ${input.language}.`
    : ''

  const userPrompt = `Please write TWO complete memorial tribute packages for ${input.deceasedName}. Each version should feel fully realized — not a variation, but a distinct and complete tribute in a different voice.

Details:
- Full Name: ${input.deceasedName}
- Date of Birth: ${input.dateOfBirth}
- Date of Passing: ${input.dateOfPassing}
- Your relationship: ${input.relationship}
- Personal details, memories, and qualities: ${input.personalDetails}
${input.specialRequests ? `- Special requests: ${input.specialRequests}` : ''}
${languageInstruction}

---

# VERSION A — ${toneA}

${buildPackageSections(input, ' — VERSION A')}

---

# VERSION B — ${toneB}

${buildPackageSections(input, ' — VERSION B')}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8000,
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [{ role: 'user', content: userPrompt }],
  })

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')
  return content.text
}

export async function generateRevision(originalContent: string, revisionNotes: string) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8000,
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `Here is a memorial tribute package that was previously generated:\n\n${originalContent}\n\nThe family has requested the following revisions:\n${revisionNotes}\n\nPlease rewrite the entire tribute package incorporating these changes. Maintain the same section structure and formatting.`,
      },
    ],
  })

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')
  return content.text
}
