import { FC } from "react";
import { useInit } from "../../hooks/useInit";
import { useMount } from "../../hooks/useMount";
import { Matrix3, Mesh, MeshBasicMaterial, SphereGeometry, Vector2, Vector3 } from "three";
import { on } from "events";

const VectorThree: FC = () => {
  const { scene, camera, onRender } = useInit("canvas");

  useMount(() => {
    const sphere = new SphereGeometry(5);
    const material = new MeshBasicMaterial({
      color: 0x00ffff,
      opacity: 0.2,
    });
    const mesh = new Mesh(sphere, material);

    camera.position.set(100, 100, 100);
    camera.lookAt(0, 0, 0);

    // 向量表示距离
    // const A = new Vector3(20, 0, 0);
    // const walk = new Vector3(30, 30, 0);
    // const B = A.clone().add(walk);

    // 向量表示速度
    const A = new Vector3(20, 0, 0);
    const V = new Vector3(1, 2, 0).normalize();
    const B = A.clone().add(V.multiplyScalar(30));

    console.log("A", A);
    console.log("B", B);
    const mesh2 = mesh.clone();

    mesh.position.copy(A);
    mesh2.position.copy(B);

    scene.add(mesh, mesh2);

    const p = A.clone();

    onRender(() => {
      p.add(V.multiplyScalar(0.1));
      mesh.position.copy(p);
      mesh.updateMatrixWorld();
      mesh.updateMatrix();
    });

    const matrix3 = new Matrix3();
    const trans = new Vector2(20, 30);
    const T = matrix3.makeTranslation(trans);
    const R = matrix3.makeRotation(Math.PI / 4);
    console.log("T", T.clone(), "R", R.clone());
  });

  return (
    <div>
      <h1>Vector3 三维向量</h1>
      <div id="canvas"></div>
    </div>
  );
};

export default VectorThree;
