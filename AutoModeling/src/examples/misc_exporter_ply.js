import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import storeys from "../assets/test/DS.json"
const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEdElEQVRIicWUz4uXVRTGn3Pufd/364w6zgyaGYYkQqFo+DNBagxyxEUbGRGk/oAIaSEVMuLbD8NSF2IGQSQtXKjYIjFt5ZfRRSBJComhC9GaNEHT+fH9vt9773laOBNqim6i590d7j2f5zz38AL/sWTF0S3LPFyiqmgBa10cmZAuDs8QUWdqZKTwKZw4/e4X1+69uOSzt6bLdawUL1RTIS25ORMH8zntDaugYsaI5Hzm8jc00w3WSkFa0HxmWzZ65vbk9McI4AH1Gey3cBhluQ71ugIAenqMP13+XJmttRhgEdCna8hntt2RFoICprUsk+D2a1LstmDRFdlUQrq15ifnCzpoo4E2nCzdakQX/Nql1wfXo16PqNfj0uuD613wa9OtRrThZDYamC/ooNb8ZEK6XZFNtWAxKXYLALx8/IP38iLfnpohCOGYqzS++x3hlyFKoUnFOZuIn7MZU1YAQBj865QO40VjSqzMZXMnyYTXn4G0jFRJrpZlrWb1/sDqrZ8qANGCe1Mz/OqKLKMIQSBf3g2ZqIrEzFKgr/zC1BzdyOboRl/5hZYCkZhJu2q+vBsgQBFq5rLUqM5qwb0AxAGQy9/UW7M2vHoN4DohAYNoRw42DXZ5BMicsEoGYgUb9gqHgsKJsmXIl3YjnzcFCISAACAA366/Vp4FIArcrdbXbDlsMR3TWq4gTIJJvqgTMrUAWyZwcLgd2nA7tMHBMZi46TXkizohwQSEaS1Xi+nYid6t344tG3V8XQEwKfsZ4h3xIkhmrt1LvqQTEJAgqCAVJAkImC+eAtfuBclMvAhDvJOU/WOjCACMA4gSenJ1eSbFtM9NyJUixkjm8zrEPdcmrAwCEYEIWwY3q02yFzqEkaSIuQm5ppj2nVxdnkGJf5IZBwBb71LNuV1xqHFF88yBMPHK2uIuSKHg2CeForakC5IpQZjmmYtDjSvm3C4AMtYL9wMERFnKQG//VXPYDlAEFEbCzZ7EbH4H2CLYIrL5HXCzJ5GREFAAijlsH+jtv4qylPHXHs/+fhEClNJzXH/0RbYkVTHBw/FmiyP7rwgAtG94ltKVCyKSK7yLVThdX20vASXvbX7/BPf9oUoz1U0kKlEBA6nTCsmWdTJb1kmdVggDKSIgUZnqJkhpD2v1b4DcffCBVfFUDOGAby9UFYFNQ7GwS4qFXcKmQVWCby9cDOHAwKp4CiX0QfcPj2g8JgF7fvjkeWE86bzvSiERMmaIMM2cWEx/UtzKeu/mC+N3Hj/BPVPUezdfIO0rOFURgCRIQgQQFWWyL+u9my88yv2jAQBQwgDIzRvDH6dGdV68cyJiImLinUvN1vmbfmgHABk7+1A9GnA3Cpx7c+dIUtkmXk0wtpNeLalsO9e7c+Thvp8UICD6+tyg3TgcG9URLbzXwvvYqI4M2o3D6Otzj4rmyQAAcHAuL63ZUyWX7bBolUWrkst2XFqzp8LBuY/x/6Tq63MA0HP0w30rv//o63trj5N/IsChQwkAhkbydx6s/e/6G2v2U2q+xYI8AAAAAElFTkSuQmCC"

// 彩色的方块
let scene, camera, renderer, controls;
// let renderer, scene, camera ,controls;
let storeyHeight = 300,floorHeight = 10,roomHeight = 100
const config = {
  storeyHeight:300,
  floorHeight:10,
  roomHeight:100,
}
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
// init();
// animate();

export function init() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.lookAt(new THREE.Vector3(0,0,0))
    camera.position.set( 200, 100, 3000 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );


    createStorey(scene)
    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );

    //

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 25, 0 );
    controls.update();
    controls.target = new THREE.Vector3(0, 0, 0);//控制焦点
    controls.autoRotate = false;//将自动旋转关闭
    controls.maxPolarAngle = Math.PI/2; //  Float 垂直旋转，范围0~Math.PI 默认Math.PI
    controls.minPolarAngle = 0; // Float 垂直旋转，范围0~Math.PI 默认0
    controls.panSpeed = 0.5; // float 移动的速度，默认1
    controls.rotateSpeed  = 0.5; //Float 旋转速度(ORBIT的旋转速度，鼠标左键)，默认1
    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

export function animate() {

    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}
function createStorey(obj3D){
    const points = []
    const len = storeys.length
    const group = new THREE.Group()
    for(let i = 0;i < len;i ++){
      for (let item of storeys[i].points) {
        const v3 = new THREE.Vector2(item[0], item[1])
        points.push(v3);
      }
      // extrudeSettings.depth = floorHeight
      const storey = createMesh(points,{
        color: storeys[i].color,
        opacity:0.5,
        transparent: true,
      })
      storey.position.set(0,0,i * storeyHeight)
      createRoom(group,storeys[i].rooms)
      group.add(storey)
    }
      obj3D.add(group)
  }
  function createRoom(obj3D,rooms) {
    const len = rooms.length;
    // extrudeSettings.depth = roomHeight
    for (let i = 0; i < len; i++) {
      const points = [];
      for (let item of rooms[i].points) {
        points.push(new THREE.Vector2(item[0], item[1]));
      }
      const room = createMesh(points,{
      color: rooms[i].color,
      // transparent: true,
    });
    room.position.set(0,0,(i * storeyHeight) + floorHeight)
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
// const link = document.createElement( 'a' );
// link.style.display = 'none';
// document.body.appendChild( link );

// function save( blob, filename ) {

//     link.href = URL.createObjectURL( blob );
//     link.download = filename;
//     link.click();

// }

// function saveString( text, filename ) {

//     save( new Blob( [ text ], { type: 'text/plain' } ), filename );

// }

// function saveArrayBuffer( buffer, filename ) {

//     save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

// }