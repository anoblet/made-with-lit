import globals from "rollup-plugin-node-globals";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

module.exports = {
    input: "./tmp/service-worker.js",
    output: {
        dir: "./public",
        format: "esm",
    },
    plugins: [globals(), resolve(), terser(), json()],
};
