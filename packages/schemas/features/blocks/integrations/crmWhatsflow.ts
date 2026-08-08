import { z } from 'zod'
import { blockBaseSchema } from '../baseSchemas'
import { IntegrationBlockType } from './enums'

export const crmWhatsflowOptionsSchema = z.object({
  titulo: z.string().min(1, { message: 'Campo de preenchimento obrigatório' }),
  nome: z.string().min(1, { message: 'Campo de preenchimento obrigatório' }),
  userId: z.string().min(1, { message: 'Campo de preenchimento obrigatório' }),
  email: z.string().min(1, { message: 'Campo de preenchimento obrigatório' }),
  url: z.string().min(1, { message: 'Campo de preenchimento obrigatório' }),
  token: z.string().min(1, { message: 'Campo de preenchimento obrigatório' }),
  stagio: z.string().min(1, { message: 'Campo de preenchimento obrigatório' }),
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
