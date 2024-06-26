import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { sendRequest } from '@typebot.io/lib'
import { useCallback } from 'react'

type Data = string | undefined
type Variables = {
  color: string
  name: string
}

type UseCreateTagOptions = UseMutationOptions<Data, unknown, Variables>
type UseCreateTagResult = UseMutationResult<Data, unknown, Variables>

export default function useCreateTag(
  options?: UseCreateTagOptions
): UseCreateTagResult {
  const createTag = useCallback(
    async (body: Variables) =>
      (
        await sendRequest<Data>({
          url: '/api/whatsflow/tags',
          method: 'POST',
          body,
        })
      ).data,
    []
  )

  const mutationKey = ['whatsflow', 'logic', 'tags']

  const mutationFn = useCallback(
    (variables: Variables) => createTag(variables),
    [createTag]
  )

  return useMutation<Data, unknown, Variables>(mutationKey, mutationFn, options)
}
