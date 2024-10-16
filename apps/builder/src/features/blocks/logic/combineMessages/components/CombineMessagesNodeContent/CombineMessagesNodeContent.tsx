import { Text } from '@chakra-ui/react'
import { CombineMessagesOptions } from '@typebot.io/schemas'

type CombineMessagesNodeContentProps = { options: CombineMessagesOptions }

export default function CombineMessagesNodeContent({
  options,
}: CombineMessagesNodeContentProps) {
  return (
    <Text>
      Combinar mensagens{' '}
      {options.waitSeconds ? `(${options.waitSeconds} segundos)` : ''}
    </Text>
  )
}
