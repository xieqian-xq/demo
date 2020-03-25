const uuid = require("uuid");
const rollupConfig = require("./rollup.config");

module.exports = {
    rollupConfig: rollupConfig,
    uuid: uuid.v4().slice(0, 8)
};
