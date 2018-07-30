<template>
  <v-app id="inspire">
    <common-header></common-header>
    <router-view></router-view>
    <common-footer></common-footer>
  </v-app>
</template>

<script>
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
export default {
  components:{
    'common-header':Header,
    'common-footer':Footer
  },
  data () {
    return {}
  },
  name: 'App'
}
</script>
