import { createId } from '@paralleldrive/cuid2'
import {
  defaultSettings,
  defaultTheme,
  Group,
  StartBlock,
  Typebot,
} from 'models'

export type NewTypebotProps = Omit<
  Typebot,
  | 'createdAt'
  | 'updatedAt'
  | 'id'
  | 'publicId'
  | 'customDomain'
  | 'icon'
  | 'isArchived'
  | 'isClosed'
  | 'resultsTablePreferences'
>

export const parseNewTypebot = ({
  folderId,
  name,
  ownerAvatarUrl,
  workspaceId,
  isBrandingEnabled = true,
}: {
  folderId: string | null
  workspaceId: string
  name: string
  ownerAvatarUrl?: string
  isBrandingEnabled?: boolean
}): NewTypebotProps => {
  const startGroupId = createId()
  const startBlockId = createId()
  const startBlock: StartBlock = {
    groupId: startGroupId,
    id: startBlockId,
    label: 'Início',
    type: 'start',
  }
  const startGroup: Group = {
    id: startGroupId,
    title: 'Início',
    graphCoordinates: { x: 0, y: 0 },
    blocks: [startBlock],
  }
  return {
    folderId,
    tags: [],
    name,
    workspaceId,
    groups: [startGroup],
    edges: [],
    variables: [],
    theme: {
      ...defaultTheme,
      chat: {
        ...defaultTheme.chat,
        hostAvatar: { isEnabled: true, url: ownerAvatarUrl },
      },
    },
    settings: {
      ...defaultSettings,
      general: {
        ...defaultSettings.general,
        isBrandingEnabled,
      },
    },
  }
}
