import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import tagsStore from './tagsStore'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username: "",
        menu: [], //左侧导航菜单
        tenantCode: '',//租户id
        userId:'', //用户id
        monitorVehicles: [],
        currentMonitorVehicle: {}  //当前激活的监控vin
    },
    mutations: {
        changeUsername: function (state, str) {
            state.username = str;
        },
        changeMenu: function (state, arr) {
            state.menu = arr;
        },
        changeTenantCode: function (state, arr) {
            state.tenantCode = arr
        },
        changeVin: function (state, vin) {
            state.vin = vin
        },
        changeUserId:function(state,userId){
            state.userId = userId
        },
        changeCurrentMonitorVehicle(state,currentVin){
            state.currentMonitorVehicle = currentVin
        },
        addMonitorVehicles: function (state, row) {
            let existence = state.monitorVehicles.find(item =>
                item.vin == row.vin
            )
            if(!existence){
                state.monitorVehicles.push(row)
                state.currentMonitorVehicle = row
            }else{
                state.currentMonitorVehicle = row
            }
        },
        removeMonitorVehicles: function (state, vin) {
            let index = state.monitorVehicles.findIndex(item =>
                item.vin == vin
            )
            state.monitorVehicles.splice(index, 1)
            if(vin == state.currentMonitorVehicle.vin&&state.monitorVehicles.length!==0){
                state.currentMonitorVehicle = state.monitorVehicles[0]
            }
        },
        clearMonitorVehicles: function (state) {
            state.monitorVehicles = []
        }
    },
    actions: {

    },
    modules: {
        tagsStore
    },
    plugins: [createPersistedState()]
})
