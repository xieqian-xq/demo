const babel = require("rollup-plugin-babel");
const rollupTypescript = require("rollup-plugin-typescript");
const constant = require("./constant");

const rollupConfig = {
    external: undefined,
    output: {
        format: "iife",
        banner: constant.banner,
        name: "xqTree"
    },
    plugins: [babel()]
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
