import type {
  BubbleBlock,
  ChoiceInputBlock,
  ConditionBlock,
  InputBlock,
  IntegrationBlock,
  LogicBlock,
  Block,
  TextInputBlock,
  TextBubbleBlock,
  WebhookBlock,
  BlockType,
  ImageBubbleBlock,
  VideoBubbleBlock,
  BlockWithOptionsType,
} from '@typebot.io/schemas'
import { InputBlockType } from '@typebot.io/schemas/features/blocks/inputs/enums'
import { BubbleBlockType } from '@typebot.io/schemas/features/blocks/bubbles/enums'
import { LogicBlockType } from '@typebot.io/schemas/features/blocks/logic/enums'
import { IntegrationBlockType } from '@typebot.io/schemas/features/blocks/integrations/enums'
import { PictureChoiceBlock } from '@typebot.io/schemas/features/blocks/inputs/pictureChoice'

export const sendRequest = async <ResponseData>(
  params:
    | {
        url: string
        method: string
        body?: Record<string, unknown> | FormData
      }
    | string
): Promise<{ data?: ResponseData; error?: Error }> => {
  try {
    const url = typeof params === 'string' ? params : params.url
    const response = await fetch(url, {
      method: typeof params === 'string' ? 'GET' : params.method,
      mode: 'cors',
      headers:
        typeof params !== 'string' && isDefined(params.body)
          ? {
              'Content-Type': 'application/json',
            }
          : undefined,
      body:
        typeof params !== 'string' && isDefined(params.body)
          ? JSON.stringify(params.body)
          : undefined,
    })
    const data = await response.json()
    if (!response.ok) throw 'error' in data ? data.error : data
    return { data }
  } catch (e) {
    console.error(e)
    return { error: e as Error }
  }
}

export const isDefined = <T>(
  value: T | undefined | null
): value is NonNullable<T> => value !== undefined && value !== null

export const isNotDefined = <T>(
  value: T | undefined | null
): value is undefined | null => value === undefined || value === null

export const isEmpty = (
  value: string | undefined | null
): value is undefined | null =>
  value === undefined || value === null || value === ''

export const isNotEmpty = (value: string | undefined | null): value is string =>
  value !== undefined && value !== null && value !== ''

export const isInputBlock = (block: Block): block is InputBlock =>
  (Object.values(InputBlockType) as string[]).includes(block.type)

export const isBubbleBlock = (block: Block): block is BubbleBlock =>
  (Object.values(BubbleBlockType) as string[]).includes(block.type)

export const isLogicBlock = (block: Block): block is LogicBlock =>
  (Object.values(LogicBlockType) as string[]).includes(block.type)

export const isTextBubbleBlock = (block: Block): block is TextBubbleBlock =>
  block.type === BubbleBlockType.TEXT

export const isMediaBubbleBlock = (
  block: Block
): block is ImageBubbleBlock | VideoBubbleBlock =>
  block.type === BubbleBlockType.IMAGE || block.type === BubbleBlockType.VIDEO

export const isTextInputBlock = (block: Block): block is TextInputBlock =>
  block.type === InputBlockType.TEXT

export const isChoiceInput = (block: Block): block is ChoiceInputBlock =>
  block.type === InputBlockType.CHOICE

export const isPictureChoiceInput = (
  block: Block
): block is PictureChoiceBlock => block.type === InputBlockType.PICTURE_CHOICE

export const isSingleChoiceInput = (block: Block): block is ChoiceInputBlock =>
  block.type === InputBlockType.CHOICE &&
  'options' in block &&
  !block.options.isMultipleChoice

export const isConditionBlock = (block: Block): block is ConditionBlock =>
  block.type === LogicBlockType.CONDITION

export const isIntegrationBlock = (block: Block): block is IntegrationBlock =>
  (Object.values(IntegrationBlockType) as string[]).includes(block.type)

export const isWebhookBlock = (block: Block): block is WebhookBlock =>
  [
    IntegrationBlockType.WEBHOOK,
    IntegrationBlockType.PABBLY_CONNECT,
    IntegrationBlockType.ZAPIER,
    IntegrationBlockType.MAKE_COM,
  ].includes(block.type as IntegrationBlockType)

export const isBubbleBlockType = (type: BlockType): type is BubbleBlockType =>
  (Object.values(BubbleBlockType) as string[]).includes(type)

export const blockTypeHasOption = (
  type: BlockType
): type is BlockWithOptionsType =>
  (Object.values(InputBlockType) as string[])
    .concat(Object.values(LogicBlockType))
    .concat(Object.values(IntegrationBlockType))
    .concat([BubbleBlockType.BUTTON])
    .includes(type)

export const blockTypeHasItems = (
  type: BlockType
): type is
  | LogicBlockType.CONDITION
  | InputBlockType.CHOICE
  | LogicBlockType.AB_TEST =>
  type === LogicBlockType.CONDITION ||
  type === InputBlockType.CHOICE ||
  type === LogicBlockType.AB_TEST ||
  type === InputBlockType.PICTURE_CHOICE

export const blockHasItems = (
  block: Block
): block is ConditionBlock | ChoiceInputBlock =>
  'items' in block && isDefined(block.items)

export const byId = (id?: string) => (obj: { id: string }) => obj.id === id

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

interface Omit {
  // eslint-disable-next-line @typescript-eslint/ban-types
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2]
  }
}

export const omit: Omit = (obj, ...keys) => {
  const ret = {} as {
    [K in keyof typeof obj]: (typeof obj)[K]
  }
  let key: keyof typeof obj
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key]
    }
  }
  return ret
}

const isVariableString = (str: string): boolean => /^\{\{.*\}\}$/.test(str)

export const sanitizeUrl = (url: string): string =>
  url.startsWith('http') ||
  url.startsWith('mailto:') ||
  url.startsWith('tel:') ||
  url.startsWith('sms:') ||
  isVariableString(url)
    ? url
    : `https://${url}`

export const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  )

export const generateId = (idDesiredLength: number): string => {
  const getRandomCharFromAlphabet = (alphabet: string): string => {
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  }

  return Array.from({ length: idDesiredLength })
    .map(() => {
      return getRandomCharFromAlphabet(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      )
    })
    .join('')
}

export const hasValue = (
  value: string | undefined | null
): value is NonNullable<string> =>
  value !== undefined &&
  value !== null &&
  value !== '' &&
  value !== 'undefined' &&
  value !== 'null'

export const parseNumberWithCommas = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const injectCustomHeadCode = (customHeadCode: string) => {
  const headCodes = customHeadCode.split('</noscript>')
  headCodes.forEach((headCode) => {
    const [codeToInject, noScriptContentToInject] = headCode.split('<noscript>')
    const fragment = document
      .createRange()
      .createContextualFragment(codeToInject)
    document.head.append(fragment)

    if (isNotDefined(noScriptContentToInject)) return

    const noScriptElement = document.createElement('noscript')
    const noScriptContentFragment = document
      .createRange()
      .createContextualFragment(noScriptContentToInject)
    noScriptElement.append(noScriptContentFragment)
    document.head.append(noScriptElement)
  })
}

export const getAtPath = <T>(obj: T, path: string): unknown => {
  if (isNotDefined(obj)) return undefined
  const pathParts = path.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj
  for (const part of pathParts) {
    if (current === undefined) {
      return undefined
    }
    current = current[part]
  }
  return current
}

export const parseGroupTitle = (title: string) =>
  isEmpty(title) ? 'Untitled' : title

export const isSvgSrc = (src: string | undefined) =>
  src?.startsWith('data:image/svg') || src?.endsWith('.svg')
