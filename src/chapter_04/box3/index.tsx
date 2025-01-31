import { FC } from "react";
import { useInit } from "../../hooks/useInit";
import { useMount } from "../../hooks/useMount";
import { Box3, Box3Helper, Vector3 } from "three";

const Box3Index: FC = () => {
  const { scene, camera, directionalLightHelper } = useInit("canvas");

  useMount(() => {
    camera.position.set(100, 50, 200);
    camera.lookAt(0, 0, 0);

    const point = new Vector3(20, 20, 20);
    const box3 = new Box3();
    box3.expandByPoint(point);
    box3.expandByPoint(new Vector3(-20, -20, -20));

    const box3Helper = new Box3Helper(box3, 0xffff00);
    scene.add(box3Helper);
    scene.remove(directionalLightHelper);

    const size = new Vector3();
    box3.getSize(size);
    console.log(size);

    const center = new Vector3();
    box3.getCenter(center);
    console.log("center", center);

    const targetP = new Vector3(30, 30, 30);
    const distance = box3.distanceToPoint(targetP);
    console.log("distance", distance);
  });

  return (
    <div>
      <h1>包围盒</h1>
      <div id="canvas"></div>
    </div>
  );
};

export default Box3Index;
