import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        dentists: [],
        times: [],
        appointment: null,

    },
    getters: {
        getDentists(state) {
            return state.dentists
        },
        getTimes(state) {
            return state.times;
        },
        getAppointment(state) {
            return state.appointment;
        }
    },
    mutations: {
        updateDentists(state, dentists) {
            state.dentists = dentists;
        },
        updateTimes(state, times) {
            state.times = times;
        },
        updateAppointment(state, appointment) {
            state.appointment = appointment;
        }
    }
})