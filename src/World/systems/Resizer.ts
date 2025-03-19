import { PerspectiveCamera, WebGLRenderer } from 'three';

interface ResizerTypes {
  container: HTMLCanvasElement;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}

const setSize = ({ container, camera, renderer }: ResizerTypes) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix(); // automatically recalculate the frustrum
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};
class Resizer {
  constructor({ container, camera, renderer }: ResizerTypes) {
    setSize({ container, camera, renderer });

    window.addEventListener('resize', () => {
      setSize({ container, camera, renderer });
    });
  }
}

export { Resizer };
