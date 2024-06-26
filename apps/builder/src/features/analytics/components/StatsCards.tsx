import {
  GridProps,
  SimpleGrid,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import { Stats } from '@typebot.io/schemas'

const computeCompletionRate = (
  totalCompleted: number,
  totalStarts: number
): string => {
  if (totalStarts === 0) return 'Não disponível'
  return `${Math.round((totalCompleted / totalStarts) * 100)}%`
}

export const StatsCards = ({
  stats,
  ...props
}: { stats?: Stats } & GridProps) => {
  const bg = useColorModeValue('white', 'gray.900')

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" {...props}>
      <Stat bgColor={bg} p="4" rounded="md" boxShadow="md">
        <StatLabel>Visualizações</StatLabel>
        {stats ? (
          <StatNumber>{stats.totalViews}</StatNumber>
        ) : (
          <Skeleton w="50%" h="10px" mt="2" />
        )}
      </Stat>
      <Stat bgColor={bg} p="4" rounded="md" boxShadow="md">
        <StatLabel>Inicios</StatLabel>
        {stats ? (
          <StatNumber>{stats.totalStarts}</StatNumber>
        ) : (
          <Skeleton w="50%" h="10px" mt="2" />
        )}
      </Stat>
      <Stat bgColor={bg} p="4" rounded="md" boxShadow="md">
        <StatLabel>Taxa de realizaçao</StatLabel>
        {stats ? (
          <StatNumber>
            {computeCompletionRate(stats.totalCompleted, stats.totalStarts)}
          </StatNumber>
        ) : (
          <Skeleton w="50%" h="10px" mt="2" />
        )}
      </Stat>
    </SimpleGrid>
  )
}
