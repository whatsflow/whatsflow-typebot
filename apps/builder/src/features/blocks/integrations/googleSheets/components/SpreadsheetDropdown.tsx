import { Select } from '@/components/inputs/Select'
import { Input, Tooltip } from '@chakra-ui/react'
import { useSpreadsheets } from '../hooks/useSpreadsheets'

type Props = {
  credentialsId: string
  spreadsheetId?: string
  onSelectSpreadsheetId: (id: string | undefined) => void
}

export const SpreadsheetsDropdown = ({
  credentialsId,
  spreadsheetId,
  onSelectSpreadsheetId,
}: Props) => {
  const { spreadsheets, isLoading } = useSpreadsheets({
    credentialsId,
  })

  if (isLoading) return <Input value="Loading..." isDisabled />
  if (!spreadsheets || spreadsheets.length === 0)
    return (
      <Tooltip label="Nenhuma planilha encontrada, verifique se você tem pelo menos uma planilha que contém uma linha de cabeçalho">
        <span>
          <Input value="Nenhuma planilha encontrada" isDisabled />
        </span>
      </Tooltip>
    )
  return (
    <Select
      selectedItem={spreadsheetId}
      items={(spreadsheets ?? []).map((spreadsheet) => ({
        label: spreadsheet.name,
        value: spreadsheet.id,
      }))}
      onSelect={onSelectSpreadsheetId}
      placeholder={'Pesquisar planilha'}
    />
  )
}
