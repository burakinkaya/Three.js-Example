"use strict";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
//import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { DirectionalLight } from "three";

const modelUrl = new URL("./assets/luxuryhouseinterior.gltf", import.meta.url);

const modelUrl2 = new URL("./assets/minion.gltf", import.meta.url);

const modelUrl3 = new URL("./assets/table.gltf", import.meta.url);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(200, 200, 200);
orbit.update();
const axesHelper = new THREE.AxesHelper(50);

//scene.add(axesHelper);

function animating() {
  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
}

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//scene.add(sphere);
sphere.position.set(0, 0, 0);

//renderer.setClearColor(0x000000);
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0xe1e1e1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);
directionalLight.position.set(10, 20, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;
directionalLight.shadow.camera.top = 12;

const assetLoader = new GLTFLoader();

assetLoader.load(modelUrl.href, function (gltf) {
  const model = gltf.scene;
  scene.add(model);
});

const assetLoader2 = new GLTFLoader();
let model2;
assetLoader2.load(modelUrl2.href, function (gltf) {
  model2 = gltf.scene;
  model2.position.x = 20;
  model2.position.z = 20;
  model2.rotation;

  model2.add(axesHelper);
  model2.userData.draggable = true;
  const textureLoader = new THREE.TextureLoader();
  model2.traverse(function (child) {
    console.log(child.name);
    if (child.isMesh && child.name === "Minion_Hand_Left") {
      const texture = textureLoader.load(
        "./assets/Minion/Maya/Textures/jeans_texture4807.jpg"
      );
      child.material.map = texture;
    }
  });
  model2.userData.name = "minion";
  //scene.add(model2);
});

const assetLoader3 = new GLTFLoader();
let model3;
assetLoader3.load(modelUrl3.href, function (gltf) {
  model3 = gltf.scene;
  model3.position.x = -20;
  model3.position.z = 70;
  model3.add(axesHelper);
  model3.userData.draggable = true;
  model3.userData.name = "table";
  model3.scale.set(2, 2, 2);
  //scene.add(model3);
});

const gui = new dat.GUI();

const options = {
  xdimensionminion: 20,
  ydimensionminion: 0,
  zdimensionminion: 20,
  xrotateminion: 0,
  yrotateminion: 0,
  zrotateminion: 0,
  scaleminion: 1,
  minion: false,
  xdimensiontable: 20,
  ydimensiontable: 0,
  zdimensiontable: 20,
  xrotatetable: 0,
  yrotatetable: 0,
  zrotatetable: 0,
  scaletable: 1,
  table: false,
};

let isminionlocated = false;

let istablelocated = false;

gui.add(options, "minion").onChange(function (e) {
  if (isminionlocated) {
    scene.remove(model2);
    isminionlocated = false;

    gui.__controllers.forEach(function (controller) {
      if (controller.property === "xdimensionminion") {
        gui.remove(controller);
      }
    });
    gui.__controllers.forEach(function (controller) {
      if (controller.property === "ydimensionminion") {
        gui.remove(controller);
      }
    });
    gui.__controllers.forEach(function (controller) {
      if (controller.property === "zdimensionminion") {
        gui.remove(controller);
      }
    });
    gui.__controllers.forEach(function (controller) {
      if (controller.property === "xrotateminion") {
        gui.remove(controller);
      }
    });
    gui.__controllers.forEach(function (controller) {
      if (controller.property === "yrotateminion") {
        gui.remove(controller);
      }
    });
    gui.__controllers.forEach(function (controller) {
      if (controller.property === "zrotateminion") {
        gui.remove(controller);
      }
    });

    gui.__controllers.forEach(function (controller) {
      if (controller.property === "scaleminion") {
        gui.remove(controller);
      }
    });
  } else {
    scene.add(model2);

    gui.add(options, "xdimensionminion", -500, 500).onChange(function (e) {
      model2.position.x = e;
    });

    gui.add(options, "ydimensionminion", -500, 500).onChange(function (e) {
      model2.position.y = e;
    });

    gui.add(options, "zdimensionminion", -500, 500).onChange(function (e) {
      model2.position.z = e;
    });

    gui.add(options, "xrotateminion", -0.5, 0.5).onChange(function (e) {
      model2.rotation.x += e;
    });

    gui.add(options, "yrotateminion", -0.5, 0.5).onChange(function (e) {
      model2.rotation.y += e;
    });
    gui.add(options, "zrotateminion", -0.5, 0.5).onChange(function (e) {
      model2.rotation.z += e;
    });
    gui.add(options, "scaleminion", 1, 20).onChange(function (e) {
      model2.scale.set(e, e, e);
    });
    isminionlocated = true;
  }
});

gui.add(options, "table").onChange(function (e) {
  if (istablelocated) {
    scene.remove(model3);
    istablelocated = false;

    gui.__controllers.forEach(function (controller) {
      if (controller.property === "xdimensiontable") {
        gui.remove(controller);
      }
    });
    gui.__controllers.forEach(function (controller) {
      if (controller.property === "ydimensiontable") {
        gui.remove(controller);
      }
    });
    gui.__controllers.forEach(function (controller) {
      if (controller.property === "zdimensiontable") {
        gui.remove(controller);
      }
    });
    gui.__controllers.forEach(function (controller) {
      if (controller.property === "xrotatetable") {
        gui.remove(controller);
      }
    });
    gui.__controllers.forEach(function (controller) {
      if (controller.property === "yrotatetable") {
        gui.remove(controller);
      }
    });
    gui.__controllers.forEach(function (controller) {
      if (controller.property === "zrotatetable") {
        gui.remove(controller);
      }
    });
  } else {
    scene.add(model3);

    gui.add(options, "xdimensiontable", -500, 500).onChange(function (e) {
      model3.position.x = e;
    });

    gui.add(options, "ydimensiontable", -500, 500).onChange(function (e) {
      model3.position.y = e;
    });

    gui.add(options, "zdimensiontable", -500, 500).onChange(function (e) {
      model3.position.z = e;
    });

    gui.add(options, "xrotatetable", -0.5, 0.5).onChange(function (e) {
      model3.rotation.x += e;
    });

    gui.add(options, "yrotatetable", -0.5, 0.5).onChange(function (e) {
      model3.rotation.y += e;
    });
    gui.add(options, "zrotatetable", -0.5, 0.5).onChange(function (e) {
      model3.rotation.z += e;
    });
    gui.add(options, "scaletable", 1, 20).onChange(function (e) {
      model3.scale.set(e, e, e);
    });
    istablelocated = true;
  }
});

let step = 0;

renderer.setAnimationLoop(animating);

function init() {
  animating();
}
