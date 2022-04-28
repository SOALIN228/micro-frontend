<template>
  <Header v-show="headerStatus"/>
  <MainNav v-show="navStatus"/>
  <div class="sub-container">
    <Loading v-show="loading"/>
    <div v-show="!loading" id="micro-container">子应用内容</div>
  </div>
  <Footer/>
</template>

<script>
import { defineComponent } from 'vue'
import Header from './components/Header'
import MainNav from '@/components/MainNav'
import Loading from '@/components/Loading'
import Footer from '@/components/Footer'
import { loading, header, nav } from './store'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    MainNav,
    Loading,
    Footer
  },
  setup () {
    return {
      loading: loading.loadingStatus,
      headerStatus: header.headerStatus,
      navStatus: nav.navStatus,
    }
  }
})
</script>

<style lang="scss">
html, body, #micro_web_main_app {
  width: 100%;
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.sub-container {
  min-height: 100%;
  position: relative;
}

#micro-container {
  min-height: 100%;
  width: 100%;
}
</style>
