import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        user: {
            jwtToken: null,
            email: null,
            roles: [],
        }
    },
    getters: {
        user(state) {
            return state.user;
        }
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data;
        },
    },
    actions: {
        async loginUser({ commit }, user) {
            if (user) {
                let current_user = {
                    token: user.token,
                    email: user.email,
                    roles: user.roles,
                }
                localStorage.setItem("admin", JSON.stringify(current_user));
                commit("SET_USER", current_user);
            }
        },

        logout({ commit }) {
            let current_user = {
                token: null,
                email: null,
                roles: null,
            }
            localStorage.removeItem("admin");
            commit("SET_USER", current_user);

        }
    }
};