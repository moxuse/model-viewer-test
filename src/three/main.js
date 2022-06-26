import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const MAXLEN = 300

const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
camera.position.set(10, 7, 15)
camera.lookAt(new THREE.Vector3(0, 0, 0))

const ambientlight = new THREE.AmbientLight(0xFFFFFF, 0.5)
const directlight = new THREE.DirectionalLight(0xFFFFFF, 1, 100)
ambientlight.position.set(0, 30, 0)
directlight.position.set(-2, 20, 20)
directlight.castShadow = true
directlight.shadow.mapSize.width = 2048
directlight.shadow.mapSize.height = 2048
directlight.shadow.camera.position.set(0, 100, 0);
directlight.shadow.camera.left   = -30;
directlight.shadow.camera.right  = 30;
directlight.shadow.camera.top    = 30;
directlight.shadow.camera.bottom = -30;

// debug
const lightHelper = new THREE.DirectionalLightHelper(directlight)

const geometry = new THREE.BoxGeometry(10, 200, MAXLEN)
const floorMaterial = new THREE.MeshLambertMaterial({
  color: 0xF8F8F8
})
const floor = new THREE.Mesh(geometry, floorMaterial)
floor.position.y = -99.95
floor.receiveShadow = true
floor.castShadow = true

const gltfloader = new GLTFLoader()
const clock = new THREE.Clock()
export {
  scene,
  floor,
  camera,
  renderer,
  ambientlight,
  directlight,
  lightHelper,
  gltfloader,
  clock,
}