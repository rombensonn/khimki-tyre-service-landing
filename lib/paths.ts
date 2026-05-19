export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

export function withBasePath(path: string) {
  if (!basePath || !path.startsWith("/")) {
    return path;
  }

  return `${basePath}${path}`;
}

function normalizeBasePath(value?: string) {
  if (!value || value === "/") {
    return "";
  }

  return value.startsWith("/") ? value.replace(/\/$/, "") : `/${value}`;
}
