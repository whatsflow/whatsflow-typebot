import { Stack, IconButton, useColorModeValue } from '@chakra-ui/react'
import { PlusIcon, MinusIcon } from '@/components/icons'
import { headerHeight } from '@/features/editor/constants'

type Props = {
  onZoomInClick: () => void
  onZoomOutClick: () => void
}
export const ZoomButtons = ({
  onZoomInClick: onZoomIn,
  onZoomOutClick: onZoomOut,
}: Props) => (
  <Stack
    pos="fixed"
    top={`calc(${headerHeight}px + 70px)`}
    right="40px"
    bgColor={useColorModeValue('white', 'gray.900')}
    rounded="md"
    zIndex={1}
    spacing="0"
    shadow="lg"
  >
    <IconButton
      icon={<PlusIcon />}
      aria-label={'Mais Zoom'}
      size="sm"
      onClick={onZoomIn}
      bgColor={useColorModeValue('white', undefined)}
      borderBottomRadius={0}
    />
    <IconButton
      icon={<MinusIcon />}
      aria-label={'Reduzir o zoom'}
      size="sm"
      onClick={onZoomOut}
      bgColor={useColorModeValue('white', undefined)}
      borderTopRadius={0}
    />
  </Stack>
)
