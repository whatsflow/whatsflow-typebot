import { DownloadIcon, ToolIcon } from '@/components/icons'
import { useUser } from '@/features/account'
import { createTypebotQuery, importTypebotQuery } from '@/features/dashboard'
import { useWorkspace } from '@/features/workspace'
import { useToast } from '@/hooks/useToast'
import {
  Button,
  Heading,
  Stack,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Typebot } from 'models'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ImportTypebotFromFileButton } from './ImportTypebotFromFileButton'
import { TemplatesModal } from './TemplatesModal'

export const CreateNewTypebotButtons = () => {
  const { workspace } = useWorkspace()
  const { user } = useUser()
  const router = useRouter()
  const { isOpen, onClose } = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)

  const { showToast } = useToast()

  const handleCreateSubmit = async (typebot?: Typebot) => {
    if (!user || !workspace) return
    setIsLoading(true)
    const folderId = router.query.folderId?.toString() ?? null
    const { error, data } = typebot
      ? await importTypebotQuery(
          {
            ...typebot,
            folderId,
            workspaceId: workspace.id,
            theme: {
              ...typebot.theme,
              chat: {
                ...typebot.theme.chat,
                hostAvatar: {
                  isEnabled: true,
                  url:
                    typebot.theme.chat.hostAvatar?.url ??
                    user.image ??
                    undefined,
                },
              },
            },
          },
          workspace.plan
        )
      : await createTypebotQuery({
          folderId,
          workspaceId: workspace.id,
        })
    if (error) showToast({ description: error.message })
    if (data)
      router.push({
        pathname: `/typebots/${data.id}/edit`,
        query:
          router.query.isFirstBot === 'true'
            ? {
                isFirstBot: 'true',
              }
            : {},
      })
    setIsLoading(false)
  }

  return (
    <VStack maxW="600px" w="full" flex="1" pt="20" spacing={10}>
      <Heading>Create a new typebot</Heading>
      <Stack w="full" spacing={6}>
        <Button
          variant="outline"
          w="full"
          py="8"
          fontSize="lg"
          leftIcon={
            <ToolIcon
              color={useColorModeValue('blue.500', 'blue.300')}
              boxSize="25px"
              mr="2"
            />
          }
          onClick={() => handleCreateSubmit()}
          isLoading={isLoading}
        >
          Start from scratch
        </Button>

        <ImportTypebotFromFileButton
          variant="outline"
          w="full"
          py="8"
          fontSize="lg"
          leftIcon={
            <DownloadIcon
              color={useColorModeValue('purple.500', 'purple.300')}
              boxSize="25px"
              mr="2"
            />
          }
          isLoading={isLoading}
          onNewTypebot={handleCreateSubmit}
        >
          Import a file
        </ImportTypebotFromFileButton>
      </Stack>
      <TemplatesModal
        isOpen={isOpen}
        onClose={onClose}
        onTypebotChoose={handleCreateSubmit}
      />
    </VStack>
  )
}
