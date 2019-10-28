const package = require("../package.json");
const banner = `
/*!
 * demo v${package.version}
 * (c) 2019-${new Date().getFullYear()} Qian Xie
 * Released under the MIT License.
 */`.trim();

module.exports = {
    banner: banner
};
