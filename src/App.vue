<template>
  <h1>Model Viewer Test</h1>
  <ModelList msg=""/>
</template>

<script>
import ModelList from './components/ModelList.vue'

export default {
  name: 'App',
  components: {
    ModelList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0 40px 0 40px;
}
</style>
