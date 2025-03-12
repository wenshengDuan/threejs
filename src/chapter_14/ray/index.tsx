import { FC } from "react";
import { useInit } from "../../hooks/useInit";
import { useMount } from "../../hooks/useMount";
import {
  ArrowHelper,
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Mesh,
  MeshBasicMaterial,
  Ray,
  Vector3,
} from "three";

const RayIndex: FC = () => {
  const { scene, camera } = useInit("canvas");

  useMount(() => {
    const geometry = new BufferGeometry();
    const position = new Float32BufferAttribute([100, 25, 0, 100, -25, 25, 100, -25, -25], 3);
    geometry.setAttribute("position", position);

    const material = new MeshBasicMaterial({ color: 0x00ff00, side: DoubleSide });
    const mesh = new Mesh(geometry, material);

    camera.position.set(200, 100, 100);
    camera.lookAt(0, 0, 0);

    scene.add(mesh);

    const ray = new Ray();
    ray.origin.set(3, 20, 0);
    ray.direction.set(1, 0, 0);
    const p1 = new Vector3(100, 25, 0);
    const p2 = new Vector3(100, -25, 25);
    const p3 = new Vector3(100, -25, -25);
    const point = new Vector3();
    const result = ray.intersectTriangle(p1, p2, p3, false, point);
    console.log("point", point);
    console.log("result", result);

    const arrow = new ArrowHelper(ray.direction, ray.origin, 200, 0xff0000);
    scene.add(arrow);
  });

  return (
    <div>
      <h1>Ray</h1>
      <div id="canvas"></div>
    </div>
  );
};

export default RayIndex;
