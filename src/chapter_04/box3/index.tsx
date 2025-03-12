import { FC } from "react";
import { useInit } from "../../hooks/useInit";
import { useMount } from "../../hooks/useMount";
import { Box3, Box3Helper, Group, Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from "three";

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
    // scene.add(box3Helper);
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

    // const sphere = new SphereGeometry(30);
    // const material = new MeshBasicMaterial({
    //   color: 0x00ff00,
    // });
    // const mesh = new Mesh(sphere, material);
    // mesh.position.set(60, 60, 60);

    // const b3 = new Box3();
    // // b3.setFromObject(mesh);
    // b3.expandByObject(mesh);
    // const b3h = new Box3Helper(b3, 0xff0000);
    // scene.add(mesh, b3h);

    const b4 = new Box3(new Vector3(-30, -30, -30), new Vector3(30, 30, 30));
    const b4h = new Box3Helper(b4, 0xffff00);
    const b5 = new Box3(new Vector3(-15, -15, -15), new Vector3(15, 15, 15));
    const b5h = new Box3Helper(b5, 0xffff00);
    const group = new Group();
    group.add(b4h, b5h);
    scene.add(group);
  });

  return (
    <div>
      <h1>包围盒</h1>
      <div id="canvas"></div>
    </div>
  );
};

export default Box3Index;
