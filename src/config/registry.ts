export const REGISTRY_CONFIG = {
  namespace: process.env.REGISTRY_NAMESPACE || "@shuyuan",
  namespaceUrl:
    process.env.REGISTRY_NAMESPACE_URL || "https://shuyuan.dev/r/{name}.json",
  baseUrl: process.env.APP_URL || "https://shuyuan.dev",
};
