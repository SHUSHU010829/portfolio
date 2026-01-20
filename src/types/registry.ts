export interface RegistryEntry {
  name: string;
  type: "registry:component" | "registry:hook" | "registry:block" | "registry:example" | "registry:lib";
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: Array<{
    name: string;
    content: string;
  }>;
  tailwind?: {
    config?: Record<string, any>;
  };
  cssVars?: Record<string, Record<string, string>>;
}