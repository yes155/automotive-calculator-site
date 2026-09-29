export async function parseFormData(request: Request): Promise<Record<string, string>> {
  const body = await request.text();
  const params = new URLSearchParams(body);
  const result: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}
