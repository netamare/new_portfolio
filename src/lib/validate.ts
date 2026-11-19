import { z } from "zod";

export async function parseJson<T extends z.ZodType>(request: Request, schema: T) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { success: false as const, response: Response.json({ success: false, error: "Request body must be valid JSON." }, { status: 400 }) };
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return {
      success: false as const,
      response: Response.json(
        { success: false, error: "Validation failed.", details: z.flattenError(result.error) },
        { status: 400 },
      ),
    };
  }

  return { success: true as const, data: result.data as z.output<T> };
}
