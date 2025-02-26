import { getModels } from './getModels';
import * as THREE from 'three';

const modelsPath = '../assets/glb/Canopy_Models.glb';
const {
    Lodge_20x190x1000_bevel,
    Lodge_20x200x1000,
    balk_150x150x1000,
    balk_150x150x2200,
    balk_corner,
    lodge_150x50x200,
    lodge__150x50x1000,
    profile_canopy_perimeter_closed,
    roof_edge_1m,
    roof_edge_1m2,
    roof_edge_corner,
    roof_edge_corner2,
    ruberoid_1000x1000x2
} = await getModels(modelsPath);

function createMainSupportBalks(scene, params) {
    const positions = [
        { x: -1.5, z: -2.5 },
        { x: 1.5, z: -2.5 },
        { x: -1.5, z: 2.5 },
        { x: 1.5, z: 2.5 }
    ];
    const beamGroup = new THREE.Group();
    positions.forEach((pos) => {
        const beam = balk_150x150x2200.clone();
        beam.position.set(pos.x, 0, pos.z);
        beamGroup.add(beam);
    });
    scene.add(beamGroup);
};
function createAdditionalSupportBalks(scene, params) {
    const mainPositions = [
        { x: 1.5, z: 0 },
        { x: -1.5, z: 0 }
    ];
    const cornerPositions = [
        { x: 1.5, z: 0, rotationY: Math.PI / 2 },
        { x: 1.5, z: 0, rotationY: Math.PI / -2 },
        { x: -1.5, z: 0, rotationY: Math.PI / 2 },
        { x: -1.5, z: 0, rotationY: Math.PI / -2 },
    ];
    const supportBalksGroup = new THREE.Group();
    mainPositions.forEach((pos) => {
        const beam = balk_150x150x2200.clone();
        beam.position.set(pos.x, 0, pos.z);
        supportBalksGroup.add(beam);
    });
    cornerPositions.forEach((pos) => {
        const cornerBeam = balk_corner.clone();
        cornerBeam.rotation.y = pos.rotationY || 0;
        cornerBeam.position.set(pos.x, 0, pos.z);
        supportBalksGroup.add(cornerBeam);
    });
    scene.add(supportBalksGroup);
};
function createHorizontalBalks(scene, params) {
    const cornerPositions = [
        { x: -1.575, z: -2.5, rotationY: 0},
        { x: -1.575, z: 2.5, rotationY: 0 },
        { x: -1.5, z: 0, rotationY: Math.PI / 2 }, 
        { x: 1.5, z: 0, rotationY: Math.PI / 2 }
    ];

    const horizontalGroup = new THREE.Group();

    cornerPositions.forEach((pos) => {
        const cornerBeam = balk_150x150x1000.clone();
        cornerBeam.position.set(pos.x, 2.2, pos.z);
        cornerBeam.rotation.y = pos.rotationY;
        if (Math.abs(pos.x) < Math.abs(pos.z)) {
            cornerBeam.scale.set(3.150, 1, 1);
        };
        if (Math.abs(pos.x) > Math.abs(pos.z)) {
            cornerBeam.scale.set(4.850, 1, 1);
            cornerBeam.position.z = 2.425;
        };
        horizontalGroup.add(cornerBeam);
    });

    scene.add(horizontalGroup);
};
function createCornerBalks(scene, params) {
    const positions = [
        { x: -1.5, z: -2.5 },
        { x: -1.5, z: 2.5 },
        { x: 1.5, z: -2.5, rotationY: Math.PI },
        { x: 1.5, z: 2.5, rotationY: Math.PI },
        { x: -1.5, z: -2.5, rotationY: Math.PI / -2 },
        { x: 1.5, z: -2.5, rotationY: Math.PI / -2 },
        { x: -1.5, z: 2.5, rotationY: Math.PI / 2 },
        { x: 1.5, z: 2.5, rotationY: Math.PI / 2 }
    ];
    const cornerGroup = new THREE.Group();
    positions.forEach((pos) => {
        const cornerBeam = balk_corner.clone();
        cornerBeam.position.set(pos.x, 0, pos.z);
        cornerBeam.rotation.y = pos.rotationY || 0;
        cornerGroup.add(cornerBeam);
    });
    scene.add(cornerGroup);
};
function createFrieze (scene, params) {
    const lowerFriezeLength1 = 3 + 0.150 + 0.180 * 2 + 0.04;
    const lowerFriezeLength2 = 5 + 0.150 + 0.180 * 2 - 0.04;
    const lowerPositions = [
        { x: lowerFriezeLength1 / 2, z: lowerFriezeLength2 / 2, rotationY: Math.PI / 2, scaleX: lowerFriezeLength2 },
        { x: -(lowerFriezeLength1 / 2), z: lowerFriezeLength2 / 2, rotationY: Math.PI / 2, scaleX: lowerFriezeLength2 },
        { x: -(lowerFriezeLength1 / 2), z: -(lowerFriezeLength2 / 2), rotationY: 0, scaleX: lowerFriezeLength1 },
        { x: -(lowerFriezeLength1 / 2), z: lowerFriezeLength2 / 2, rotationY: 0, scaleX: lowerFriezeLength1 }, 
    ];
    const upperPositions = [];
    const friezeGroup = new THREE.Group();
    lowerPositions.forEach((pos) => {
        const frieze = Lodge_20x200x1000.clone();
        frieze.position.set(pos.x, 2.3, pos.z);
        frieze.rotation.y = pos.rotationY || 0;
        frieze.scale.x = pos.scaleX || 0;
        friezeGroup.add(frieze);
    });
    scene.add(friezeGroup);
}

export function canopy(scene, params) {
    createMainSupportBalks(scene, params);
    if (params.depth > 3) {
        createAdditionalSupportBalks(scene, params);
    };
    createHorizontalBalks(scene, params);
    createCornerBalks(scene, params);
    createFrieze(scene, params);
};