import { SwitchWithLabel } from '@/components/inputs/SwitchWithLabel'
import { Stack } from '@chakra-ui/react'
import { TranscribeAudioOptions } from '@typebot.io/schemas'
import { useCallback } from 'react'

type TranscribeAudioSettingsProps = {
  options: TranscribeAudioOptions
  onOptionsChange: (options: TranscribeAudioOptions) => void
}

export default function TranscribeAudioSettings({
  options,
  onOptionsChange,
}: TranscribeAudioSettingsProps) {
  const handleChangeActive = useCallback(
    (active: boolean) =>
      onOptionsChange({
        ...options,
        active,
      }),
    [onOptionsChange, options]
  )

  return (
    <Stack spacing={5}>
      <SwitchWithLabel
        label="Ativo?"
        initialValue={options.active}
        onCheckChange={handleChangeActive}
      />
    </Stack>
  )
}
