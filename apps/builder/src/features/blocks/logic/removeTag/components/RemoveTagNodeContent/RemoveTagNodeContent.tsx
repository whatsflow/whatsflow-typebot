import { HStack, Tag, Text } from '@chakra-ui/react'
import { RemoveTagOptions } from 'models'
import { Fragment } from 'react'

type RemoveTagNodeContentProps = { options: RemoveTagOptions }

export default function RemoveTagNodeContent({
  options,
}: RemoveTagNodeContentProps) {
  return (
    <Fragment>
      {options.name ? (
        <HStack alignItems="center" justifyContent="center">
          <Text>Remover Tag:</Text>

          <Tag style={{ background: options.color }}>{options.name}</Tag>
        </HStack>
      ) : (
        <Text color="gray.500">Clique para editar...</Text>
      )}
    </Fragment>
  )
}
