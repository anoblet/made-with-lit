module.exports = {
    presets: ["@babel/preset-typescript"],
    plugins: [
        ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
        "@babel/plugin-proposal-class-properties"
    ]
};
