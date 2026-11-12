import { z } from "zod";

export type ListFormErrorCode = "nameRequired";

export const listNameSchema = z
  .string()
  .trim()
  .min(1, { error: "nameRequired" satisfies ListFormErrorCode });
