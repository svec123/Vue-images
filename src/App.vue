<template>
  <div id="app">
    <InputGallery/>
    <ListGallery/> 
  </div>
</template>

<script>


 
// import InputGallery from './components/InputGallery.vue' 
// import ListGallery from './components/ListGallery.vue' 

export default {
  name: 'App',
  components: { 
    // InputGallery,
    // ListGallery
    ListGallery: () => import('./components/ListGallery.vue'),
    InputGallery: () => import('./components/InputGallery.vue')
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
