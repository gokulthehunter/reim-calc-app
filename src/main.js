import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import * as firebase from 'firebase'
import {Vuetify,VApp,VNavigationDrawer,VFooter,VList,VBtn,VIcon,VGrid,vForm,VSelect,
  VCheckbox,VTextField,Vcard,VAlert,VToolbar,VDataTable,VTabs,VDialog,VDivider,transitions,vRadioGroup
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import AlertCmp from './components/common/Alert.vue'
Vue.use(Vuetify, {
  components: {VApp,VNavigationDrawer,VFooter,VList,VBtn,VIcon,VGrid,vForm,VSelect,VCheckbox,VTextField,Vcard,VAlert,VToolbar,VTabs,
    VDataTable,VDialog,VDivider,transitions,vRadioGroup
  }
})

Vue.component('app-alert', AlertCmp)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: 'AIzaSyD5QRK_LzcYGI3A5xujacS8crd7ZDq0bZ8',
      authDomain: 'reim-calc-app.firebaseapp.com',
      databaseURL: 'https://reim-calc-app.firebaseio.com',
      projectId: 'reim-calc-app',
      storageBucket: 'reim-calc-app.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        this.$store.dispatch('autoSignIn',user)
      }
    })
  }
})
