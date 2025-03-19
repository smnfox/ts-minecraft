import {
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createCamera } from './components/camera';
import { createAxesHelper, createGridHelper } from './components/helpers';
import { createLights } from './components/lights';
import { loadModels } from './components/models/loadModels';
import { createScene } from './components/scene';
import { createControls } from './systems/controls';
import { Loop } from './systems/Loop';
import { Resizer } from './systems/Resizer';
import { createCube } from './components/objects/cube';

/**
 * If two instances of the World class are created, the second instance will
 * overwrite the module scoped variables below from the first instance.
 * Accordingly, only one World class should be used at a time.
 */
let camera: PerspectiveCamera | OrthographicCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let controls: OrbitControls;
let loop: Loop;
let isRunning: boolean;
class World {
  constructor(container: HTMLCanvasElement) {
    camera = createCamera();
    scene = createScene({ backgroundColor: 'transparent' });
    renderer = new WebGLRenderer({ antialias: true });
    controls = createControls({ camera: camera, canvas: renderer.domElement });
    loop = new Loop({ camera, scene, renderer });
    container.append(renderer.domElement);

    const { mainLight, hemisphereLight } = createLights();

    loop.updatables.push(controls);
    scene.add(mainLight, hemisphereLight);

    new Resizer({ container, camera, renderer });

    const grid = createGridHelper();
    const axes = createAxesHelper();

    scene.add(grid, axes);
  }

  async init() {
    await loadModels();
    createCube({cubeType: 'basic'});
  }

  start() {
    loop.start();
    isRunning = true;
  }

  stop() {
    loop.stop();
    isRunning = false;
  }

  isRunning() {
    return isRunning;
  }
}

export { World };
