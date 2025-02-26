import * as THREE from 'three';



export function makeCube (parameters) {
    const geometry = new THREE.BoxGeometry(parameters.width, parameters.height, parameters.depth);
    const material = new THREE.MeshBasicMaterial({ color: 0xd3d3d3 });
    const cube = new THREE.Mesh(geometry, material);
    return {cube, geometry, material};
}