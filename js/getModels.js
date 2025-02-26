import  {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

function loadModels(path) {
    return new Promise((resolve, reject) => {
        loader.load(
            path,
            (gltf) => {
                resolve([...gltf.scene.children]);
            },
            undefined,
            (err) => {
                reject(err);
            }
        );
    });
};

export async function getModels(path) {
    const modelsArray = await loadModels(path);
    const models = {};
    modelsArray.forEach(model => models[model.name] = model);
    return models;
};