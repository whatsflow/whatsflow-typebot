import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react'
import { isNotDefined } from '@typebot.io/lib'
import { ChangePlanModal } from './ChangePlanModal'

type Props = {
  limitReachedType?: string
  excludedPlans?: ('STARTER' | 'PRO')[]
} & ButtonProps

export const UpgradeButton = ({
  limitReachedType,
  excludedPlans,
  ...props
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { workspace } = useWorkspace()
  return (
    <Button
      colorScheme="blue"
      {...props}
      isLoading={isNotDefined(workspace)}
      onClick={onOpen}
    >
      {props.children ?? 'Melhorar'}
      <ChangePlanModal
        isOpen={isOpen}
        onClose={onClose}
        type={limitReachedType}
        excludedPlans={excludedPlans}
      />
    </Button>
  )
}
