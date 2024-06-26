import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { TrashIcon } from '@/components/icons'
import React from 'react'

type Props = {
  isOpen: boolean
  position: { x: number; y: number }
  onDeleteEdge: () => void
  onClose: () => void
}

export const EdgeMenu = ({
  isOpen,
  onClose,
  position,
  onDeleteEdge,
}: Props) => {
  return (
    <Menu isOpen={isOpen} gutter={0} onClose={onClose} isLazy>
      <MenuButton
        aria-hidden={true}
        w={1}
        h={1}
        pos="absolute"
        style={{
          left: position.x,
          top: position.y,
        }}
      />
      <MenuList>
        <MenuItem icon={<TrashIcon />} onClick={onDeleteEdge}>
          Deletar
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
