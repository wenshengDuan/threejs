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
  Raycaster,
  SphereGeometry,
  Vector3,
} from "three";

import { Octree } from "three/examples/jsm/math/Octree";

const RayCasterIndex: FC = () => {
  const { scene, camera } = useInit("canvas");

  useMount(() => {
    const sphere = new SphereGeometry(10);
    const material = new MeshBasicMaterial({ color: 0x00ff00, side: DoubleSide });
    const s1 = new Mesh(sphere, material);
    s1.position.set(0, 0, 0);
    const s2 = s1.clone();
    s2.position.set(60, 0, 0);
    s2.material = material.clone();
    s2.material.color.set(0xff0000);
    const s3 = s1.clone();
    s3.material = material.clone();
    s3.position.set(0, 60, 0);
    s3.material.color.set(0x0000ff);

    camera.position.set(200, 100, 100);
    camera.lookAt(0, 0, 0);

    const raycaster = new Raycaster();
    raycaster.ray.origin.set(-30, 0, 0);
    raycaster.ray.direction.set(1, 0, 0);

    const objects = raycaster.intersectObjects([s1, s2, s3]);
    console.log("objects", objects);

    if (objects.length > 0) {
      if (objects[0].object instanceof Mesh) {
        objects[0].object.material.color.set(0xff0000);
      }
    }

    // const arrow = new ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 400);

    scene.add(s1, s2, s3);
  });

  return (
    <div>
      <h1>RayCaster 射线拾取模型</h1>
      <div id="canvas"></div>
    </div>
  );
};

export default RayCasterIndex;
