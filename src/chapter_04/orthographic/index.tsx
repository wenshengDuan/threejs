import { BoxGeometry, Mesh, MeshLambertMaterial, OrthographicCamera } from "three";
import { useInit } from "../../hooks/useInit";
import { useMount } from "../../hooks/useMount";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const OrthographicIndex = () => {
  const { scene, camera, directionalLight, controls, onRender, renderer } = useInit("canvas");

  useMount(() => {
    scene.remove(camera);
    controls.dispose();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const s = 200;

    const orthographicCamera = new OrthographicCamera(-s * aspect, s * aspect, s, -s, 1, 1000);
    orthographicCamera.position.set(0, 800, 0);
    orthographicCamera.lookAt(0, 0, 0);
    scene.add(orthographicCamera);
    const box = new BoxGeometry(20, 20, 20);
    const material = new MeshLambertMaterial({
      color: 0x00ffff,
    });
    const mesh = new Mesh(box, material);

    new OrbitControls(orthographicCamera, renderer.domElement);

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        const _mesh = mesh.clone();
        _mesh.position.set(i * 30, 0, j * 30);
        scene.add(_mesh);
      }
    }

    onRender(() => {
      renderer.render(scene, orthographicCamera);
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspect = width / height;
      orthographicCamera.left = -s * aspect;
      orthographicCamera.right = s * aspect;
      orthographicCamera.updateProjectionMatrix();
    });
  });

  return (
    <div>
      <h1>正交相机</h1>
      <div id="canvas"></div>
    </div>
  );
};

export default OrthographicIndex;
