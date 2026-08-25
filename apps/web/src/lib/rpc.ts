import { hcWithType } from "server/rpc"
import { Env } from "./env"

export const apiClient = hcWithType(Env.apiUrl, {
  init: { credentials: "include" },
})
