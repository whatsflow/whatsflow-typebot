import { z } from 'zod'
import { blockBaseSchema } from '../baseSchemas'
import { IntegrationBlockType } from './enums'

export const crmWhatsflowOptionsSchema = z.object({
  chatId: z.string().optional(),
  titulo: z.string().optional(),
  nome: z.string().optional(),
  userId: z.string().optional(),
  email: z.string().optional(),
  url: z.string().optional(),
  token: z.string().optional(),
  stagio: z.string().optional(),
  camp_pers: z
    .object({
      isEnabled: z.boolean().optional(),
      body: z.string().optional(),
    })
    .optional(),
})

export const crmWhatsflowBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum([IntegrationBlockType.CRM_WHATSFLOW]),
    options: crmWhatsflowOptionsSchema,
  })
)

export const defaultCrmWhatsflowOptions: CrmWhatsflowOptions = {
  chatId: '',
  titulo: '',
  nome: '',
  userId: '',
  email: '',
  url: '',
  token: '',
  stagio: '',
  camp_pers: {
    isEnabled: false,
    body: '{}',
  },
}

export type CrmWhatsflowOptions = z.infer<typeof crmWhatsflowOptionsSchema>
export type CrmWhatsflowBlock = z.infer<typeof crmWhatsflowBlockSchema>
