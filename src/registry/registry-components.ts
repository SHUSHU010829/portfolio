import type { RegistryEntry } from "@/types/registry";

export const components: RegistryEntry[] = [
  {
    name: "button",
    type: "registry:component",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    files: [
      {
        name: "button.tsx",
        content: "",
      },
    ],
  },
];