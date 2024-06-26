import { TextInput } from '@/components/inputs'
import { MoreInfoTooltip } from '@/components/MoreInfoTooltip'
import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import { FormControl, FormLabel, Stack } from '@chakra-ui/react'
import {
  ChoiceInputOptions,
  Variable,
  defaultChoiceInputOptions,
} from '@typebot.io/schemas'
import React from 'react'
import { SwitchWithRelatedSettings } from '@/components/SwitchWithRelatedSettings'

type Props = {
  options?: ChoiceInputOptions
  onOptionsChange: (options: ChoiceInputOptions) => void
}

export const ButtonsBlockSettings = ({ options, onOptionsChange }: Props) => {
  const updateIsMultiple = (isMultipleChoice: boolean) =>
    options && onOptionsChange({ ...options, isMultipleChoice })
  const updateIsSearchable = (isSearchable: boolean) =>
    options && onOptionsChange({ ...options, isSearchable })
  const updateButtonLabel = (buttonLabel: string) =>
    options && onOptionsChange({ ...options, buttonLabel })
  const updateSearchInputPlaceholder = (searchInputPlaceholder: string) =>
    options && onOptionsChange({ ...options, searchInputPlaceholder })
  const updateSaveVariable = (variable?: Variable) =>
    options && onOptionsChange({ ...options, variableId: variable?.id })
  const updateDynamicDataVariable = (variable?: Variable) =>
    options && onOptionsChange({ ...options, dynamicVariableId: variable?.id })

  return (
    <Stack spacing={4}>
      <SwitchWithRelatedSettings
        label="Múltipla escolha?"
        initialValue={options?.isMultipleChoice ?? false}
        onCheckChange={updateIsMultiple}
      >
        <TextInput
          label="Rótulo do botão:"
          defaultValue={options?.buttonLabel ?? 'Enviar'}
          onChange={updateButtonLabel}
        />
      </SwitchWithRelatedSettings>
      <SwitchWithRelatedSettings
        label="É pesquisavel?"
        initialValue={options?.isSearchable ?? false}
        onCheckChange={updateIsSearchable}
      >
        <TextInput
          label="laceholder do input:"
          defaultValue={
            options?.searchInputPlaceholder ??
            defaultChoiceInputOptions.searchInputPlaceholder
          }
          onChange={updateSearchInputPlaceholder}
        />
      </SwitchWithRelatedSettings>
      <FormControl>
        <FormLabel>
          Dados dinamicos:{' '}
          <MoreInfoTooltip>
            Se definido, os botões serão exibidos dinamicamente com base no que
            o contém.
          </MoreInfoTooltip>
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options?.dynamicVariableId}
          onSelectVariable={updateDynamicDataVariable}
        />
      </FormControl>
      <Stack>
        <FormLabel mb="0" htmlFor="variable">
          Salve a resposta em uma variável:
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options?.variableId}
          onSelectVariable={updateSaveVariable}
        />
      </Stack>
    </Stack>
  )
}
