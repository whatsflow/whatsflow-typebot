import { Text } from '@chakra-ui/react'
import { PaymentInputBlock } from '@typebot.io/schemas'

type Props = {
  block: PaymentInputBlock
}

export const PaymentInputContent = ({ block }: Props) => {
  if (
    !block.options.amount ||
    !block.options.credentialsId ||
    !block.options.currency
  )
    return <Text color="gray.500">Configurar...</Text>
  return (
    <Text noOfLines={1} pr="6">
      Coletar {block.options.amount} {block.options.currency}
    </Text>
  )
}
