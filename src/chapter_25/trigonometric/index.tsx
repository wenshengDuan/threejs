import { FC } from "react";
import { useInit } from "../../hooks/useInit";
import { useMount } from "../../hooks/useMount";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MathUtils, Matrix4, Mesh, MeshBasicMaterial, Sphere, SphereGeometry, Vector3 } from "three";

const Trigonometric: FC = () => {
  const { scene, camera, renderer, controls } = useInit("canvas");

  useMount(() => {
    const R = 100;
    const rad = Math.PI / 10;

    for (let i = 0; i <= 10; i++) {
      const sphere = new SphereGeometry(5);
      const material = new MeshBasicMaterial({ color: 0x00ffff });
      const mesh = new Mesh(sphere, material);
      const x = R * Math.cos(i * rad);
      const y = R * Math.sin(i * rad);
      mesh.position.set(x, y, 0);
      scene.add(mesh);
    }

    camera.position.set(0, 0, 200);
    camera.lookAt(0, 0, 0);
  });

  return (
    <div>
      <h1>三角函数</h1>
      <div id="canvas"></div>
    </div>
  );
};

export default Trigonometric;
