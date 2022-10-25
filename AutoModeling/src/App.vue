<script setup>
import { nextTick, reactive, ref } from "vue";
import Edit from "./edit.vue"
// FPS
// import Stats from "three/addons/libs/stats.module.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// import { init, animate } from "./util/modeling.js";
// import {init, animate} from "./examples/css3d_sandbox.js"
// import {init, animate} from "./examples/misc_exporter_stl.js"
// import {init, animate} from "./examples/misc_exporter_ply.js"
let cxt = null;
const points = [];
// const storeys = ref([]);
// nextTick(function () {
//   init();
//   animate();
//   // getCanvas();
// });
function getCanvas() {
  const c = document.getElementById("myCanvas");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  cxt = c.getContext("2d");
}
function clickCanvas(e) {
  // cxt.value.clearRect(0,0,window.innerWidth,window.innerHeight)
  points.push([e.clientX, e.clientY]);
  cxt.fillStyle = "#FF0000";
  cxt.lineWidth = 2;
  cxt.moveTo(0, 0);
  for (let i = 0; i < points.length; i++) {
    cxt.lineTo(points[i][0], points[i][1]);
  }
  cxt.stroke();
  console.log(points);
  // cxt.value.moveTo(10, 10);
  // cxt.value.lineTo(150, 50);
  // cxt.value.lineTo(10, 50);
  // cxt.value.stroke();
  // console.log(e.x,e.y)
}
</script>

<template>
  <div id="Map">
    <!-- <div id="container"></div> -->
    <Edit />
    <!-- <canvas id="myCanvas" @click="clickCanvas"></canvas> -->
  </div>
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
