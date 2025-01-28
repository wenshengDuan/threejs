import { FC } from "react";
import { useInit } from "../../../hooks/useInit";
import { useMount } from "../../../hooks/useMount";
import { BufferAttribute, BufferGeometry, DoubleSide, Mesh, MeshBasicMaterial, MeshLambertMaterial } from "three";

const Normal: FC = () => {
  const { scene, directionalLight, camera, directionalLightHelper, ambientLight } = useInit("canvas");

  useMount(() => {
    const geometry = new BufferGeometry();
    // prettier-ignore
    const vertices = new Float32Array([
      0, 0, 10,        //v0
      0, 0, 100,      //v1
      0, 80, 100,       //v2
      0, 80, 10,      //v4
    ]);

    const bufferAttr = new BufferAttribute(vertices, 3);
    geometry.setAttribute("position", bufferAttr);

    // prettier-ignore
    const indices = new Uint16Array([
      0, 2, 1,
      0, 3, 2,
    ])
    geometry.setIndex(new BufferAttribute(indices, 1));

    // prettier-ignore
    const normals = new Float32Array([
      1, 0, 0,  // v0 法向量
      1, 0, 0 , // v1 法向量
      1, 0, 0, // v2 法向量
      1, 0, 0, // v3 法向量
    ])

    geometry.setAttribute("normal", new BufferAttribute(normals, 3));

    geometry.translate(0, 0, 100);
    geometry.center();
    geometry.rotateZ(Math.PI / 4);

    const material = new MeshLambertMaterial({
      color: 0xffff00,
      side: DoubleSide,
      // wireframe: true,  // 线框模式
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
      <h3>网格模型顶点法向量</h3>
      <div id="canvas"></div>
    </div>
  );
};

export default Normal;
