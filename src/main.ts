import { World } from './World/World';
//import WebGL from 'three/addons/capabilities/WebGL.js';

async function main() {
  const container = document.querySelector('#scene-container') as HTMLCanvasElement;

  // if (!WebGL.isWebGL2Available()) {
  //   const warning = WebGL.getWebGLErrorMessage();
  //   container.appendChild(warning);
  //   return;
  // }

  const world = new World(container);
  await world.init();
  world.start();
}

main().catch((err) => {
  console.log(err);
});
