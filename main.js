import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),

});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene,camera);

const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const planetTexture = new THREE.TextureLoader().load('gooey.png');
const normalTexture = new THREE.TextureLoader().load('rockTexture.jpg');
const material = new THREE.MeshStandardMaterial({
  map: planetTexture,
  normalMap: normalTexture
});
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere)

// down below is where add lighting to see the shape.
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

/*const ambientLight = new THREE.AmbientLight(0xffffff)*/
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)

// the control below allows us to move the entire screen around the main object.
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24,  24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
  const star = new THREE.Mesh( geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)

}

//added a bunch of stars here using an array.
Array(200).fill().forEach(addStar)

//right here we updated the background with an actual image.
const skyTexture = new THREE.TextureLoader().load('space.png');
scene.background = skyTexture;

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.005;
  sphere.rotation.z += 0.01;

  controls.update();

  renderer.render(scene,camera);
}
animate();