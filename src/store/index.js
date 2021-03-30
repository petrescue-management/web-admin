import Vue from "vue";
import Vuex from "vuex";
import centerStore from "./modules/CenterStore";
import loginStore from "./modules/LoginStore";
import registerCenterFormStore from "./modules/RegisterCenterFormStore";
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: loginStore,
        centerInfo: centerStore,
        registerForm: registerCenterFormStore,
    }
})