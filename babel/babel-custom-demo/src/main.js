import util from "./util";

let name = "xieqian";

const age = 18;

var { isKey } = { isKey: true };

var dream = `请输出你的梦想，${ name }`;

var isDream = dream.includes("梦想");

var promise = new Promise();

localStorage.setItem("ls", "测试兼容性");

console.log(util.getName());
