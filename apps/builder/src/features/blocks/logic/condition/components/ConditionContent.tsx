import { Stack, Wrap, Tag, Text, useColorModeValue } from '@chakra-ui/react'
import { byId } from '@typebot.io/lib'
import { ComparisonOperators, Condition, Variable } from '@typebot.io/schemas'

type Props = {
  condition: Condition
  variables: Variable[]
  size?: 'xs' | 'sm'
  displaySemicolon?: boolean
}
export const ConditionContent = ({
  condition,
  variables,
  size = 'sm',
  displaySemicolon,
}: Props) => {
  const comparisonValueBg = useColorModeValue('gray.200', 'gray.700')
  return (
    <Stack>
      {condition.comparisons.map((comparison, idx) => {
        const variable = variables.find(byId(comparison.variableId))
        return (
          <Wrap key={comparison.id} spacing={1} noOfLines={1}>
            {idx === 0 && <Text fontSize={size}>Se</Text>}
            {idx > 0 && (
              <Text fontSize={size}>{condition.logicalOperator ?? ''}</Text>
            )}
            {variable?.name &&
              comparison.comparisonOperator !==
                ComparisonOperators.CONTAINS_TAG && (
                <Tag bgColor="orange.400" color="white" size="sm">
                  {variable.name}
                </Tag>
              )}
            {comparison.comparisonOperator && (
              <Text fontSize={size}>
                {parseComparisonOperatorSymbol(comparison.comparisonOperator)}
              </Text>
            )}
            {comparison?.value && (
              <Tag bgColor={comparisonValueBg} size="sm">
                {comparison.value}
              </Tag>
            )}
            {idx === condition.comparisons.length - 1 && displaySemicolon && (
              <Text fontSize={size}>:</Text>
            )}
          </Wrap>
        )
      })}
    </Stack>
  )
}

const parseComparisonOperatorSymbol = (
  operator: ComparisonOperators
): string => {
  switch (operator) {
    case ComparisonOperators.CONTAINS:
      return 'contém'
    case ComparisonOperators.EQUAL:
      return '='
    case ComparisonOperators.GREATER:
      return '>'
    case ComparisonOperators.IS_SET:
      return 'Está definido'
    case ComparisonOperators.LESS:
      return '<'
    case ComparisonOperators.NOT_EQUAL:
      return '!='
    case ComparisonOperators.ENDS_WITH:
      return 'termina com'
    case ComparisonOperators.STARTS_WITH:
      return 'inícia com'
    case ComparisonOperators.IS_EMPTY:
      return 'está vazio'
    case ComparisonOperators.WITHOUT_ANSWER:
      return 'está sem resposta'
    case ComparisonOperators.NOT_CONTAINS:
      return 'não contém'
    case ComparisonOperators.MATCHES_REGEX:
      return 'Corresponde'
    case ComparisonOperators.NOT_MATCH_REGEX:
      return 'Não corresponde'
    case ComparisonOperators.CONTAINS_TAG:
      return 'contém tag'
  }
}
