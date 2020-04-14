const package = require("../package.json");

const banner = `
/*!
 * ${package.name} v${package.version}
 * (c) 2020-${new Date().getFullYear()} ${package.author}
 * Released under the ${package.license} License.
 */`.trim();

module.exports = {
    banner: banner
};
