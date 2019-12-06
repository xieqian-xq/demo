import Vue from "vue";
import App from "./App";
// import router from "./router";
// import store from "./store";

// console.log(App);

Vue.config.productionTip = false;

let vm = new Vue({
    el: "#app",
    render(h) {
        return h(App);
    }
    // router,
    // store,
    // components: { App },
    // template: "<div><ul :class='bindCls' class='list' v-if='isShow'>"+
    // "<li v-for='(item, index) in data' @click='clickItem(index)'>{{ item }} : {{ index }}</li>"
    // +"</ul><App/></div>",
    // template: "<App/>",
    // data() {
    //     return {
    //         appName: "custom vue"
    //     };
    // }
});

window.$vm = vm;
