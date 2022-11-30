import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

let generator = document.querySelector('#threeGenerator');

class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 600);
        this.camera.position.x = 0;
        this.camera.position.y = 3;
        this.camera.position.z = 15;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        generator.appendChild(this.renderer.domElement);
        this.scene.background = new THREE.Color( 0x82D1E4 );

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, -4, 0);

        this.clock = new THREE.Clock();

    }

    init() {
        this.addLights();
        this.addTextures();
        this.addModels();
        // this.addText();
        this.render();

    }

    addTextures() {
        this.axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( this.axesHelper );

    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        this.camera.add(pointLight);
        this.scene.add(this.camera);
    }

    addModels() {
        this.modelLoader = new GLTFLoader();

        this.modelLoader.load(
            "../assets/models/donut.glb",
            (gltf) => {
                this.donut = gltf.scene;
                this.donut.scale.set(50,50,50);
                //this.donut

                this.donut.position.x = 0;
                this.donut.position.y = -1;
                this.donut.position.z = 0;
                this.donut.rotation.y = -0.4;
                this.donut.rotation.x = .6;
                this.donut.rotation.z = 0.2;

                console.log(gltf.scene);
                this.donut.children[1].material = new THREE.MeshBasicMaterial({color: 0xeeeeee});
                this.scene.add(this.donut);
            }
        );
    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        this.controls.update();
        this.renderer.render(this.scene, this.camera);

    };


}

export default Scene;

