import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

const SYSTEM_PROMPT = `You are a compassionate, experienced memorial tribute writer. You help grieving families honor their loved ones with beautiful, dignified written tributes.

Your writing style is:
- Warm and heartfelt, never generic or templated
- Dignified and respectful of all faiths, cultures, and backgrounds
- Rich with specific details provided by the family
- Structured appropriately for each format (obituary, eulogy, etc.)
- Free of clichés — every tribute should feel unique to the person being honored

You will receive details about the deceased and produce a complete tribute package.`

export interface TributeInput {
  deceasedName: string
  dateOfBirth: string
  dateOfPassing: string
  relationship: string
  personalDetails: string
  tone: string
  specialRequests?: string
  includeSocialMedia: boolean
  includeThankYou: boolean
}

export async function generateTributePackage(input: TributeInput) {
  const userPrompt = `Please write a complete memorial tribute package for ${input.deceasedName}.

Details:
- Full Name: ${input.deceasedName}
- Date of Birth: ${input.dateOfBirth}
- Date of Passing: ${input.dateOfPassing}
- Your relationship: ${input.relationship}
- Personal details, memories, and qualities: ${input.personalDetails}
- Desired tone: ${input.tone}
${input.specialRequests ? `- Special requests: ${input.specialRequests}` : ''}

Please provide the following sections, clearly separated with headers:

## OBITUARY
Write a complete obituary suitable for newspaper publication and online memorial sites. Include biographical details, survived-by information if provided, and a warm closing.

## MEMORIAL PROGRAM
Write copy suitable for a printed memorial/funeral program. Include an opening, a brief life summary, and a closing thought or poem excerpt.

## EULOGY
Write a 3-5 minute spoken eulogy (approximately 500-750 words). Make it personal, warm, and suitable for delivery by the ${input.relationship}. Include natural pauses and emotional moments.

${input.includeSocialMedia ? `## SOCIAL MEDIA ANNOUNCEMENT
Write a brief, dignified social media announcement suitable for Facebook or similar platforms. Keep it under 200 words.` : ''}

${input.includeThankYou ? `## THANK YOU CARD
Write a brief, heartfelt thank you message suitable for cards sent to those who attended the service or sent condolences. Keep it under 100 words.` : ''}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
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
    max_tokens: 4096,
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
