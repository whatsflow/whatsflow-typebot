import { AudioBubbleNode } from '@/features/blocks/bubbles/audio/components/AudioBubbleNode'
import ButtonNodeContent from '@/features/blocks/bubbles/button/components/ButtonNodeContent'
import { EmbedBubbleContent } from '@/features/blocks/bubbles/embed/components/EmbedBubbleContent'
import FileNodeContent from '@/features/blocks/bubbles/file/components/FileNodeContent'
import { ImageBubbleContent } from '@/features/blocks/bubbles/image/components/ImageBubbleContent'
import { TextBubbleContent } from '@/features/blocks/bubbles/textBubble/components/TextBubbleContent'
import { VideoBubbleContent } from '@/features/blocks/bubbles/video/components/VideoBubbleContent'
import { ButtonsBlockNode } from '@/features/blocks/inputs/buttons/components/ButtonsBlockNode'
import { DateNodeContent } from '@/features/blocks/inputs/date/components/DateNodeContent'
import { EmailInputNodeContent } from '@/features/blocks/inputs/emailInput/components/EmailInputNodeContent'
import { FileInputContent } from '@/features/blocks/inputs/fileUpload/components/FileInputContent'
import { NumberNodeContent } from '@/features/blocks/inputs/number/components/NumberNodeContent'
import { PaymentInputContent } from '@/features/blocks/inputs/payment/components/PaymentInputContent'
import { PhoneNodeContent } from '@/features/blocks/inputs/phone/components/PhoneNodeContent'
import { RatingInputContent } from '@/features/blocks/inputs/rating/components/RatingInputContent'
import { TextInputNodeContent } from '@/features/blocks/inputs/textInput/components/TextInputNodeContent'
import { UrlNodeContent } from '@/features/blocks/inputs/url/components/UrlNodeContent'
import { ChatwootNodeBody } from '@/features/blocks/integrations/chatwoot/components/ChatwootNodeBody'
import { GoogleAnalyticsNodeBody } from '@/features/blocks/integrations/googleAnalytics/components/GoogleAnalyticsNodeBody'
import { GoogleSheetsNodeContent } from '@/features/blocks/integrations/googleSheets/components/GoogleSheetsNodeContent'
import { MakeComContent } from '@/features/blocks/integrations/makeCom/components/MakeComContent'

import { OpenAINodeBody } from '@/features/blocks/integrations/openai/components/OpenAINodeBody'
import { PabblyConnectContent } from '@/features/blocks/integrations/pabbly/components/PabblyConnectContent'
import { SendEmailContent } from '@/features/blocks/integrations/sendEmail/components/SendEmailContent'
import { WebhookContent } from '@/features/blocks/integrations/webhook/components/WebhookContent'
import { ZapierContent } from '@/features/blocks/integrations/zapier/components/ZapierContent'

import EndNodeContent from '@/features/blocks/logic/end/components/EndNodeContent'
import { JumpNodeBody } from '@/features/blocks/logic/jump/components/JumpNodeBody'
import { RedirectNodeContent } from '@/features/blocks/logic/redirect/components/RedirectNodeContent'

import RemoveTagNodeContent from '@/features/blocks/logic/removeTag/components/RemoveTagNodeContent'
import { ScriptNodeContent } from '@/features/blocks/logic/script/components/ScriptNodeContent'
import { SetVariableContent } from '@/features/blocks/logic/setVariable/components/SetVariableContent'

import TagNodeContent from '@/features/blocks/logic/tag/components/TagNodeContent'
import TransferNodeContent from '@/features/blocks/logic/transfer/components/TransferNodeContent'
import { TypebotLinkNode } from '@/features/blocks/logic/typebotLink/components/TypebotLinkNode'

import { PictureChoiceNode } from '@/features/blocks/inputs/pictureChoice/components/PictureChoiceNode'
import { AbTestNodeBody } from '@/features/blocks/logic/abTest/components/AbTestNodeBody'
import SpreadNodeContent from '@/features/blocks/logic/spread/components/SpreadNodeContent/SpreadNodeContent'
import { WaitNodeContent } from '@/features/blocks/logic/wait/components/WaitNodeContent'
import WaitForNodeContent from '@/features/blocks/logic/waitFor/components/WaitForNodeContent'
import { Text } from '@chakra-ui/react'
import {
  Block,
  BlockIndices,
  BubbleBlockType,
  InputBlockType,
  IntegrationBlockType,
  LogicBlockType,
  StartBlock,
} from '@typebot.io/schemas'
import { ItemNodesList } from '../item/ItemNodesList'

type Props = {
  block: Block | StartBlock
  indices: BlockIndices
}
export const BlockNodeContent = ({ block, indices }: Props): JSX.Element => {
  switch (block.type) {
    case BubbleBlockType.TEXT: {
      return <TextBubbleContent block={block} />
    }
    case BubbleBlockType.IMAGE: {
      return <ImageBubbleContent block={block} />
    }
    case BubbleBlockType.VIDEO: {
      return <VideoBubbleContent block={block} />
    }
    case BubbleBlockType.EMBED: {
      return <EmbedBubbleContent block={block} />
    }
    case BubbleBlockType.AUDIO: {
      return <AudioBubbleNode url={block.content.url} />
    }
    case BubbleBlockType.BUTTON:
      return <ButtonNodeContent options={block.options} />

    case BubbleBlockType.FILE:
      return <FileNodeContent content={block.content} />

    case InputBlockType.TEXT: {
      return (
        <TextInputNodeContent
          variableId={block.options.variableId}
          placeholder={block.options.labels.placeholder}
          isLong={block.options.isLong}
        />
      )
    }
    case InputBlockType.NUMBER: {
      return (
        <NumberNodeContent
          placeholder={block.options.labels.placeholder}
          variableId={block.options.variableId}
        />
      )
    }
    case InputBlockType.EMAIL: {
      return (
        <EmailInputNodeContent
          placeholder={block.options.labels.placeholder}
          variableId={block.options.variableId}
        />
      )
    }
    case InputBlockType.URL: {
      return (
        <UrlNodeContent
          placeholder={block.options.labels.placeholder}
          variableId={block.options.variableId}
        />
      )
    }
    case InputBlockType.CHOICE: {
      return <ButtonsBlockNode block={block} indices={indices} />
    }
    case InputBlockType.PICTURE_CHOICE: {
      return <PictureChoiceNode block={block} indices={indices} />
    }
    case InputBlockType.PHONE: {
      return (
        <PhoneNodeContent
          placeholder={block.options.labels.placeholder}
          variableId={block.options.variableId}
        />
      )
    }
    case InputBlockType.DATE: {
      return <DateNodeContent variableId={block.options.variableId} />
    }
    case InputBlockType.PAYMENT: {
      return <PaymentInputContent block={block} />
    }
    case InputBlockType.RATING: {
      return (
        <RatingInputContent
          block={block}
          variableId={block.options.variableId}
        />
      )
    }
    case InputBlockType.FILE: {
      return <FileInputContent options={block.options} />
    }
    case LogicBlockType.SET_VARIABLE: {
      return <SetVariableContent block={block} />
    }
    case LogicBlockType.REDIRECT: {
      return <RedirectNodeContent url={block.options.url} />
    }
    case LogicBlockType.SCRIPT: {
      return (
        <ScriptNodeContent
          name={block.options.name}
          content={block.options.content}
        />
      )
    }
    case LogicBlockType.WAIT:
      return <WaitNodeContent options={block.options} />

    case InputBlockType.WAIT_FOR:
      return <WaitForNodeContent options={block.options} />

    case LogicBlockType.TRANSFER:
      return <TransferNodeContent options={block.options} />

    case LogicBlockType.SPREAD:
      return <SpreadNodeContent options={block.options} />

    case LogicBlockType.TAG:
      return <TagNodeContent options={block.options} />

    case LogicBlockType.REMOVE_TAG:
      return <RemoveTagNodeContent options={block.options} />

    case LogicBlockType.JUMP:
      return <JumpNodeBody options={block.options} />

    case LogicBlockType.AB_TEST: {
      return <AbTestNodeBody block={block} />
    }

    case LogicBlockType.TYPEBOT_LINK:
      return <TypebotLinkNode block={block} />

    case LogicBlockType.END:
      return <EndNodeContent />

    case LogicBlockType.CONDITION:
      return <ItemNodesList block={block} indices={indices} />
    case IntegrationBlockType.GOOGLE_SHEETS: {
      return (
        <GoogleSheetsNodeContent
          action={'action' in block.options ? block.options.action : undefined}
        />
      )
    }
    case IntegrationBlockType.GOOGLE_ANALYTICS: {
      return <GoogleAnalyticsNodeBody action={block.options?.action} />
    }
    case IntegrationBlockType.WEBHOOK: {
      return <WebhookContent block={block} />
    }
    case IntegrationBlockType.ZAPIER: {
      return <ZapierContent block={block} />
    }
    case IntegrationBlockType.PABBLY_CONNECT: {
      return <PabblyConnectContent block={block} />
    }
    case IntegrationBlockType.MAKE_COM: {
      return <MakeComContent block={block} />
    }
    case IntegrationBlockType.EMAIL: {
      return <SendEmailContent block={block} />
    }
    case IntegrationBlockType.CHATWOOT: {
      return <ChatwootNodeBody block={block} />
    }
    case IntegrationBlockType.OPEN_AI: {
      return (
        <OpenAINodeBody
          task={block.options.task}
          responseMapping={
            'responseMapping' in block.options
              ? block.options.responseMapping
              : []
          }
        />
      )
    }
    case 'start': {
      return <Text>Início</Text>
    }
  }
}
