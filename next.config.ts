import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: false,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
