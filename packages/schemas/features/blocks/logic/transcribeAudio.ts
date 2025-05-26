import { z } from 'zod'
import { blockBaseSchema } from '../baseSchemas'
import { LogicBlockType } from './enums'

export const transcribeAudioOptionsSchema = z.object({
  active: z.boolean(),
})

export const transcribeAudioBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum([LogicBlockType.TRANSCRIBE_AUDIO]),
    options: transcribeAudioOptionsSchema,
  })
)

export const defaultTranscribeAudioOptions: TranscribeAudioOptions = {
  active: true,
}

export type TranscribeAudioBlock = z.infer<typeof transcribeAudioBlockSchema>
export type TranscribeAudioOptions = z.infer<
  typeof transcribeAudioOptionsSchema
>
