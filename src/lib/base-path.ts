const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const EXTERNAL_URL_RE = /^(https?:)?\/\//i;

export function withBasePath(path: string): string {
  if (!path) return BASE_PATH || "/";
  if (EXTERNAL_URL_RE.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }

  if (!BASE_PATH) return path;
  if (path.startsWith(BASE_PATH)) return path;

  if (path.startsWith("/")) return `${BASE_PATH}${path}`;
  return `${BASE_PATH}/${path}`;
}
