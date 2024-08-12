import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        base: "/quantlib-wasm-demo/", // your repository name
        plugins: [react()],
        build: {
            sourcemap: true,
        },
    };
});
