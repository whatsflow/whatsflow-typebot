import prisma from '@/lib/prisma'
import { authenticatedProcedure } from '@/helpers/server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { customDomainSchema } from '@typebot.io/schemas/features/customDomains'
import { isWriteWorkspaceForbidden } from '@/features/workspace/helpers/isWriteWorkspaceForbidden copy'
import got, { HTTPError } from 'got'

export const createCustomDomain = authenticatedProcedure
  .meta({
    openapi: {
      method: 'POST',
      path: '/custom-domains',
      protect: true,
      summary: 'Create custom domain',
      tags: ['Custom domains'],
    },
  })
  .input(
    z.object({
      workspaceId: z.string(),
      name: z.string(),
    })
  )
  .output(
    z.object({
      customDomain: customDomainSchema.pick({
        name: true,
        createdAt: true,
      }),
    })
  )
  .mutation(async ({ input: { workspaceId, name }, ctx: { user } }) => {
    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId },
      select: {
        members: {
          select: {
            userId: true,
            role: true,
          },
        },
      },
    })

    if (!workspace || isWriteWorkspaceForbidden(workspace, user))
      throw new TRPCError({ code: 'NOT_FOUND', message: 'No workspaces found' })

    const existingCustomDomain = await prisma.customDomain.findFirst({
      where: { name },
    })

    if (existingCustomDomain)
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Custom domain already registered',
      })

    try {
      await createDomainOnVercel(name)
    } catch (err) {
      console.log(err)
      if (err instanceof HTTPError && err.response.statusCode !== 409)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create custom domain on Vercel',
        })
    }

    const customDomain = await prisma.customDomain.create({
      data: {
        name,
        workspaceId,
      },
    })

    return { customDomain }
  })

const createDomainOnVercel = (name: string) =>
  got.post({
    url: `https://api.vercel.com/v10/projects/${process.env.NEXT_PUBLIC_VERCEL_VIEWER_PROJECT_NAME}/domains?teamId=${process.env.VERCEL_TEAM_ID}`,
    headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` },
    json: { name },
  })
