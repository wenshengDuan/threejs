import { FC } from "react";
import { useInit } from "../../hooks/useInit";
import { useMount } from "../../hooks/useMount";
import { AxesHelper, BoxGeometry, Group, Mesh, MeshLambertMaterial, Object3D, Vector3 } from "three";

const TraverseIndex: FC = () => {
  const { scene, camera, directionalLight, directionalLightHelper, onRender } = useInit("canvas");

  useMount(() => {
    const group1 = new Group();
    group1.position.set(0, 60, 0);
    group1.name = "高层";

    for (let i = 0; i < 5; i++) {
      const box = new BoxGeometry(50, 120, 50);
      const material = new MeshLambertMaterial({
        color: 0x00ffff,
      });

      const mesh = new Mesh(box, material);
      mesh.position.x = i * 80;
      mesh.name = i + 1 + "号楼";
      group1.add(mesh);
    }

    const group2 = new Group();
    group2.name = "洋房";
    group2.position.set(0, 30, 100);
    group2.visible = false;
    const groupV3 = new Vector3();
    group2.getWorldPosition(groupV3);
    console.log("group2-世界坐标", groupV3);
    const g2AxesHelper = new AxesHelper(300);
    group2.add(g2AxesHelper);

    for (let i = 0; i < 5; i++) {
      const box = new BoxGeometry(50, 60, 50);
      const material = new MeshLambertMaterial({
        color: 0x00ffff,
      });
      const mesh = new Mesh(box, material);
      mesh.position.x = i * 80;
      mesh.name = i + 6 + "号楼";
      group2.add(mesh);
    }

    const model = new Group();
    model.name = "小区住房";
    model.add(group1, group2);

    console.log("model", model);

    model.traverse((obj: Object3D) => {
      if (obj.type === "Mesh") {
        console.log("obj.name", obj.name);
      }

      if (obj.name === "1号楼" && obj instanceof Mesh) {
        obj.material.color.set(0xffff00);
        console.log("1号楼", obj);
        console.log("1号楼局部坐标", obj.position);
        const v3 = new Vector3();
        obj.getWorldPosition(v3);
        console.log("1号楼世界坐标", v3);
        // obj.visible = false;
        obj.material.visible = false;
      }
    });

    const obj = model.getObjectByName("8号楼");
    obj!.translateZ(50);
    const objHelper = new AxesHelper(150);
    obj?.add(objHelper);

    onRender(() => {
      if (obj && obj instanceof Mesh) {
        obj.geometry.translate(0.1, 0, 0);
        obj.rotateY(0.01);
      }
    });

    if (obj instanceof Mesh) {
      obj.material.color.set(0xffff00);
    }

    scene.add(model);

    camera.position.set(100, 50, 200);
    camera.lookAt(0, 0, 0);

    directionalLight.position.set(100, 150, 100);
    directionalLight.target = model;
    directionalLightHelper.update();
  });

  return (
    <div>
      <h2>模型遍历与查询</h2>
      <div id="canvas"></div>
    </div>
  );
};

export default TraverseIndex;
