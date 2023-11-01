import { EditableEmojiOrImageIcon } from '@/components/EditableEmojiOrImageIcon'
import {
  BuoyIcon,
  ChevronLeftIcon,
  RedoIcon,
  UndoIcon,
} from '@/components/icons'
import { PublishButton } from '@/features/publish/components/PublishButton'
import { useUndoShortcut } from '@/hooks/useUndoShortcut'
import { useScopedI18n } from '@/locales'
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { isDefined, isNotDefined } from '@typebot.io/lib'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { headerHeight } from '../constants'
import { RightPanel, useEditor } from '../providers/EditorProvider'
import { useTypebot } from '../providers/TypebotProvider'
import { EditableTypebotName } from './EditableTypebotName'

export const TypebotHeader = () => {
  const scopedT = useScopedI18n('editor.headers')
  const router = useRouter()
  const {
    typebot,
    publishedTypebot,
    updateTypebot,
    save,
    undo,
    redo,
    canUndo,
    canRedo,
    isSavingLoading,
  } = useTypebot()
  const { setRightPanel, rightPanel, setStartPreviewAtGroup } = useEditor()
  const [isUndoShortcutTooltipOpen, setUndoShortcutTooltipOpen] =
    useState(false)
  const hideUndoShortcutTooltipLater = useDebouncedCallback(() => {
    setUndoShortcutTooltipOpen(false)
  }, 1000)

  const handleNameSubmit = (name: string) =>
    updateTypebot({ updates: { name } })

  const handleChangeIcon = (icon: string) =>
    updateTypebot({ updates: { icon } })

  const handlePreviewClick = async () => {
    setStartPreviewAtGroup(undefined)
    save().then()
    setRightPanel(RightPanel.PREVIEW)
  }

  useUndoShortcut(() => {
    if (!canUndo) return
    hideUndoShortcutTooltipLater.flush()
    setUndoShortcutTooltipOpen(true)
    hideUndoShortcutTooltipLater()
    undo()
  })

  // const handleHelpClick = () => {
  //   isCloudProdInstance()
  //     ? onOpen()
  //     : window.open('https://docs.typebot.io', '_blank')
  // }

  return (
    <Flex
      w="full"
      borderBottomWidth="1px"
      justify="center"
      align="center"
      h={`${headerHeight}px`}
      zIndex={100}
      pos="relative"
      bgColor={useColorModeValue('white', 'gray.900')}
      flexShrink={0}
    >
      {/* {isOpen && <SupportBubble autoShowDelay={0} />} */}
      <HStack
        display={['none', 'flex']}
        pos={{ base: 'absolute', xl: 'static' }}
        right={{ base: 280, xl: 0 }}
      >
        <Button
          as={Link}
          href={`/typebots/${typebot?.id}/edit`}
          colorScheme={router.pathname.includes('/edit') ? 'blue' : 'gray'}
          variant={router.pathname.includes('/edit') ? 'outline' : 'ghost'}
          size="sm"
        >
          {scopedT('flowButton.label')}
        </Button>
        <Button
          as={Link}
          href={`/typebots/${typebot?.id}/theme`}
          colorScheme={router.pathname.endsWith('theme') ? 'blue' : 'gray'}
          variant={router.pathname.endsWith('theme') ? 'outline' : 'ghost'}
          size="sm"
        >
          {scopedT('themeButton.label')}
        </Button>
        <Button
          as={Link}
          href={`/typebots/${typebot?.id}/settings`}
          colorScheme={router.pathname.endsWith('settings') ? 'blue' : 'gray'}
          variant={router.pathname.endsWith('settings') ? 'outline' : 'ghost'}
          size="sm"
        >
          {scopedT('settingsButton.label')}
        </Button>
        <Button
          as={Link}
          href={`/typebots/${typebot?.id}/share`}
          colorScheme={router.pathname.endsWith('share') ? 'blue' : 'gray'}
          variant={router.pathname.endsWith('share') ? 'outline' : 'ghost'}
          size="sm"
        >
          {scopedT('shareButton.label')}
        </Button>

        {isDefined(publishedTypebot) && (
          <Button
            as={Link}
            href={`/typebots/${typebot?.id}/results`}
            colorScheme={router.pathname.includes('results') ? 'blue' : 'gray'}
            variant={router.pathname.includes('results') ? 'outline' : 'ghost'}
            size="sm"
          >
            {scopedT('resultsButton.label')}
          </Button>
        )}
      </HStack>
      <HStack
        pos="absolute"
        left="1rem"
        justify="center"
        align="center"
        spacing="6"
      >
        <HStack alignItems="center" spacing={3}>
          <IconButton
            as={Link}
            aria-label="Navigate back"
            icon={<ChevronLeftIcon fontSize={25} />}
            href={{
              pathname: router.query.parentId
                ? '/typebots/[typebotId]/edit'
                : typebot?.folderId
                ? '/typebots/folders/[folderId]'
                : '/typebots',
              query: {
                folderId: typebot?.folderId ?? [],
                parentId: Array.isArray(router.query.parentId)
                  ? router.query.parentId.slice(0, -1)
                  : [],
                typebotId: Array.isArray(router.query.parentId)
                  ? [...router.query.parentId].pop()
                  : router.query.parentId ?? [],
              },
            }}
            size="sm"
          />
          <HStack spacing={1}>
            {typebot && (
              <EditableEmojiOrImageIcon
                uploadFileProps={{
                  workspaceId: typebot.workspaceId,
                  typebotId: typebot.id,
                  fileName: 'icon',
                }}
                icon={typebot?.icon}
                onChangeIcon={handleChangeIcon}
              />
            )}
            (
            <EditableTypebotName
              key={`typebot-name-${typebot?.name ?? ''}`}
              defaultName={typebot?.name ?? ''}
              onNewName={handleNameSubmit}
            />
            )
          </HStack>

          <HStack>
            <Tooltip
              label={
                isUndoShortcutTooltipOpen
                  ? 'Alterações revertidas!'
                  : 'Desfazer'
              }
              isOpen={isUndoShortcutTooltipOpen ? true : undefined}
              hasArrow={isUndoShortcutTooltipOpen}
            >
              <IconButton
                display={['none', 'flex']}
                icon={<UndoIcon />}
                size="sm"
                aria-label="Desfazer"
                onClick={undo}
                isDisabled={!canUndo}
              />
            </Tooltip>

            <Tooltip label="Refazer">
              <IconButton
                display={['none', 'flex']}
                icon={<RedoIcon />}
                size="sm"
                aria-label="Refazer"
                onClick={redo}
                isDisabled={!canRedo}
              />
            </Tooltip>
          </HStack>
          <Button leftIcon={<BuoyIcon />} size="sm">
            {scopedT('helpButton.label')}
          </Button>
        </HStack>
        {isSavingLoading && (
          <HStack>
            <Spinner speed="0.7s" size="sm" color="gray.400" />
            <Text fontSize="sm" color="gray.400">
              {scopedT('savingSpinner.label')}
            </Text>
          </HStack>
        )}
      </HStack>

      <HStack right="40px" pos="absolute" display={['none', 'flex']}>
        {router.pathname.includes('/edit') && isNotDefined(rightPanel) && (
          <Button
            colorScheme="gray"
            onClick={handlePreviewClick}
            isLoading={isNotDefined(typebot)}
            size="sm"
          >
            {scopedT('previewButton.label')}
          </Button>
        )}
        <PublishButton size="sm" />
      </HStack>
    </Flex>
  )
}
