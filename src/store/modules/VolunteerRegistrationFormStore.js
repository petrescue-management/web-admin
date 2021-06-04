import Vue from "vue";
import Vuex from "vuex";
import {
    getListVolunteerRegistrationFormAPI,
    getListVolunteerRegistrationFormByIdAPI
} from "@/api/admin/userApi";
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listForm: [],
        totalForm: 0,
        form: {},
    },
    getters: {
        getListForm(state) {
            return state.listForm;
        },

        getTotalForm(state) {
            return state.totalForm;
        },

        getFormDetail(state) {
            return state.form;
        }
    },
    mutations: {
        SET_LIST_FORM(state, data) {
            state.listForm = data;
        },
        SET_TOTAL_FORM(state, data) {
            state.totalForm = data;
        },
        SET_FORM_DETAIL(state, data) {
            state.form = data;
        }
    },
    actions: {
        async getListVolunteerRegistrationForm({ commit }, data) {
            await getListVolunteerRegistrationFormAPI(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_LIST_FORM", data.list);
                    commit("SET_TOTAL_FORM", data.count);
                })
        },

        async getListVolunteerRegistrationFormById({ commit }, data) {
            await getListVolunteerRegistrationFormByIdAPI(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_FORM_DETAIL", data);
                })
        },
    }
};