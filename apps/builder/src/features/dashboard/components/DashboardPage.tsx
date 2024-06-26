import { Seo } from '@/components/Seo'
import { useUser } from '@/features/account/hooks/useUser'
import {
  PreCheckoutModal,
  PreCheckoutModalProps,
} from '@/features/billing/components/PreCheckoutModal'
import { TypebotDndProvider } from '@/features/folders/TypebotDndProvider'
import { FolderContent } from '@/features/folders/components/FolderContent'
import { ParentModalProvider } from '@/features/graph/providers/ParentModalProvider'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { trpc } from '@/lib/trpc'
import { Spinner, Stack, Text, VStack } from '@chakra-ui/react'
import { guessIfUserIsEuropean } from '@typebot.io/lib/pricing'
import { Plan } from '@typebot.io/prisma'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
export const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  const { workspace } = useWorkspace()
  const [preCheckoutPlan, setPreCheckoutPlan] =
    useState<PreCheckoutModalProps['selectedSubscription']>()
  const { mutate: createCustomCheckoutSession } =
    trpc.billing.createCustomCheckoutSession.useMutation({
      onSuccess: (data) => {
        router.push(data.checkoutUrl)
      },
    })

  useEffect(() => {
    const { subscribePlan, chats, storage, isYearly, claimCustomPlan } =
      router.query as {
        subscribePlan: Plan | undefined
        chats: string | undefined
        storage: string | undefined
        isYearly: string | undefined
        claimCustomPlan: string | undefined
      }
    if (claimCustomPlan && user?.email && workspace) {
      setIsLoading(true)
      createCustomCheckoutSession({
        email: user.email,
        workspaceId: workspace.id,
        returnUrl: `${window.location.origin}/typebots`,
      })
    }
    if (workspace && subscribePlan && user && workspace.plan === 'FREE') {
      setIsLoading(true)
      setPreCheckoutPlan({
        plan: subscribePlan as 'PRO' | 'STARTER',
        workspaceId: workspace.id,
        additionalChats: chats ? parseInt(chats) : 0,
        additionalStorage: storage ? parseInt(storage) : 0,
        currency: guessIfUserIsEuropean() ? 'eur' : 'usd',
        isYearly: isYearly === 'false' ? false : true,
      })
    }
  }, [createCustomCheckoutSession, router.query, user, workspace])

  return (
    <Stack minH="100vh">
      <Seo title={workspace?.name ?? 'Meus typebots'} />

      {!workspace?.stripeId && (
        <ParentModalProvider>
          <PreCheckoutModal
            selectedSubscription={preCheckoutPlan}
            existingEmail={user?.email ?? undefined}
            existingCompany={workspace?.name ?? undefined}
            onClose={() => setPreCheckoutPlan(undefined)}
          />
        </ParentModalProvider>
      )}
      <TypebotDndProvider>
        {isLoading ? (
          <VStack w="full" justifyContent="center" pt="10" spacing={6}>
            <Text>Você está sendo redirecionado...</Text>
            <Spinner />
          </VStack>
        ) : (
          <FolderContent folder={null} />
        )}
      </TypebotDndProvider>
    </Stack>
  )
}
