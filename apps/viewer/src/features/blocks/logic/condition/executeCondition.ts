import { findUniqueVariableValue } from '@/features/variables/findUniqueVariableValue'
import { parseVariables } from '@/features/variables/parseVariables'
import { isNotDefined, isDefined } from '@typebot.io/lib'
import {
  Comparison,
  ComparisonOperators,
  Condition,
  LogicalOperator,
  Variable,
} from '@typebot.io/schemas'

export const executeCondition =
  (variables: Variable[]) =>
  (condition: Condition): boolean =>
    condition.logicalOperator === LogicalOperator.AND
      ? condition.comparisons.every(executeComparison(variables))
      : condition.comparisons.some(executeComparison(variables))

const clear = (value: string | null) => {
  if (!value) return ''

  const normalizedString = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const result = normalizedString
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '')
    .toLowerCase()

  return result
}

const executeComparison =
  (variables: Variable[]) =>
  (comparison: Comparison): boolean => {
    if (!comparison?.variableId) return false
    const inputValue =
      variables.find((v) => v.id === comparison.variableId)?.value ?? null
    const value =
      comparison.value === 'undefined' || comparison.value === 'null'
        ? null
        : findUniqueVariableValue(variables)(comparison.value) ??
          parseVariables(variables)(comparison.value)
    if (isNotDefined(comparison.comparisonOperator)) return false
    switch (comparison.comparisonOperator) {
      case ComparisonOperators.CONTAINS: {
        const contains = (a: string | null, b: string | null) => {
          if (b === '' || !b || !a) return false
          return clear(a).includes(clear(b))
        }
        return compare(contains, inputValue, value, 'some')
      }
      case ComparisonOperators.NOT_CONTAINS: {
        const notContains = (a: string | null, b: string | null) => {
          if (b === '' || !b || !a) return true
          return !clear(a)
            .toLowerCase()
            .trim()
            .includes(clear(b).toLowerCase().trim())
        }
        return compare(notContains, inputValue, value)
      }
      case ComparisonOperators.EQUAL: {
        return compare((a, b) => clear(a) === clear(b), inputValue, value)
      }
      case ComparisonOperators.NOT_EQUAL: {
        return compare((a, b) => clear(a) !== clear(b), inputValue, value)
      }
      case ComparisonOperators.GREATER: {
        if (isNotDefined(inputValue) || isNotDefined(value)) return false
        if (typeof inputValue === 'string') {
          if (typeof value === 'string')
            return parseDateOrNumber(inputValue) > parseDateOrNumber(value)
          return Number(inputValue) > value.length
        }
        if (typeof value === 'string') return inputValue.length > Number(value)
        return inputValue.length > value.length
      }
      case ComparisonOperators.LESS: {
        if (isNotDefined(inputValue) || isNotDefined(value)) return false
        if (typeof inputValue === 'string') {
          if (typeof value === 'string')
            return parseDateOrNumber(inputValue) < parseDateOrNumber(value)
          return Number(inputValue) < value.length
        }
        if (typeof value === 'string') return inputValue.length < Number(value)
        return inputValue.length < value.length
      }
      case ComparisonOperators.IS_SET: {
        return isDefined(inputValue) && inputValue.length > 0
      }
      case ComparisonOperators.IS_EMPTY: {
        return isNotDefined(inputValue) || inputValue.length === 0
      }
      case ComparisonOperators.STARTS_WITH: {
        const startsWith = (a: string | null, b: string | null) => {
          if (b === '' || !b || !a) return false
          return clear(a)
            .toLowerCase()
            .trim()
            .startsWith(clear(b).toLowerCase().trim())
        }
        return compare(startsWith, inputValue, value)
      }
      case ComparisonOperators.ENDS_WITH: {
        const endsWith = (a: string | null, b: string | null) => {
          if (b === '' || !b || !a) return false
          return clear(a)
            .toLowerCase()
            .trim()
            .endsWith(clear(b).toLowerCase().trim())
        }
        return compare(endsWith, inputValue, value)
      }
    }
  }

const compare = (
  compareStrings: (a: string | null, b: string | null) => boolean,
  a: Exclude<Variable['value'], undefined>,
  b: Exclude<Variable['value'], undefined>,
  type: 'every' | 'some' = 'every'
): boolean => {
  if (!a || typeof a === 'string') {
    if (!b || typeof b === 'string') return compareStrings(a, b)
    return type === 'every'
      ? b.every((b) => compareStrings(a, b))
      : b.some((b) => compareStrings(a, b))
  }
  if (!b || typeof b === 'string') {
    return type === 'every'
      ? a.every((a) => compareStrings(a, b))
      : a.some((a) => compareStrings(a, b))
  }
  if (type === 'every')
    return a.every((a) => b.every((b) => compareStrings(a, b)))
  return a.some((a) => b.some((b) => compareStrings(a, b)))
}

const parseDateOrNumber = (value: string): number => {
  const parsed = Number(value)
  if (isNaN(parsed)) {
    const time = Date.parse(value)
    return time
  }
  return parsed
}
