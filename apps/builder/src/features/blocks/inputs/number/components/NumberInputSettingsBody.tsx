import { Input, SmartNumberInput } from '@/components/inputs'
import { VariableSearchInput } from '@/components/VariableSearchInput'
import { removeUndefinedFields } from '@/utils/helpers'
import { FormLabel, HStack, Stack } from '@chakra-ui/react'
import { NumberInputOptions, Variable } from 'models'
import React from 'react'

type NumberInputSettingsBodyProps = {
  options: NumberInputOptions
  onOptionsChange: (options: NumberInputOptions) => void
}

export const NumberInputSettingsBody = ({
  options,
  onOptionsChange,
}: NumberInputSettingsBodyProps) => {
  const handlePlaceholderChange = (placeholder: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, placeholder } })
  const handleButtonLabelChange = (button: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, button } })
  const handleMinChange = (min?: number) =>
    onOptionsChange(removeUndefinedFields({ ...options, min }))
  const handleMaxChange = (max?: number) =>
    onOptionsChange(removeUndefinedFields({ ...options, max }))
  const handleBlockChange = (block?: number) =>
    onOptionsChange(removeUndefinedFields({ ...options, block }))
  const handleVariableChange = (variable?: Variable) => {
    onOptionsChange({ ...options, variableId: variable?.id })
  }

  return (
    <Stack spacing={4}>
      <Stack>
        <FormLabel mb="0" htmlFor="placeholder">
          Espaço reservado :
        </FormLabel>
        <Input
          id="placeholder"
          defaultValue={options.labels.placeholder}
          onChange={handlePlaceholderChange}
        />
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          Rótulo do botão :
        </FormLabel>
        <Input
          id="button"
          defaultValue={options?.labels?.button ?? 'Enviar'}
          onChange={handleButtonLabelChange}
        />
      </Stack>
      <HStack justifyContent="space-between">
        <FormLabel mb="0" htmlFor="min">
          Min:
        </FormLabel>
        <SmartNumberInput
          id="min"
          value={options.min}
          onValueChange={handleMinChange}
        />
      </HStack>
      <HStack justifyContent="space-between">
        <FormLabel mb="0" htmlFor="max">
          Max:
        </FormLabel>
        <SmartNumberInput
          id="max"
          value={options.max}
          onValueChange={handleMaxChange}
        />
      </HStack>
      <HStack justifyContent="space-between">
        <FormLabel mb="0" htmlFor="step">
          Passo:
        </FormLabel>
        <SmartNumberInput
          id="step"
          value={options.step}
          onValueChange={handleBlockChange}
        />
      </HStack>
      <Stack>
        <FormLabel mb="0" htmlFor="variable">
          Salvar resposta em uma variável:
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options.variableId}
          onSelectVariable={handleVariableChange}
        />
      </Stack>
    </Stack>
  )
}
