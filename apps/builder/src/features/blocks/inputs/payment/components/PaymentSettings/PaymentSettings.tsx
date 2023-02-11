import {
  Stack,
  useDisclosure,
  Text,
  Select,
  HStack,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react'
import { DropdownList } from '@/components/DropdownList'
import { CredentialsType, PaymentInputOptions, PaymentProvider } from 'models'
import React, { ChangeEvent, useState } from 'react'
import { currencies } from './currencies'
import { StripeConfigModal } from './StripeConfigModal'
import { CredentialsDropdown } from '@/features/credentials'
import { Input } from '@/components/inputs'

type Props = {
  options: PaymentInputOptions
  onOptionsChange: (options: PaymentInputOptions) => void
}

export const PaymentSettings = ({ options, onOptionsChange }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [refreshCredentialsKey, setRefreshCredentialsKey] = useState(0)

  const handleProviderChange = (provider: PaymentProvider) => {
    onOptionsChange({
      ...options,
      provider,
    })
  }

  const handleCredentialsSelect = (credentialsId?: string) => {
    setRefreshCredentialsKey(refreshCredentialsKey + 1)
    onOptionsChange({
      ...options,
      credentialsId,
    })
  }

  const handleAmountChange = (amount?: string) =>
    onOptionsChange({
      ...options,
      amount,
    })

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) =>
    onOptionsChange({
      ...options,
      currency: e.target.value,
    })

  const handleNameChange = (name: string) =>
    onOptionsChange({
      ...options,
      additionalInformation: { ...options.additionalInformation, name },
    })

  const handleEmailChange = (email: string) =>
    onOptionsChange({
      ...options,
      additionalInformation: { ...options.additionalInformation, email },
    })

  const handlePhoneNumberChange = (phoneNumber: string) =>
    onOptionsChange({
      ...options,
      additionalInformation: { ...options.additionalInformation, phoneNumber },
    })

  const handleButtonLabelChange = (button: string) =>
    onOptionsChange({
      ...options,
      labels: { ...options.labels, button },
    })

  const handleSuccessLabelChange = (success: string) =>
    onOptionsChange({
      ...options,
      labels: { ...options.labels, success },
    })

  return (
    <Stack spacing={4}>
      <Stack>
        <Text>Fornecedor:</Text>
        <DropdownList
          onItemSelect={handleProviderChange}
          items={Object.values(PaymentProvider)}
          currentItem={options.provider}
        />
      </Stack>
      <Stack>
        <Text>Conta:</Text>
        <CredentialsDropdown
          type={CredentialsType.STRIPE}
          currentCredentialsId={options.credentialsId}
          onCredentialsSelect={handleCredentialsSelect}
          onCreateNewClick={onOpen}
          refreshDropdownKey={refreshCredentialsKey}
        />
      </Stack>
      <HStack>
        <Stack>
          <Text>valor:</Text>
          <Input
            onChange={handleAmountChange}
            defaultValue={options.amount}
            placeholder="30.00"
          />
        </Stack>
        <Stack>
          <Text>Moeda:</Text>
          <Select
            placeholder="Select option"
            value={options.currency}
            onChange={handleCurrencyChange}
          >
            {currencies.map((currency) => (
              <option value={currency.code} key={currency.code}>
                {currency.code}
              </option>
            ))}
          </Select>
        </Stack>
      </HStack>
      <Stack>
        <Text>Rótulo do botão:</Text>
        <Input
          onChange={handleButtonLabelChange}
          defaultValue={options.labels.button}
          placeholder="Pagar"
        />
      </Stack>
      <Stack>
        <Text>Mensagem de sucesso:</Text>
        <Input
          onChange={handleSuccessLabelChange}
          defaultValue={options.labels.success ?? 'Successo'}
          placeholder="Successo"
        />
      </Stack>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton justifyContent="space-between">
            Informações adicionais
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} as={Stack} spacing="6">
            <Stack>
              <Text>Nome:</Text>
              <Input
                defaultValue={options.additionalInformation?.name ?? ''}
                onChange={handleNameChange}
                placeholder="John Smith"
              />
            </Stack>
            <Stack>
              <Text>Email:</Text>
              <Input
                defaultValue={options.additionalInformation?.email ?? ''}
                onChange={handleEmailChange}
                placeholder="john@gmail.com"
              />
            </Stack>
            <Stack>
              <Text>Número de telefone :</Text>
              <Input
                defaultValue={options.additionalInformation?.phoneNumber ?? ''}
                onChange={handlePhoneNumberChange}
                placeholder="+33XXXXXXXXX"
              />
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <StripeConfigModal
        isOpen={isOpen}
        onClose={onClose}
        onNewCredentials={handleCredentialsSelect}
      />
    </Stack>
  )
}
