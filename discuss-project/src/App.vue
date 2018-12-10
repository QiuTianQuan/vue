<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
    <Mynav/>
  </div>
</template>

<script>
import Mynav from '@/components/mynav'
export default {
  components: {Mynav},
  name: 'App',
  provide(){
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
         this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
  #app {
    height: 100vh;
    width: 100vw;
    background-color: rgb(231, 211, 211);
    overflow: hidden;
    overflow-y: scroll;
  }

  body{
    margin: 0;
  }

  .mint-tabbar > .mint-tab-item.is-selected {
    color: #b17275;
  }
</style>
