import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { makeCube } from './cube';
// import { canopy } from './canopy';
import { initCanopy } from './canopy2';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const entryElement = document.querySelector('.wrapper');
entryElement.appendChild(renderer.domElement);

camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 5;

const controls = new OrbitControls(camera, renderer.domElement);

function sceneCreator () {
    
    const bg = new THREE.Color(0x87CEEB);
    scene.background = bg;
    
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    
    const gridHelper = new THREE.GridHelper(10, 10, 0x0000ff, 0x808080);
    scene.add(gridHelper);
    
    const axesHelper = new THREE.AxesHelper(7);
    scene.add(axesHelper);   
};
sceneCreator();

const parameters = {
    width: 3,
    height: 2,
    depth: 5
};

// const {cube, geometry, material} = makeCube(parameters);
// scene.add(cube);

const sizeForm = document.querySelector('#dimensions-form');

sizeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(sizeForm);
    parameters.width = Number(formData.get('width'));
    parameters.height = Number(formData.get('height'));
    parameters.depth = Number(formData.get('depth'));

    // const { geometry: newGeometry} = makeCube(parameters); // making new geometry

    // scene.remove(cube); 
    // geometry.dispose(); // clearing up memory

    // cube.geometry = newGeometry;
    // scene.add(cube);
    scene.clear();
    sceneCreator();
    initCanopy(scene, parameters);
});
initCanopy(scene, parameters);  

function animate () {
    renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);
