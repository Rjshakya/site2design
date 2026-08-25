import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authClient } from "../lib/auth"

export function useSignOut() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const { error } = await authClient.signOut()
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })
}
