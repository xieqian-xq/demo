const babel = require("rollup-plugin-babel");
const rollupTypescript = require("rollup-plugin-typescript");
const replace = require("rollup-plugin-replace");
const constant = require("./constant");
const isProduction = process.argv.includes("production");

const rollupConfig = {
    external: undefined,
    output: {
        format: "iife",
        banner: constant.banner,
        name: "xqTree"
    },
    plugins: [babel(), replace({ "process.env.NODE_ENV": JSON.stringify(isProduction ? "production" : "development") })]
};

module.exports = {
    arg1: {
        external: rollupConfig.external,
        plugins: rollupConfig.plugins
    },
    arg2: {
        ...rollupConfig.output
    },
    arg1Ts: {
        external: rollupConfig.external,
        plugins: [rollupTypescript()]
    }
};
