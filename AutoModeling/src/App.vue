<script setup lang="ts">
import * as THREE from "three";
// FPS
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import room from "./assets/testData/room.json"
let renderer, stats, scene, camera;
let VX = 30,
  VY = 10;
function init() {
  const container = document.getElementById("container");

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  camera = new THREE.PerspectiveCamera(
    500,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 10, 1000);
  // createLight()
  // 坐标系

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  createPoint()
  // // 拉伸配置

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 100;
  controls.maxDistance = 1000;

  // window.addEventListener('resize', onWindowResize);
}
function createLight(){
  // 定向光
  const directionalLight = new THREE.DirectionalLight(0xf9f9f9, 0.6);
  directionalLight.position.set(0.75, 0.75, 1.0).normalize();
  scene.add(directionalLight);
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
  scene.add(ambientLight);

}
function createPoint(){
  const len = room.room.length
  for (let i = 0; i < len; i++) {
    const points = [];
    for(let item of room.room[i]){
      points.push(new THREE.Vector2(item[0],item[1]))
    }
    createMesh(points);
  }
}
const extrudeSettings = {
  // amount: 10, //?
  curveSegments: 12, //整数。曲线上的点数。默认值为 12。
  steps: 2, //诠释。用于沿拉伸样条线深度细分线段的点数。默认值为 1。
  depth: 100, //浮动。挤出形状的深度。默认值为 1。
  bevelEnabled: false, //布尔值。对形状应用斜切。默认为真。
  bevelThickness: 0, //浮动。斜面进入原始形状的深度。默认值为 0.2。
  bevelSize: 0, //浮动。与斜面延伸的形状轮廓的距离。默认值为 bevelThickness - 0.1。
  bevelOffset: 0, //浮动。与倒角开始的形状轮廓的距离。默认值为 0。
  bevelSegments: 0, //整数。斜面层数。默认值为 3。
  // extrudePath:    //三曲线。应沿其拉伸形状的 3D 样条路径。路径拉伸不支持斜角。
  // UVGenerator:    //对象。提供 UV 生成器功能的对象
};
function createMesh(points) {
  console.log(points)
  const Shape = new THREE.Shape(points);
  const geometry = new THREE.ExtrudeGeometry(Shape, extrudeSettings);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    // transparent: true,
    // wireframe:true
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}
init();
animate();
</script>

<template>
<div id="Map"></div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
