import { Text } from '@chakra-ui/react'
import { TranscribeAudioOptions } from '@typebot.io/schemas/features/blocks/logic/transcribeAudio'

type TranscribeAudioNodeContentProps = { options: TranscribeAudioOptions }

export default function TranscribeAudioNodeContent({
  options,
}: TranscribeAudioNodeContentProps) {
  return <Text>{options.active ? 'Ativo' : 'Inativo'}</Text>
}
