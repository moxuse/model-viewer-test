<template>
  <div ref="stage" class="stage">
    <!-- Status -->
    <button @click="onClose" class="close-btn">
      CLOSE
    </button>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, toRefs } from "vue";
import { GridHelper, PerspectiveCamera, Scene, WebGLRenderer, AmbientLight, DirectionalLight, PCFSoftShadowMap } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default defineComponent({
  setup(props, { emit }) {
    const { modelPath } = toRefs(props)
    // 描画するDOMの指定
    const stage = ref();
    // Three.js
    const scene = new Scene();
    const camera = new PerspectiveCamera();
    const renderer = new WebGLRenderer();
    const controls =  new OrbitControls( camera, renderer.domElement );

    // 初期化
    const init = () => {
      if (stage.value instanceof HTMLElement) {
        // DOMのサイズを取得
        const { clientWidth, clientHeight } = stage.value;
        // 背景のグリッドの追加
        const grid =  new GridHelper();
        grid.position.set(0, -0.25 ,0);
        scene.add(grid);

        //ライト
        const ambientlight = new AmbientLight(0xFFFFFF, 0.8)
        const directlight = new DirectionalLight(0xFFFFFF, 1, 100)
        ambientlight.position.set(0, 30, 0)
        directlight.position.set(-2, 20, -20)
        directlight.castShadow = true
        directlight.shadow.mapSize.width = 2048
        directlight.shadow.mapSize.height = 2048
        directlight.shadow.camera.position.set(0, 100, 0);
        directlight.shadow.camera.left   = -30;
        directlight.shadow.camera.right  = 30;
        directlight.shadow.camera.top    = 30;
        directlight.shadow.camera.bottom = -30;
        scene.add(ambientlight);
        scene.add(directlight);
        // カメラの設定
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        camera.position.set(-2, 2, 2);
        camera.lookAt(0, 0, 0);
        // rendererの設定
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = PCFSoftShadowMap
        stage.value.appendChild(renderer.domElement);

        controls.minDistance = 1.125;
        controls.maxDistance = 2.0;
        controls.minPolarAngle = 0;
        // controls.maxPolarAngle = Math.PI;
        controls.maxPolarAngle = Math.PI/2; 
        controls.update()
        // 描画
        animate();
      }
    };
    // 描画
    const animate = () => {
      const frame = () => {
        // 描画
        renderer.render(scene, camera);
        renderer.setClearColor(0x888888);
        // 画面を更新
        requestAnimationFrame(frame);

        controls.update()
      };
      frame();
    };

    const loadModel = (path) => {
      const loader = new GLTFLoader();
      loader.load(path, (obj) => {        
        console.log(obj)
        obj.scene.position.set(0, -0.25, 0);
        scene.add(obj.scene);
      },
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      function ( error ) {
        console.error( error );
      })
    }

    // マウント時に初期化して描画
    onMounted(() => {
      init();
      if (modelPath.value) {
        loadModel(modelPath.value);
      }
    });

    const onClose = () => {
      console.log("HOED++++",emit)
      emit('close');
    }

    return {
      stage,
      onClose,
    };
  },
  props: ['modelPath'],
});
</script>

<style scoped>
.stage {
  position: relative;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-color: #888;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -998;
  height: 100%;
  width: 100%;
}
.close-btn {
  position: fixed;
  top: 80px;
  right: 80px;
}
</style>