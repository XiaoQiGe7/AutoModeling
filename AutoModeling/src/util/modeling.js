// import room from "../assets/test/room.json"
import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

// import storeys from "../assets/test/DS.json"


const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEdElEQVRIicWUz4uXVRTGn3Pufd/364w6zgyaGYYkQqFo+DNBagxyxEUbGRGk/oAIaSEVMuLbD8NSF2IGQSQtXKjYIjFt5ZfRRSBJComhC9GaNEHT+fH9vt9773laOBNqim6i590d7j2f5zz38AL/sWTF0S3LPFyiqmgBa10cmZAuDs8QUWdqZKTwKZw4/e4X1+69uOSzt6bLdawUL1RTIS25ORMH8zntDaugYsaI5Hzm8jc00w3WSkFa0HxmWzZ65vbk9McI4AH1Gey3cBhluQ71ugIAenqMP13+XJmttRhgEdCna8hntt2RFoICprUsk+D2a1LstmDRFdlUQrq15ifnCzpoo4E2nCzdakQX/Nql1wfXo16PqNfj0uuD613wa9OtRrThZDYamC/ooNb8ZEK6XZFNtWAxKXYLALx8/IP38iLfnpohCOGYqzS++x3hlyFKoUnFOZuIn7MZU1YAQBj865QO40VjSqzMZXMnyYTXn4G0jFRJrpZlrWb1/sDqrZ8qANGCe1Mz/OqKLKMIQSBf3g2ZqIrEzFKgr/zC1BzdyOboRl/5hZYCkZhJu2q+vBsgQBFq5rLUqM5qwb0AxAGQy9/UW7M2vHoN4DohAYNoRw42DXZ5BMicsEoGYgUb9gqHgsKJsmXIl3YjnzcFCISAACAA366/Vp4FIArcrdbXbDlsMR3TWq4gTIJJvqgTMrUAWyZwcLgd2nA7tMHBMZi46TXkizohwQSEaS1Xi+nYid6t344tG3V8XQEwKfsZ4h3xIkhmrt1LvqQTEJAgqCAVJAkImC+eAtfuBclMvAhDvJOU/WOjCACMA4gSenJ1eSbFtM9NyJUixkjm8zrEPdcmrAwCEYEIWwY3q02yFzqEkaSIuQm5ppj2nVxdnkGJf5IZBwBb71LNuV1xqHFF88yBMPHK2uIuSKHg2CeForakC5IpQZjmmYtDjSvm3C4AMtYL9wMERFnKQG//VXPYDlAEFEbCzZ7EbH4H2CLYIrL5HXCzJ5GREFAAijlsH+jtv4qylPHXHs/+fhEClNJzXH/0RbYkVTHBw/FmiyP7rwgAtG94ltKVCyKSK7yLVThdX20vASXvbX7/BPf9oUoz1U0kKlEBA6nTCsmWdTJb1kmdVggDKSIgUZnqJkhpD2v1b4DcffCBVfFUDOGAby9UFYFNQ7GwS4qFXcKmQVWCby9cDOHAwKp4CiX0QfcPj2g8JgF7fvjkeWE86bzvSiERMmaIMM2cWEx/UtzKeu/mC+N3Hj/BPVPUezdfIO0rOFURgCRIQgQQFWWyL+u9my88yv2jAQBQwgDIzRvDH6dGdV68cyJiImLinUvN1vmbfmgHABk7+1A9GnA3Cpx7c+dIUtkmXk0wtpNeLalsO9e7c+Thvp8UICD6+tyg3TgcG9URLbzXwvvYqI4M2o3D6Otzj4rmyQAAcHAuL63ZUyWX7bBolUWrkst2XFqzp8LBuY/x/6Tq63MA0HP0w30rv//o63trj5N/IsChQwkAhkbydx6s/e/6G2v2U2q+xYI8AAAAAElFTkSuQmCC"
let renderer, scene, camera ,controls;
let Cwidth = window.innerWidth / 2, Cheight = window.innerHeight / 2

let CStoreyHeight = 0
const extrudeSettings = {
  amount: 150, //?
  // curveSegments: 12, //整数。曲线上的点数。默认值为 12。
  // steps: 1, //诠释。用于沿拉伸样条线深度细分线段的点数。默认值为 1。
  // depth: 1, //浮动。挤出形状的深度。默认值为 1。
  bevelEnabled: false, //布尔值。对形状应用斜切。默认为真。
  // bevelThickness: 0, //浮动。斜面进入原始形状的深度。默认值为 0.2。
  // bevelSize: 10, //浮动。与斜面延伸的形状轮廓的距离。默认值为 bevelThickness - 0.1。
  // bevelOffset: 0, //浮动。与倒角开始的形状轮廓的距离。默认值为 0。
  // bevelSegments: 0, //整数。斜面层数。默认值为 3。
  // extrudePath:    //三曲线。应沿其拉伸形状的 3D 样条路径。路径拉伸不支持斜角。
  // UVGenerator:    //对象。提供 UV 生成器功能的对象
};
export function init(storeys) {
  const container = document.getElementById("container");

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  // 何为相机？https://threejs.org/examples/#webgl_camera
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.lookAt(new THREE.Vector3(0,0,0))
  camera.position.set(0, -1000, 500);
  createLight()

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  
  CStoreyHeight = 0
  createStorey(scene,storeys)

  // 轨道控制器：围绕 x y 轴旋转
  // 轨迹球：围绕 x z 轴旋转
  // https://threejs.org/docs/index.html#examples/zh/controls/OrbitControls
  controls = new TrackballControls(camera, renderer.domElement);
  // 
  controls.target.set( 0, 25, 0 );
  controls.update();

  // window.addEventListener('resize', onWindowResize);
}
function loadImg(){
  const texture = new THREE.TextureLoader().load(img,function (data) {
    let width = data.image.width || 20
    let height = data.image.height || 20
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  });
}
function createLight() {
  // 定向光
  // const directionalLight = new THREE.DirectionalLight(0xbbbbbb, 0.6);
  // directionalLight.position.set(0.75, 0.75, 1.0).normalize();
  // scene.add(directionalLight);
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

}
function createStorey(obj3D,storeys){
  const len = storeys.length
  const group = new THREE.Group()
  for(let s of storeys){
    const Vpoints = []
    const {points,storeyHeight,floorHeight,color} = s
    for (let item of points) {
      const v3 = new THREE.Vector2(item[0] - Cwidth, item[1] - Cheight)
      Vpoints.push(v3);
    }
    extrudeSettings.depth = floorHeight
    const storey = createMesh(Vpoints,{
      color: color,
      // opacity:0.5,
      // transparent: true,
    })
    storey.position.set(0,0,CStoreyHeight)
    createRoom(group,s.rooms,floorHeight)
    CStoreyHeight += parseInt(storeyHeight)
    group.add(storey)
  }
  obj3D.add(group)
}
function createRoom(obj3D,rooms,floorHeight) {
  const len = rooms.length;
  for(let r of rooms){
    const points = [];
    extrudeSettings.depth = r.roomHeight
    for (let item of r.points) points.push(new THREE.Vector2(item[0] - Cwidth, item[1] - Cheight))
    const room = createMesh(points,{color: r.color,});
    room.position.set(0,0,CStoreyHeight + floorHeight)
    obj3D.add(room)
  }
}

function createMesh(points,material) {
  const Shape = new THREE.Shape(points);
  // https://threejs.org/docs/index.html#api/zh/geometries/ExtrudeGeometry
  const geometry = new THREE.ExtrudeGeometry(Shape, extrudeSettings);
  // const newMaterial = new THREE.MeshBasicMaterial(material);
  const newMaterial = new THREE.MeshLambertMaterial(material);
  const mesh = new THREE.Mesh(geometry, newMaterial);
  return mesh
}
export function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}