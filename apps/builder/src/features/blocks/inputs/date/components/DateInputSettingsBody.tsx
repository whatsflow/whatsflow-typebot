import { Input } from '@/components/inputs'
import { SwitchWithLabel } from '@/components/SwitchWithLabel'
import { VariableSearchInput } from '@/components/VariableSearchInput'
import { FormLabel, Stack } from '@chakra-ui/react'
import { DateInputOptions, Variable } from 'models'
import React from 'react'

type DateInputSettingsBodyProps = {
  options: DateInputOptions
  onOptionsChange: (options: DateInputOptions) => void
}

export const DateInputSettingsBody = ({
  options,
  onOptionsChange,
}: DateInputSettingsBodyProps) => {
  const handleFromChange = (from: string) =>
    onOptionsChange({ ...options, labels: { ...options?.labels, from } })
  const handleToChange = (to: string) =>
    onOptionsChange({ ...options, labels: { ...options?.labels, to } })
  const handleButtonLabelChange = (button: string) =>
    onOptionsChange({ ...options, labels: { ...options?.labels, button } })
  const handleIsRangeChange = (isRange: boolean) =>
    onOptionsChange({ ...options, isRange })
  const handleHasTimeChange = (hasTime: boolean) =>
    onOptionsChange({ ...options, hasTime })
  const handleVariableChange = (variable?: Variable) =>
    onOptionsChange({ ...options, variableId: variable?.id })

  return (
    <Stack spacing={4}>
      <SwitchWithLabel
        label="É alcance?"
        initialValue={options.isRange}
        onCheckChange={handleIsRangeChange}
      />
      <SwitchWithLabel
        label="Com tempo?"
        initialValue={options.isRange}
        onCheckChange={handleHasTimeChange}
      />
      {options.isRange && (
        <Stack>
          <FormLabel mb="0" htmlFor="from">
            Do rótulo:
          </FormLabel>
          <Input
            id="from"
            defaultValue={options.labels.from}
            onChange={handleFromChange}
          />
        </Stack>
      )}
      {options?.isRange && (
        <Stack>
          <FormLabel mb="0" htmlFor="to">
            Para rótulo:
          </FormLabel>
          <Input
            id="to"
            defaultValue={options.labels.to}
            onChange={handleToChange}
          />
        </Stack>
      )}
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          Rótulo do botão:
        </FormLabel>
        <Input
          id="button"
          defaultValue={options.labels.button}
          onChange={handleButtonLabelChange}
        />
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="variable">
          Salvar resposta em uma variável :
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options.variableId}
          onSelectVariable={handleVariableChange}
        />
      </Stack>
    </Stack>
  )
}
