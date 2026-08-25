import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { useExtract } from "../../../hooks/use-extract"

export function ExtractDemo() {
  const extract = useExtract()
  const [url, setUrl] = useState("")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    extract.mutate({ url })
  }

  const output = extract.data?.[0]

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-1.5">
        <Label htmlFor="url">Page URL</Label>
        <div className="flex gap-2">
          <Input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button type="submit" disabled={extract.isPending}>
            {extract.isPending ? "Extracting..." : "Extract"}
          </Button>
        </div>
      </form>

      {extract.error && (
        <p className="text-xs text-destructive">{extract.error.message}</p>
      )}

      {output && (
        <div className="flex flex-col gap-3 rounded-md border border-border p-3">
          <div>
            <p className="text-xs font-medium">{output.title ?? "Untitled"}</p>
            {output.description && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {output.description}
              </p>
            )}
            <a
              href={output.page_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-primary underline-offset-4 hover:underline"
            >
              {output.page_url}
            </a>
          </div>
          <dl className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <dt className="text-muted-foreground">CSS links</dt>
              <dd>{output.csslinks.length}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Inline styles</dt>
              <dd>{output.inline_styles.length}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Fonts</dt>
              <dd>{output.fonturls.length}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Brand assets</dt>
              <dd>{output.brand_assets.length}</dd>
            </div>
          </dl>
          {output.og_image && (
            <img
              src={output.og_image}
              alt=""
              className="max-h-40 w-full rounded-md border border-border object-cover"
            />
          )}
        </div>
      )}
    </div>
  )
}
