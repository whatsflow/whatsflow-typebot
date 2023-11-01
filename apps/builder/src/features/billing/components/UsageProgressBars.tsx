import { AlertIcon } from '@/components/icons'
import { defaultQueryOptions, trpc } from '@/lib/trpc'
import { useScopedI18n } from '@/locales'
import {
  Flex,
  HStack,
  Heading,
  Progress,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { parseNumberWithCommas } from '@typebot.io/lib'
import { getChatsLimit } from '@typebot.io/lib/billing/getChatsLimit'
import { Workspace } from '@typebot.io/prisma'

type Props = {
  workspace: Workspace
}

export const UsageProgressBars = ({ workspace }: Props) => {
  const scopedT = useScopedI18n('billing.usage')
  const { data, isLoading } = trpc.billing.getUsage.useQuery(
    {
      workspaceId: workspace.id,
    },
    defaultQueryOptions
  )
  const totalChatsUsed = data?.totalChatsUsed ?? 0

  const workspaceChatsLimit = getChatsLimit(workspace)

  const chatsPercentage = Math.round(
    //@ts-ignore
    (totalChatsUsed / workspaceChatsLimit) * 100
  )

  return (
    <Stack spacing={6}>
      <Heading fontSize="3xl">{scopedT('heading')}</Heading>
      <Stack spacing={3}>
        <Flex justifyContent="space-between">
          <HStack>
            <Heading fontSize="xl" as="h3">
              Bate-papos
            </Heading>
            {chatsPercentage >= 80 && (
              <Tooltip
                placement="top"
                rounded="md"
                p="3"
                label={
                  <Text>
                    Seus typebots são populares! Em breve você alcançará seu
                    limite de chats de seu plano. 🚀
                    <br />
                    <br />
                    Certifique-se de <strong>atualizar seu plano</strong> para
                    aumentar esse limite e continuar conversando com seus
                    usuários.
                  </Text>
                }
              >
                <span>
                  <AlertIcon color="orange.500" />
                </span>
              </Tooltip>
            )}
            <Text fontSize="sm" fontStyle="italic" color="gray.500">
              (Resets on {data?.resetsAt.toLocaleDateString()})
            </Text>
          </HStack>

          <HStack>
            <Skeleton
              fontWeight="bold"
              isLoaded={!isLoading}
              h={isLoading ? '5px' : 'auto'}
            >
              {parseNumberWithCommas(totalChatsUsed)}
            </Skeleton>
            <Text>
              /{' '}
              {workspaceChatsLimit === -1
                ? scopedT('unlimited')
                : parseNumberWithCommas(workspaceChatsLimit)}
            </Text>
          </HStack>
        </Flex>

        <Progress
          h="5px"
          value={chatsPercentage}
          rounded="full"
          isIndeterminate={isLoading}
          colorScheme={'blue'}
        />
      </Stack>
    </Stack>
  )
}
