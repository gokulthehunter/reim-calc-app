<template>
<div>
  <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile v-for="nav in navs" :key="nav.title" :to="nav.path" @click.stop="toggSide">
          <v-list-tile-action>
            <v-icon>{{nav.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{nav.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- logout -->
        <v-list-tile v-if="isUserAuth" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
  </v-navigation-drawer>
  <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">App</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-for="nav in navs" :key="nav.title">
        <v-btn flat :to="nav.path">
          <v-icon>{{nav.icon}}</v-icon>
          {{nav.title}}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down" v-if="isUserAuth" @click="onLogout">
        <v-btn flat >
          <v-icon>exit_to_app</v-icon>
          Log Out
        </v-btn>
      </v-toolbar-items>
  </v-toolbar>
</div>
</template>
<script>
export default {
  data(){
    return{
      drawer: false,
      //navs: []
    }
  },
  computed:{
    navs(){
      let navs = [
        { icon: 'perm_identity', title: 'Sign In', path:'/signin' }, //settings_power  --> to log out
        { icon: 'lock', title: 'Sign Up', path:'/signup'},
      ]
      if(this.isUserAuth){
        navs = [
          { icon: 'dashboard', title: 'Dashboard', path:'/dashboard' }, //settings_power  --> to log out
          { icon: 'lock_open', title: 'Profile',path:'/profile'},
          //{ icon: 'lock', title: 'Sign Up', path:'/signup'},
          //{ icon: 'perm_identity', title: 'Sign In', path:'/signin' }, //settings_power  --> to log out
        ]
      }
      return navs
    },
    isUserAuth(){
      return this.$store.getters.user !== null && this.$store.getters.user !==undefined
    }
  },
  methods:{
    toggSide(){
      this.drawer = false
    },
    onLogout(){
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
