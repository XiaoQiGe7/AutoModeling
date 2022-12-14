import * as THREE from 'three';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
// 坐标系
let camera, scene, renderer;

let scene2, renderer2;

let controls;

// init();
// animate();

export function init() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 200, 200, 200 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    scene2 = new THREE.Scene();

    const material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide } );

    //

    for ( let i = 0; i < 6; i ++ ) {

        const element = document.createElement( 'div' );
        element.style.width = '100px';
        element.style.height = '100px';
        element.style.opacity = 0.5;
        element.style.background = new THREE.Color( Math.random() * 0xffffff ).getStyle();

        const object = new CSS3DObject( element );
        object.position.x = Math.random() * 200 - 100;
        object.position.y = Math.random() * 200 - 100;
        object.position.z = Math.random() * 200 - 100;
        object.rotation.x = Math.random();
        object.rotation.y = Math.random();
        object.rotation.z = Math.random();
        object.scale.x = Math.random() + 0.5;
        object.scale.y = Math.random() + 0.5;
        scene2.add( object );

        const geometry = new THREE.PlaneGeometry( 100, 100 );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.copy( object.position );
        mesh.rotation.copy( object.rotation );
        mesh.scale.copy( object.scale );
        scene.add( mesh );

    }

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    renderer2 = new CSS3DRenderer();
    renderer2.setSize( window.innerWidth, window.innerHeight );
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    document.body.appendChild( renderer2.domElement );
    // 轨迹球，可以没有死角的转动相机
    controls = new TrackballControls( camera, renderer2.domElement );

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer2.setSize( window.innerWidth, window.innerHeight );

}

export function animate() {

    requestAnimationFrame( animate );

    controls.update();

    renderer.render( scene, camera );
    renderer2.render( scene2, camera );

}