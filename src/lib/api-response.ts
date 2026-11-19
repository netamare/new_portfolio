export function apiSuccess<T>(data: T, status = 200) {
  return Response.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 500) {
  return Response.json({ success: false, error: message }, { status });
}

export function handleApiError(error: unknown) {
  console.error("API request failed:", error);
  return apiError("An unexpected error occurred.");
}
