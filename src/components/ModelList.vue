<template>
  <div class="model-list">
    <h1>{{ msg }}</h1>
    <p>
    </p>
    <h3>Collection</h3>
    <ul class="model-list-items">      
      <li class="model-list-item">
        <div @click="showModel('/models/3Ddata.glb')">
          <img src="/images/2022_06_26-11_00_11.jpg">
        </div>
        <div @click="showModel('/models/3Ddata2.glb')">
          <img src="/images/2022_06_26-12_40_24.jpg">
        </div>
      </li>
    </ul>
  </div>
  <div v-if="showModal" class="modal">
    <ModelViewer :modelPath="currentModel" @close="hideModal" />
  </div>
</template>


<script>
import ModelViewer from './ModelViewer.vue';

export default {
  name: 'ModelList',
  components: {
    ModelViewer,
  },
  props: {
    msg: String
  },
  data() {
    return {  
      showModal: false,
      currentModel: '',
    }
  },
  methods: {
    showModel(model) {
      this.showModal = true;
      this.currentModel = model;
      console.log(model, this.showModal);

      return this.showModal;
    },
    hideModal() {
      this.showModal = false;
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.model-list {
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.9;
}
.model-list-item img {
  width: 240px;
}
</style>
