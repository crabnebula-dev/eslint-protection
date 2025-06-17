import { defineConfig } from "eslint/config";
import protection from "./eslint-protection.js";

export default defineConfig({
    plugins: { protection },
    rules: {
        "protection/protect": "error"
    }
});
