import { CrmWhatsflowBlock, SessionState } from '@typebot.io/schemas'
import { ExecuteIntegrationResponse } from '../../../chat/types'
import { parseVariables } from '@/features/variables/parseVariables'

export const executeCrmWhatsflowBlock = async (
  state: SessionState,
  block: CrmWhatsflowBlock
): Promise<ExecuteIntegrationResponse> => {
  const { options } = block

  // Função de parse das variáveis
  const parseText = parseVariables(state.typebot.variables)

  // Busca a variável chatId do state
  const chatIdVariable = state.typebot.variables.find(
    (variable) => variable.name === 'chatId'
  )

  // Processa campos personalizados primeiro
  let campPers: any = undefined
  if (options.camp_pers?.isEnabled && options.camp_pers?.body) {
    try {
      const parsedCustomBody = parseText(options.camp_pers.body)
      campPers = JSON.parse(parsedCustomBody)
    } catch (error) {
      console.error('Erro ao fazer parse dos campos personalizados:', error)
    }
  }

  // Monta o body base com camp_pers se existir
  const body = {
    chatId: chatIdVariable?.value || '',
    titulo: parseText(options.titulo) || '',
    nome: parseText(options.nome) || '',
    userId: parseText(options.userId) || '',
    email: parseText(options.email) || '',
    url: parseText(options.url) || '',
    token: parseText(options.token) || '',
    stagio: parseText(options.stagio) || '',
    ...(campPers && { camp_pers: campPers }),
  }

  try {
    const response = await fetch('https://automacoes.pro/crmwhatsflow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      console.error(
        'CRM WhatsFlow API error:',
        response.status,
        response.statusText
      )
      return { outgoingEdgeId: block.outgoingEdgeId }
    }

    return { outgoingEdgeId: block.outgoingEdgeId }
  } catch (error) {
    console.error('Error executing CRM WhatsFlow block:', error)
    return { outgoingEdgeId: block.outgoingEdgeId }
  }
}
