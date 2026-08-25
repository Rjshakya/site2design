import { useMutation } from "@tanstack/react-query"
import { authClient } from "../lib/auth"

type SignInInput = {
  email: string
  password: string
}

export function useSignIn() {
  return useMutation({
    mutationFn: async ({ email, password }: SignInInput) => {
      const { data, error } = await authClient.signIn.email({ email, password })
      if (error) throw error
      return data
    },
  })
}
