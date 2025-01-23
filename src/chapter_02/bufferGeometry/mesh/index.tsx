import { FC } from "react";
import { useInit } from "../../../hooks/useInit";
import { useMount } from "../../../hooks/useMount";
import { BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial } from "three";

const MeshModel: FC = () => {
  const { scene, directionalLight, camera, directionalLightHelper } = useInit("canvas");

  useMount(() => {
    const geometry = new BufferGeometry();
    // prettier-ignore
    const vertices = new Float32Array([
      0, 0, 0,      //顶点1坐标
      100, 0, 0,     //顶点2坐标
      0, 80, 0,    //顶点3坐标
      100, 0, 0,     //顶点4坐标
      100, 80,0,    //顶点5坐标
      0, 80, 0,    //顶点6坐标
    ]);

    const bufferAttr = new BufferAttribute(vertices, 3);
    geometry.attributes.position = bufferAttr;

    const material = new MeshBasicMaterial({
      color: 0xffff00,
    });

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    camera.position.set(0, 150, 300);
    camera.lookAt(0, 0, 0);

    directionalLight.position.set(100, 150, 100);
    directionalLight.target = mesh;
    directionalLightHelper.update();

    scene.remove(directionalLightHelper);
    directionalLightHelper.dispose();
  });

  return (
    <div>
      <h2>BufferGeometry -- 缓冲类型几何体</h2>
      <h3>网格模型</h3>
      <div id="canvas"></div>
    </div>
  );
};

export default MeshModel;
