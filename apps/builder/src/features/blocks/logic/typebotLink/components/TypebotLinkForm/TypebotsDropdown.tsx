import { HStack, IconButton, Input, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@/components/icons'
import { useToast } from '@/hooks/useToast'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { byId } from 'utils'
import { useTypebots } from '@/features/dashboard'
import { SearchableDropdown } from '@/components/SearchableDropdown'
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'

type Props = {
  typebotId?: string | 'current'
  currentWorkspaceId: string
  onSelectTypebotId: (typebotId: string | 'current') => void
}

export const TypebotsDropdown = ({
  typebotId,
  onSelectTypebotId,
  currentWorkspaceId,
}: Props) => {
  const { query } = useRouter()
  const { showToast } = useToast()
  const { typebots, isLoading } = useTypebots({
    workspaceId: currentWorkspaceId,
    onError: (e) => showToast({ title: e.name, description: e.message }),
  })
  const currentTypebot = useMemo(
    () => typebots?.find(byId(typebotId)),
    [typebotId, typebots]
  )

  const handleTypebotSelect = (name: string) => {
    if (name === 'Current typebot') return onSelectTypebotId('current')
    const id = typebots?.find((s) => s.name === name)?.id
    if (id) onSelectTypebotId(id)
  }

  if (isLoading) return <Input value="Carregando..." isDisabled />
  if (!typebots || typebots.length === 0)
    return <Input value="Nenhum typebot encontrado" isDisabled />
  return (
    <HStack>
      <SearchableDropdown
        selectedItem={
          typebotId === 'current' ? 'Typebot atual' : currentTypebot?.name
        }
        items={[
          {
            label: 'Typebot atual',
            value: 'Typebot atual',
          },
          ...(typebots ?? []).map((typebot) => ({
            value: typebot.name,
            label: (
              <HStack as="span" spacing="2">
                <EmojiOrImageIcon
                  icon={typebot.icon}
                  boxSize="18px"
                  emojiFontSize="18px"
                />
                <Text>{typebot.name}</Text>
              </HStack>
            ),
          })),
        ]}
        onValueChange={handleTypebotSelect}
        placeholder={'Selecione um typebot'}
      />
      {currentTypebot?.id && (
        <IconButton
          aria-label="Navegue até o typebot"
          icon={<ExternalLinkIcon />}
          as={Link}
          href={`/typebots/${currentTypebot?.id}/edit?parentId=${query.typebotId}`}
        />
      )}
    </HStack>
  )
}
