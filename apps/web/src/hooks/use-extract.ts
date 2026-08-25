import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../lib/rpc";

type ExtractInput = {
  url: string;
};

export function useExtract() {
  return useMutation({
    mutationFn: async ({ url }: ExtractInput) => {
      const res = await apiClient.api.extractor.$post({ json: { url: new URL(url) } });
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? `Request failed with status ${res.status}`);
      }
      return res.json();
    },
  });
}
