/* eslint-disable solid/components-return-once */

import { AudioBubble } from '@/features/blocks/bubbles/audio'
import ButtonBubble from '@/features/blocks/bubbles/button/components/ButtonBubble'
import { EmbedBubble } from '@/features/blocks/bubbles/embed'
import EndBubble from '@/features/blocks/bubbles/end/components/EndBubble'
import FileBubble from '@/features/blocks/bubbles/file/components/FileBubble'
import { ImageBubble } from '@/features/blocks/bubbles/image'
import SpreadBubble from '@/features/blocks/bubbles/spread/components/SpreadBubble'
import TagBubble from '@/features/blocks/bubbles/tag/components/TagBubble'
import { TextBubble } from '@/features/blocks/bubbles/textBubble'
import TransferBubble from '@/features/blocks/bubbles/transfer/components/TransferBubble'
import WaitBubble from '@/features/blocks/bubbles/wait/components/WaitBubble'
import { VideoBubble } from '@/features/blocks/bubbles/video'
import {
  AudioBubbleContent,
  BubbleBlockType,
  ButtonOptions,
  ChatMessage,
  EmbedBubbleContent,
  ImageBubbleContent,
  LogicBlockType,
  RemoveTagOptions,
  SpreadOptions,
  TagOptions,
  TextBubbleContent,
  TransferOptions,
  TypingEmulation,
  VideoBubbleContent,
  WaitOptions,
} from '@typebot.io/schemas'
import { FileBubbleContent } from '@typebot.io/schemas/features/blocks/bubbles/file'

type Props = {
  message: ChatMessage
  typingEmulation: TypingEmulation
  onTransitionEnd: () => void
}

export const HostBubble = (props: Props) => {
  const onTransitionEnd = () => props.onTransitionEnd()

  const getHostBubble = () => {
    switch (props.message.type) {
      case BubbleBlockType.TEXT:
        return (
          <TextBubble
            content={
              props.message.content as Omit<TextBubbleContent, 'richText'>
            }
            typingEmulation={props.typingEmulation}
            onTransitionEnd={onTransitionEnd}
          />
        )
      case BubbleBlockType.IMAGE:
        return (
          <ImageBubble
            url={(props.message.content as ImageBubbleContent).url}
            onTransitionEnd={onTransitionEnd}
          />
        )
      case BubbleBlockType.EMBED:
        return (
          <EmbedBubble
            content={props.message.content as EmbedBubbleContent}
            onTransitionEnd={onTransitionEnd}
          />
        )
      case BubbleBlockType.VIDEO:
        return (
          <VideoBubble
            content={props.message.content as VideoBubbleContent}
            onTransitionEnd={onTransitionEnd}
          />
        )
      case BubbleBlockType.AUDIO:
        return (
          <AudioBubble
            url={(props.message.content as AudioBubbleContent).url}
            onTransitionEnd={onTransitionEnd}
          />
        )
      case BubbleBlockType.FILE:
        return (
          <FileBubble
            url={(props.message.content as FileBubbleContent).url}
            typingEmulation={props.typingEmulation}
            onTransitionEnd={onTransitionEnd}
          />
        )

      case LogicBlockType.WAIT:
        return (
          <WaitBubble
            secondsToWaitFor={
              (props.message.content as WaitOptions).secondsToWaitFor
            }
            typingEmulation={props.typingEmulation}
            onTransitionEnd={onTransitionEnd}
          />
        )

      case LogicBlockType.TAG:
        return (
          <TagBubble
            name={(props.message.content as TagOptions).name}
            type="add"
            typingEmulation={props.typingEmulation}
            onTransitionEnd={onTransitionEnd}
          />
        )

      case LogicBlockType.REMOVE_TAG:
        return (
          <TagBubble
            name={(props.message.content as RemoveTagOptions).name}
            type="remove"
            typingEmulation={props.typingEmulation}
            onTransitionEnd={onTransitionEnd}
          />
        )

      case LogicBlockType.END:
        return (
          <EndBubble
            typingEmulation={props.typingEmulation}
            onTransitionEnd={onTransitionEnd}
          />
        )

      case BubbleBlockType.BUTTON:
        return (
          <ButtonBubble
            content={props.message.content as ButtonOptions}
            typingEmulation={props.typingEmulation}
            onTransitionEnd={onTransitionEnd}
          />
        )

      case LogicBlockType.SPREAD:
        return (
          <SpreadBubble
            options={props.message.content as SpreadOptions}
            typingEmulation={props.typingEmulation}
            onTransitionEnd={onTransitionEnd}
          />
        )
    }

    return (
      <TransferBubble
        options={props.message.content as TransferOptions}
        typingEmulation={props.typingEmulation}
        onTransitionEnd={onTransitionEnd}
      />
    )
  }

  return <div>{getHostBubble()}</div>
}
