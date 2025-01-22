import { FC } from "react";
import { useInit } from "../../../hooks/useInit";
import { useMount } from "../../../hooks/useMount";
import { createBox } from "../../../utils/geometry";
import { createLamberMaterial, createMesh } from "../../../utils/mesh";
import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from "three";

const PointsModel: FC = () => {
  const { scene, directionalLight, camera, directionalLightHelper } =
    useInit("canvas");

  useMount(() => {
    const geometry = new BufferGeometry();
    const vertices = new Float32Array([
      0,
      0,
      0, //顶点1坐标
      50,
      0,
      0, //顶点2坐标
      0,
      100,
      0, //顶点3坐标
      0,
      0,
      10, //顶点4坐标
      0,
      0,
      100, //顶点5坐标
      50,
      0,
      10, //顶点6坐标
    ]);

    const bufferAttr = new BufferAttribute(vertices, 3);
    geometry.attributes.position = bufferAttr;

    const material = new PointsMaterial({
      color: 0x00ffff,
      size: 5,
    });

    const pointsModel = new Points(geometry, material);
    scene.add(pointsModel);

    camera.position.set(0, 150, 300);
    camera.lookAt(0, 0, 0);

    directionalLight.position.set(100, 150, 100);
    directionalLight.target = pointsModel;
    directionalLightHelper.update();
  });

  return (
    <div>
      <h2>BufferGeometry -- 缓冲类型几何体</h2>
      <h3>点模型</h3>
      <div id="canvas"></div>
    </div>
  );
};

export default PointsModel;
