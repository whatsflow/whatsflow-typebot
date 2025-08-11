import { TextInput } from '@/components/inputs'
import { CodeEditor } from '@/components/inputs/CodeEditor'
import { SwitchWithLabel } from '@/components/inputs/SwitchWithLabel'
import { Stack } from '@chakra-ui/react'
import { CrmWhatsflowOptions } from '@typebot.io/schemas'

type Props = {
  options: CrmWhatsflowOptions
  onOptionsChange: (options: CrmWhatsflowOptions) => void
}

export const CrmWhatsflowSettings = ({ options, onOptionsChange }: Props) => {
  const handleTituloChange = (titulo: string) =>
    onOptionsChange({
      ...options,
      titulo,
    })

  const handleNomeChange = (nome: string) =>
    onOptionsChange({
      ...options,
      nome,
    })

  const handleUserIdChange = (userId: string) =>
    onOptionsChange({
      ...options,
      userId,
    })

  const handleEmailChange = (email: string) =>
    onOptionsChange({
      ...options,
      email,
    })

  const handleUrlChange = (url: string) =>
    onOptionsChange({
      ...options,
      url,
    })

  const handleTokenChange = (token: string) =>
    onOptionsChange({
      ...options,
      token,
    })

  const handleStagioChange = (stagio: string) =>
    onOptionsChange({
      ...options,
      stagio,
    })

  const handleCampPersEnabledChange = (isEnabled: boolean) =>
    onOptionsChange({
      ...options,
      camp_pers: {
        ...options.camp_pers,
        isEnabled,
      },
    })

  const handleCampPersBodyChange = (body: string) =>
    onOptionsChange({
      ...options,
      camp_pers: {
        ...options.camp_pers,
        body,
      },
    })

  return (
    <Stack spacing={4}>
      <TextInput
        label="Título:"
        onChange={handleTituloChange}
        defaultValue={options.titulo ?? ''}
        placeholder="Digite o título"
      />
      <TextInput
        label="Nome:"
        onChange={handleNomeChange}
        defaultValue={options.nome ?? ''}
        placeholder="Digite o nome"
      />
      <TextInput
        label="User ID:"
        onChange={handleUserIdChange}
        defaultValue={options.userId ?? ''}
        placeholder="Digite o User ID"
      />
      <TextInput
        label="Email:"
        onChange={handleEmailChange}
        defaultValue={options.email ?? ''}
        placeholder="Digite o email"
      />
      <TextInput
        label="URL:"
        onChange={handleUrlChange}
        defaultValue={options.url ?? ''}
        placeholder="Digite a URL"
      />
      <TextInput
        label="Token:"
        onChange={handleTokenChange}
        defaultValue={options.token ?? ''}
        placeholder="Digite o token"
      />
      <TextInput
        label="Estágio:"
        onChange={handleStagioChange}
        defaultValue={options.stagio ?? ''}
        placeholder="Digite o estágio"
      />

      <SwitchWithLabel
        label="Campos personalizados"
        initialValue={options.camp_pers?.isEnabled ?? false}
        onCheckChange={handleCampPersEnabledChange}
      />

      {options.camp_pers?.isEnabled && (
        <CodeEditor
          defaultValue={options.camp_pers?.body ?? '{}'}
          lang="json"
          onChange={handleCampPersBodyChange}
          height="150px"
        />
      )}
    </Stack>
  )
}
