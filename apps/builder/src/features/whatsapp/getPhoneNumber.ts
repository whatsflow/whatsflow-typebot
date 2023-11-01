import { authenticatedProcedure } from '@/helpers/server/trpc'
import { z } from 'zod'
import got from 'got'
import prisma from '@typebot.io/lib/prisma'
import { decrypt } from '@typebot.io/lib/api/encryption/decrypt'
import { TRPCError } from '@trpc/server'
import { WhatsAppCredentials } from '@typebot.io/schemas/features/whatsapp'

const inputSchema = z.object({
  credentialsId: z.string().optional(),
  systemToken: z.string().optional(),
  phoneNumberId: z.string().optional(),
})

export const getPhoneNumber = authenticatedProcedure
  .meta({
    openapi: {
      method: 'GET',
      path: '/whatsapp/phoneNumber',
      protect: true,
    },
  })
  .input(inputSchema)
  .output(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  )
  .query(async ({ input, ctx: { user } }) => {
    const credentials = await getCredentials(user.id, input)
    if (!credentials)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Credentials not found',
      })
    const { display_phone_number } = (await got(
      `https://graph.facebook.com/v17.0/${credentials.phoneNumberId}`,
      {
        headers: {
          Authorization: `Bearer ${credentials.systemUserAccessToken}`,
        },
      }
    ).json()) as {
      display_phone_number: string
    }

    const formattedPhoneNumber = `${
      display_phone_number.startsWith('+') ? '' : '+'
    }${display_phone_number.replace(/[\s-]/g, '')}`

    return {
      id: credentials.phoneNumberId,
      name: formattedPhoneNumber,
    }
  })

const getCredentials = async (
  userId: string,
  input: z.infer<typeof inputSchema>
): Promise<WhatsAppCredentials['data'] | undefined> => {
  if (input.systemToken && input.phoneNumberId)
    return {
      systemUserAccessToken: input.systemToken,
      phoneNumberId: input.phoneNumberId,
    }
  if (!input.credentialsId) return
  const credentials = await prisma.credentials.findUnique({
    where: {
      id: input.credentialsId,
      workspace: { members: { some: { userId } } },
    },
  })
  if (!credentials) return
  return (await decrypt(
    credentials.data,
    credentials.iv
  )) as WhatsAppCredentials['data']
}
