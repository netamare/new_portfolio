import { connectToDatabase } from "@/lib/mongodb";
import { Message } from "@/lib/models/Message";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { contactSchema } from "@/lib/schemas/contact";
import { parseJson } from "@/lib/validate";

export async function POST(request: Request) {
  const parsed = await parseJson(request, contactSchema);
  if (!parsed.success) return parsed.response;

  try {
    await connectToDatabase();
    const message = await Message.create(parsed.data);
    return apiSuccess({ id: message.id }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
