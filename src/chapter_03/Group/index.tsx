import { FC } from "react";
import { useInit } from "../../hooks/useInit";
import { useMount } from "../../hooks/useMount";
import { BoxGeometry, Group, Mesh, MeshLambertMaterial } from "three";

const GroupIndex: FC = () => {
  const { scene, camera, directionalLight, directionalLightHelper } = useInit("canvas");

  useMount(() => {
    const box = new BoxGeometry(50, 50, 50);
    const material = new MeshLambertMaterial({
      color: 0x00ffff,
    });

    const mesh1 = new Mesh(box, material);
    mesh1.position.set(0, 0, 0);
    const mesh2 = mesh1.clone();
    mesh2.position.x = 100;

    const group = new Group();
    group.add(mesh1, mesh2);

    group.translateX(50);
    group.scale.set(0.5, 0.5, 0.5);
    group.rotateY(Math.PI / 4);

    scene.add(group);

    console.log("scene", scene);
    console.log("group", group);

    camera.position.set(100, 50, 200);
    camera.lookAt(0, 0, 0);

    directionalLight.position.set(100, 150, 100);
    directionalLight.target = mesh2;
    directionalLightHelper.update();
  });

  return (
    <div>
      <h2>组对象、层级模型</h2>
      <div id="canvas"></div>
    </div>
  );
};

export default GroupIndex;
