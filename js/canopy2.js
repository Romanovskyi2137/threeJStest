import { getModels } from './getModels';
import * as THREE from 'three';

// const {
//     Lodge_20x190x1000_bevel,
//     Lodge_20x200x1000,
//     balk_150x150x1000,
//     balk_150x150x2200,
//     balk_corner,
//     lodge_150x50x200,
//     lodge__150x50x1000,
//     profile_canopy_perimeter_closed,
//     roof_edge_1m,
//     roof_edge_1m2,
//     roof_edge_corner,
//     roof_edge_corner2,
//     ruberoid_1000x1000x2
// } = await getModels(modelsPath);   

function createMainSupportBalks(scene, params, models) {
    const { width, height, depth } = params;
    const { balk_150x150x2200 } = models;
    const positions = [
        { x: -width / 2, z: -depth / 2 },
        { x: width / 2, z: -depth / 2 },
        { x: -width / 2, z: depth / 2 },
        { x: width / 2, z: depth / 2 }
    ];
    const balkGroup = new THREE.Group();
    positions.forEach((pos) => {
        const balk = balk_150x150x2200.clone();
        balk.scale.y = height / 2.2;
        balk.position.set(pos.x, 0, pos.z);
        balkGroup.add(balk);
    });
    scene.add(balkGroup);
};
function createAdditionalSupportBalks(scene, params,  models) {
    const { width, height, depth } = params;
    const { balk_150x150x2200, balk_corner } = models;
    const box = new THREE.Box3().setFromObject(balk_corner);
    const cornerBalkY = height - box.min.y - (box.max.y - box.min.y);
    const mainPositions = [
        { x: width / 2, z: 0 },
        { x: -width / 2, z: 0 }
    ];
    const cornerPositions = [
        { x: width / 2, z: 0, rotationY: Math.PI / 2 },
        { x: width / 2, z: 0, rotationY: Math.PI / -2 },
        { x: -width / 2, z: 0, rotationY: Math.PI / 2 },
        { x: -width / 2, z: 0, rotationY: Math.PI / -2 },
    ];
    const supportBalksGroup = new THREE.Group();
    mainPositions.forEach((pos) => {
        const balk = balk_150x150x2200.clone();
        balk.position.set(pos.x, 0, pos.z);
        balk.scale.y = height / 2.2;
        supportBalksGroup.add(balk);
    });
    cornerPositions.forEach((pos) => {
        const cornerBalk = balk_corner.clone();
        cornerBalk.rotation.y = pos.rotationY || 0;
        cornerBalk.position.set(pos.x, cornerBalkY, pos.z);
        supportBalksGroup.add(cornerBalk);
    });
    scene.add(supportBalksGroup);
};
function createHorizontalBalks(scene, params, models) {
    const { width, height, depth } = params;
    const { balk_150x150x1000 } = models;
    const length1 = width + 0.150;
    const length2 = depth - 0.075;
    const cornerPositions = [
        { x: -width / 2 - 0.075, z: -depth / 2, rotationY: 0, scaleX: length1 },
        { x: -width / 2 - 0.075, z: depth / 2, rotationY: 0, scaleX: length1 },
        { x: -width / 2, z: depth / 2 - 0.075, rotationY: Math.PI / 2, scaleX: length2 }, 
        { x: width / 2, z: depth / 2 - 0.075, rotationY: Math.PI / 2, scaleX: length2 }
    ];

    const horizontalGroup = new THREE.Group();

    cornerPositions.forEach((pos) => {
        const cornerBeam = balk_150x150x1000.clone();
        cornerBeam.position.set(pos.x, height, pos.z);
        cornerBeam.rotation.y = pos.rotationY;
        cornerBeam.scale.x = pos.scaleX || 1;
        horizontalGroup.add(cornerBeam);
    });

    scene.add(horizontalGroup);
};
function createCornerBalks(scene, params, models) {
    const { width, height, depth } = params;
    const { balk_corner } = models;
    const box = new THREE.Box3().setFromObject(balk_corner);
    const balkY = height - box.min.y - (box.max.y - box.min.y);
    const positions = [
        { x: -width / 2, z: -depth / 2 },
        { x: -width / 2, z: depth / 2 },
        { x: width / 2, z: -depth / 2, rotationY: Math.PI },
        { x: width / 2, z: depth / 2, rotationY: Math.PI },
        { x: -width / 2, z: -depth / 2, rotationY: Math.PI / -2 },
        { x: width / 2, z: -depth / 2, rotationY: Math.PI / -2 },
        { x: -width / 2, z: depth / 2, rotationY: Math.PI / 2 },
        { x: width / 2, z: depth / 2, rotationY: Math.PI / 2 }
    ];
    const cornerGroup = new THREE.Group();
    positions.forEach((pos) => {
        const cornerBalk = balk_corner.clone();
        cornerBalk.position.set(pos.x, balkY, pos.z);
        cornerBalk.rotation.y = pos.rotationY || 0;
        cornerGroup.add(cornerBalk);
    });

    scene.add(cornerGroup);
};
// function createFrieze (scene, params, models) {
//     const lowerFriezeLength1 = 3 + 0.150 + 0.180 * 2 + 0.04;
//     const lowerFriezeLength2 = 5 + 0.150 + 0.180 * 2 - 0.04;
//     const lowerPositions = [
//         { x: lowerFriezeLength1 / 2, z: lowerFriezeLength2 / 2, rotationY: Math.PI / 2, scaleX: lowerFriezeLength2 },
//         { x: -(lowerFriezeLength1 / 2), z: lowerFriezeLength2 / 2, rotationY: Math.PI / 2, scaleX: lowerFriezeLength2 },
//         { x: -(lowerFriezeLength1 / 2), z: -(lowerFriezeLength2 / 2), rotationY: 0, scaleX: lowerFriezeLength1 },
//         { x: -(lowerFriezeLength1 / 2), z: lowerFriezeLength2 / 2, rotationY: 0, scaleX: lowerFriezeLength1 }, 
//     ];
//     const upperPositions = [];
//     const friezeGroup = new THREE.Group();
//     lowerPositions.forEach((pos) => {
//         const frieze = Lodge_20x200x1000.clone();
//         frieze.position.set(pos.x, 2.3, pos.z);
//         frieze.rotation.y = pos.rotationY || 0;
//         frieze.scale.x = pos.scaleX || 0;
//         friezeGroup.add(frieze);
//     });
//     scene.add(friezeGroup);
// }

function canopy(scene, params, models) {
    createMainSupportBalks(scene, params, models);
    if (params.depth > 3) {
        createAdditionalSupportBalks(scene, params, models);
    };
    createHorizontalBalks(scene, params, models);
    createCornerBalks(scene, params, models);
    // createFrieze(scene, params);
};

const modelsPath = '../assets/glb/Canopy_Models.glb';

async function loadModelsAndInit (scene, params) {
    const models = await getModels(modelsPath);
    canopy(scene, params, models);
};

export function initCanopy (scene, params) {
    loadModelsAndInit(scene, params);
}