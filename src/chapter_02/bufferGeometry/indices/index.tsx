import { FC } from "react";
import { useInit } from "../../../hooks/useInit";
import { useMount } from "../../../hooks/useMount";
import { BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial } from "three";

const Indices: FC = () => {
  const { scene, directionalLight, camera, directionalLightHelper } = useInit("canvas");

  useMount(() => {
    const geometry = new BufferGeometry();
    // prettier-ignore
    const vertices = new Float32Array([
      10, 0, 0,        //v0
      100, 0, 0,      //v1
      10, 80, 0,       //v2
      100, 80,0,      //v4
    ]);

    const bufferAttr = new BufferAttribute(vertices, 3);
    geometry.setAttribute("position", bufferAttr);

    // prettier-ignore
    const indices = new Uint16Array([
      0,1,2,
      2,1,3
    ])
    geometry.setIndex(new BufferAttribute(indices, 1));

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
      <h3>网格模型顶点索引</h3>
      <div id="canvas"></div>
    </div>
  );
};

export default Indices;
