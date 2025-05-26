import { TypingBubble } from '@/components'
import ChatText from '@/features/blocks/bubbles/components/ChatText'
import { TypingEmulation } from '@typebot.io/schemas'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { computeTypingDuration } from '../../../textBubble/helpers/computeTypingDuration'

type Props = {
  active: boolean
  typingEmulation: TypingEmulation
  onTransitionEnd: () => void
}

export const showAnimationDuration = 400

const defaultTypingEmulation = {
  enabled: true,
  speed: 300,
  maxDelay: 1.5,
}

let typingTimeout: NodeJS.Timeout

export default function TranscribeAudioBubble(props: Props) {
  const [isTyping, setIsTyping] = createSignal(true)

  const onTypingEnd = () => {
    if (!isTyping()) return
    setIsTyping(false)
    setTimeout(() => {
      props.onTransitionEnd()
    }, showAnimationDuration)
  }

  onMount(() => {
    if (!isTyping) return
    const typingDuration =
      props.typingEmulation?.enabled === false
        ? 0
        : computeTypingDuration(
            props.active
              ? 'Transcrevendo aúdio...'
              : 'Transcrição de aúdio desativada',
            props.typingEmulation ?? defaultTypingEmulation
          )
    typingTimeout = setTimeout(onTypingEnd, typingDuration)
  })

  onCleanup(() => {
    if (typingTimeout) clearTimeout(typingTimeout)
  })

  return (
    <div class="flex flex-col animate-fade-in">
      <div class="flex mb-2 w-full items-center">
        <div class={'flex relative items-start typebot-host-bubble'}>
          <div
            class="flex items-center absolute px-4 py-2 rounded-lg bubble-typing "
            style={{
              width: isTyping() ? '64px' : '100%',
              height: isTyping() ? '32px' : '100%',
            }}
            data-testid="host-bubble"
          >
            {isTyping() && <TypingBubble />}
          </div>

          <ChatText
            isTyping={!!isTyping()}
            text={
              props.active
                ? 'Transcrevendo aúdio...'
                : 'Transcrição de aúdio desativada'
            }
          />
        </div>
      </div>
    </div>
  )
}
