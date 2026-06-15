import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".next/**", "out/**", "node_modules/**"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // Allow <img> — this site uses static export (output: "export")
      // so next/image optimization is unavailable
      "@next/next/no-img-element": "off",
    },
  }
);
