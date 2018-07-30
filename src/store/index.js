import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        user:null,
        loading:false,
        error:null,
        radioGroup:null,
        tabDatas: [
            {
                desc: 'pertol Bills description', title: 'pertol',
                bills: [
                    {
                        value: false,
                        slNo: 0,
                        billNo: '#1253-petrol',
                        date: '25/07/2018',
                        amount: '2500',
                        remarks: 'no remarks',
                        attachment: 'download',
                    },
                    {
                        value: false,
                        slNo: 0,
                        billNo: '#1254',
                        date: '26/07/2018',
                        amount: '3500',
                        remarks: 'no remarks yet',
                        attachment: 'download'
                    },
                ],
                subTotal: { text: 'Sub Total', amount: '1523' }
            },
            {
                desc: 'Entertain Bills description', title: 'Entertain',
                bills: [
                    {
                        value: false,
                        slNo: 0,
                        billNo: '#1253-entertain',
                        date: '25/07/2018',
                        amount: '2501',
                        remarks: 'no remarks',
                        attachment: 'download',
                    },
                    {
                        value: false,
                        slNo: 0,
                        billNo: '#1254',
                        date: '26/07/2018',
                        amount: '3501',
                        remarks: 'no remarks yet',
                        attachment: 'download'
                    },
                ],
                subTotal: { text: 'Sub Total', amount: '2623' }
            },
            {
                desc: 'uniform Bills description', title: 'uniform',
                bills: [
                    {
                        value: false,
                        slNo: 0,
                        billNo: '#1253-uniform',
                        date: '25/07/2018',
                        amount: '2502',
                        remarks: 'no remarks',
                        attachment: 'download',
                    },
                    {
                        value: false,
                        slNo: 0,
                        billNo: '#1254',
                        date: '26/07/2018',
                        amount: '3502',
                        remarks: 'no remarks yet',
                        attachment: 'download'
                    },
                ],
                subTotal: { text: 'Sub Total', amount: '2624' }
            },
            {
                desc: 'Vehicle Bills description', title: 'Vehicle',
                bills: [
                    {
                        value: false,
                        slNo: 0,
                        billNo: '#1253-vehicle',
                        date: '25/07/2018',
                        amount: '2503',
                        remarks: 'no remarks',
                        attachment: 'download',
                    },
                    {
                        value: false,
                        slNo: 0,
                        billNo: '#1254',
                        date: '26/07/2018',
                        amount: '3503',
                        remarks: 'no remarks yet',
                        attachment: 'download'
                    },
                ],
                subTotal: { text: 'Sub Total', amount: '2625' }
            },
            {
                desc: 'Mobile Bills description', title: 'Mobile',
                bills: [
                    {
                        value: false,
                        slNo: 0,
                        billNo: '#1253-mob',
                        date: '25/07/2018',
                        amount: '2504',
                        remarks: 'no remarks',
                        attachment: 'download',
                    },
                    {
                        value: false,
                        slNo: 0,
                        billNo: '#1254',
                        date: '26/07/2018',
                        amount: '3504',
                        remarks: 'no remarks yet',
                        attachment: 'download'
                    },
                ],
                subTotal: { text: 'Sub Total', amount: '2626' }
            },
        ],
    },
    mutations:{
        setUser(state,payload){
            state.user = payload
        },
        setLoading(state,payload){
            state.loading = payload
        },
        setError(state,payload){
            state.error = payload
        },
        clearError(state){
            state.error = null
        },
        radioGroup(state, payload) {
            state.radioGroup = payload
        },
        tabDatas(state, payload) {
            console.log(state.radioGroup)
            state.tabDatas[parseInt(state.radioGroup)].bills.push(payload)
        },
        tabDatas(state,payload){
            console.log(state.radioGroup)
            state.tabDatas[parseInt(state.radioGroup)].bills.push(payload)
        },
        
    },
    actions:{
        signUserUp({commit},payload){
            commit('setLoading',true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id:user.uid
                    }
                    commit('setUser', newUser)
                }
            )
            .catch(
                error =>{
                    commit('setLoading', false)
                    commit('setError',error)
                    console.log(error)
                }
            )
        },
        signUserIn({commit},payload){
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
            .then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid
                    }
                    commit('setUser', newUser)
                }
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                }
            )
        },
        autoSignIn({commit},payload){
            commit('setUser',{id:payload.uid})
        },
        logout({commit}){
            firebase.auth().signOut()
            commit('setUser',null)
        },
        clearError({commit}) {
            commit('clearError')
        },
        radioGroup({commit}, payload) {
            const setIndex = payload
            commit('radioGroup',setIndex)
        },
        loadTabDatas({commit}){
            firebase.database().ref('tabDatas').once('value')
                .then((data)=>{
                    const bills = []
                    const obj = data.val()
                    for(let key in obj){
                        bills.push({
                            id:key,
                            billNo: obj[key].billNo,
                            date: obj[key].date,
                            amount: obj[key].amount,
                            remarks: obj[key].remarks,
                            attachment: obj[key].attachment,
                        })
                    }
                    commit('setLoadedBills',bills)
                })
                .catch((error) =>{
                    console.log(error)
                })
        },
        tabDatas({commit},payload){
            const billData = {
                billNo: payload.billNo,
                date: payload.date,
                amount: payload.amount,
                remarks: payload.remarks,
                attachment: payload.attachment,
            }
            firebase.database().ref('tabDatas').push({ bills: billData})
                .then((data) =>{
                    const key = data.key
                    console.log(data)
                    commit('tabDatas',{
                        ...billData,
                        id: key
                    })
                })
                .catch((error) =>{
                    console.log(error)
                })
            // firebase need to add here
            //commit('tabDatas',billData)
        }
    },
    getters:{
        user(state){
            return state.user
        },
        loading(state){
            return state.loading
        },
        error(state){
            return state.error
        },
        radioGroup(state){
            return state.radioGroup
        },
        tabDatas(state){
            return state.tabDatas
        }
    }
})