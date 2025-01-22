import { FC } from "react";
import { useInit } from "../../../hooks/useInit";
import { useMount } from "../../../hooks/useMount";
import { createBox } from "../../../utils/geometry";
import { createLamberMaterial, createMesh } from "../../../utils/mesh";
import {
  BufferAttribute,
  BufferGeometry,
  Line,
  LineBasicMaterial,
  LineDashedMaterial,
  Points,
  PointsMaterial,
} from "three";

const LineModel: FC = () => {
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

    // const material = new LineBasicMaterial({
    //   color: 0xffff00,
    //   linejoin: "bevel",
    //   linewidth: 10,
    //   linecap: "square",
    // });

    const material = new LineDashedMaterial({
      color: 0xffff00,
    });

    const line = new Line(geometry, material);
    scene.add(line);

    camera.position.set(0, 150, 300);
    camera.lookAt(0, 0, 0);

    directionalLight.position.set(100, 150, 100);
    directionalLight.target = line;
    directionalLightHelper.update();
  });

  return (
    <div>
      <h2>BufferGeometry -- 缓冲类型几何体</h2>
      <h3>线模型</h3>
      <div id="canvas"></div>
    </div>
  );
};

export default LineModel;
