import { z } from 'zod'
import { blockBaseSchema } from '../baseSchemas'
import { LogicBlockType } from './enums'

export const tagOptionsSchema = z.object({
  color: z.string().optional(),
  name: z.string().optional(),
})

export const tagBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum([LogicBlockType.TAG]),
    options: tagOptionsSchema,
  })
)

export const defaultTagOptions: TagOptions = {}

export type TagBlock = z.infer<typeof tagBlockSchema>
export type TagOptions = z.infer<typeof tagOptionsSchema>
