import { Text } from '@chakra-ui/react'
import { CrmWhatsflowBlock } from '@typebot.io/schemas'

type Props = {
  block: CrmWhatsflowBlock
}

export const CrmWhatsflowContent = ({ block }: Props) => {
  if (!block.options.titulo && !block.options.nome)
    return <Text color="gray.500">Configurar...</Text>

  return (
    <Text noOfLines={2} pr="6">
      CRM WhatsFlow:{' '}
      {block.options.titulo || block.options.nome || 'Configurado'}
    </Text>
  )
}
