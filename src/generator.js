import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

let generator = document.querySelector('#threeGenerator');

class Scene {
    constructor() {
        this.scene;
        this.camera;
        this.renderer;
        this.controls;
        this.clock;

        this.donut;
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, generator.clientWidth / generator.clientHeight, 1, 1600);
        this.camera.position.x = 0;
        this.camera.position.y = 3;
        this.camera.position.z = 15;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(generator.clientWidth, generator.clientHeight);
        generator.appendChild(this.renderer.domElement);
        this.scene.background = new THREE.Color(0xffffff);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, -4, 0);
        this.controls.enabled = false;

        this.clock = new THREE.Clock();

        this.addLights();
        this.addModels();
        this.addLights();
        this.changeIcingColor();
        this.addLogo();
        this.render();
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        this.camera.add(pointLight);
        this.scene.add(this.camera);
    }

    addModels() {
        const modelLoader = new GLTFLoader();

        modelLoader.load(
            "../assets/models/donut.glb",
            (gltf) => {
                this.donut = gltf.scene;
                this.donut.scale.set(75, 75, 75);

                this.donut.position.x = 0;
                this.donut.position.y = -6;
                this.donut.position.z = 0;

                //console.log(this.donut);
                this.donut.children[1].material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                this.donut.children[0].material = new THREE.MeshBasicMaterial({ color: 0x60D1D6 });
                this.changeIcingColor();
                this.changeTopping();
                this.addLogo();
                this.scene.add(this.donut);
                console.log(this.donut);
            }
        );
    }

    changeIcingColor() {
        let submitIcing = document.querySelector('#bakeDonut');
        submitIcing.addEventListener('click', (e) => {
            let brandColor = document.querySelector("#icingColor").value;
            if (brandColor !== "") {
                this.donut.children[0].material = new THREE.MeshBasicMaterial({ color: brandColor });
            } else {
                this.donut.children[0].material = new THREE.MeshBasicMaterial({ color: 0x60D1D6 });
            }

            e.preventDefault();
        });
    }

    changeTopping() {
        let submitIcing = document.querySelector('#bakeDonut');
        submitIcing.addEventListener('click', (e) => {
            let Toppings = document.querySelector('#toppings');
            let topping = Toppings.options[Toppings.selectedIndex].value;
            switch (topping) {
                case "None":
                    this.donut.children[1].visible = false;
                    break;
                case "ChocolateSprinkles":
                    this.donut.children[1].visible = true;
                    this.donut.children[1].material = new THREE.MeshBasicMaterial({ color: 0xa06000 });
                    break;
                case "RainbowSprinkles":
                    this.donut.children[1].visible = true;
                    this.donut.children[1].matrix.elements[0, 1, 2, 3, 4, 5] = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                    break;
                case "SugarSprinkles":
                    this.donut.children[1].visible = true;
                    this.donut.children[1].material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                    break;
                default:
                    this.donut.children[1].visible = true;
                    this.donut.children[1].material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                    break;
            }
            e.preventDefault();
        });
    }

    addLogo() {
        let customerLogo = document.querySelector('#customerLogo');
        // let uploadedLogo = customerLogo;

        customerLogo.addEventListener('change', (e) => {

            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                const uploadedLogo = reader.result;
                console.log(uploadedLogo);

                this.cardTexture = new THREE.TextureLoader().load(uploadedImage);
                console.log(this.cardTexture);

                //rect card
                this.cardGeometry = new THREE.BoxGeometry(2, 1, 0.1);
                this.cardMaterial = new THREE.MeshLambertMaterial({
                    color: 0xdddddd,
                    side: THREE.DoubleSide,
                    map: this.cardTexture,
                });
                this.cardTexture.wrapS = THREE.RepeatWrapping;
                this.cardTexture.wrapT = THREE.RepeatWrapping;
                this.cardTexture.repeat.set(1, 1);
                this.card = new THREE.Mesh(this.cardGeometry, this.cardMaterial);
                this.card.name = "Logocard";

                this.card.position.x = 0;
                this.card.position.y = 4;

                let submitLogo = document.querySelector('#bakeDonut');
                submitLogo.addEventListener('click', (e) => {
                    if (this.scene.getObjectByName("Logocard")) {
                        this.scene.remove(this.card);
                    } else {
                        this.scene.add(this.card);
                    }
                });
            });
        });
    }




    render() {
        requestAnimationFrame(this.render.bind(this));
        this.controls.update();
        let t = 0;
        let r = 0;

        if (this.donut) {
            t = this.clock.getElapsedTime() * 0.1 * Math.PI;
            this.donut.rotation.y = -t + Math.PI * 0.5 * r;
            this.donut.rotation.x = .4;
            this.donut.rotation.z = .1 * Math.sin(t);
        }

        this.renderer.render(this.scene, this.camera);
    };


}

export default Scene;

