import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  base: "",
  plugins: [cssInjectedByJsPlugin()],
  build: {
    emptyOutDir: true,
    minify: true,
    lib: {
      entry: "src/index.tsx",
      name: "idce_%NAME%",
      formats: ["umd"]
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@eva-ics/webengine",
        "@eva-ics/webengine-react"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@eva-ics/webengine": "EvaWE",
          "@eva-ics/webengine-react": "EvaWER"
        }
      }
    }
  }
});
