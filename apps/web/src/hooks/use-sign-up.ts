import { useMutation } from "@tanstack/react-query"
import { authClient } from "../lib/auth"

type SignUpInput = {
  name: string
  email: string
  password: string
}

export function useSignUp() {
  return useMutation({
    mutationFn: async ({ name, email, password }: SignUpInput) => {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      })
      if (error) throw error
      return data
    },
  })
}
