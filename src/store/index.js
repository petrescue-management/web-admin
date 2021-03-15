import Vue from "vue";
import Vuex from "vuex";
import centerStore from "./modules/CenterStore";
import registerCenterFormStore from "./modules/RegisterCenterFormStore";
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        centerInfo: centerStore,
        registerForm: registerCenterFormStore,
    }
})