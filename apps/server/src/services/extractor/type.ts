import type { ExtractOutputSchema, ExtractOutputsSchema, ExtractInputSchema } from "./schema";

export type ExtractOutput = typeof ExtractOutputSchema.Type;

export type ExtractOutputs = typeof ExtractOutputsSchema.Type;

export type ExtractInput = typeof ExtractInputSchema.Type;
