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
  LineSegments,
  Points,
  PointsMaterial,
} from "three";

const LineSegmentsModel: FC = () => {
  const {
    scene,
    directionalLight,
    camera,
    directionalLightHelper,
    axesHelper,
  } = useInit("canvas");

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

    const material = new LineBasicMaterial({
      color: 0xffff00,
      linejoin: "bevel",
      linewidth: 10,
      linecap: "square",
    });

    const lineSegments = new LineSegments(geometry, material);
    scene.add(lineSegments);

    camera.position.set(0, 150, 300);
    camera.lookAt(0, 0, 0);

    directionalLight.position.set(100, 150, 100);
    directionalLight.target = lineSegments;
    directionalLightHelper.update();

    scene.remove(axesHelper);
    axesHelper.dispose();
  });

  return (
    <div>
      <h2>BufferGeometry -- 缓冲类型几何体</h2>
      <h3>线段模型</h3>
      <div id="canvas"></div>
    </div>
  );
};

export default LineSegmentsModel;
