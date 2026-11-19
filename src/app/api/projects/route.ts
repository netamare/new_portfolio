import { connectToDatabase } from "@/lib/mongodb";
import { Project } from "@/lib/models/Project";
import { apiSuccess, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    return apiSuccess(projects);
  } catch (error) {
    return handleApiError(error);
  }
}
