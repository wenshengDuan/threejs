import { FC } from "react";
import { useInit } from "../../hooks/useInit";
import { useMount } from "../../hooks/useMount";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Matrix4, Mesh, MeshBasicMaterial, Sphere, SphereGeometry, Vector3 } from "three";

const Matrix: FC = () => {
  const { scene, camera, renderer, controls } = useInit("canvas");

  useMount(() => {
    const sphere = new SphereGeometry(10);
    const material = new MeshBasicMaterial({
      color: 0x00ffff,
      opacity: 0.2,
    });
    const mesh = new Mesh(sphere, material);

    camera.position.set(100, 100, 100);
    camera.lookAt(0, 0, 0);

    scene.add(mesh);

    const T = new Matrix4();
    T.makeTranslation(50, 0, 0);
    // mat4.makeTranslation(50, 0, 0);
    // mat4.makeRotationZ(Math.PI / 2);

    const R = new Matrix4();
    R.makeRotationZ(Math.PI / 2);

    const p = new Vector3(50, 0, 0);
    // p.applyMatrix4(T).applyMatrix4(R);
    // p.applyMatrix4(R).applyMatrix4(T);

    //  R * T * P 先平移 后旋转
    // const modelMatrix = R.clone().multiply(T);
    // p.applyMatrix4(modelMatrix);

    // T * R * P 先旋转后平移
    // const modelMatrix = T.clone().multiply(R);
    // p.applyMatrix4(modelMatrix);

    // p.applyMatrix4(R);
    console.log("p", p);
    // mesh.position.copy(p);
    mesh.matrixAutoUpdate = false;
    mesh.matrix.premultiply(T).premultiply(R);
    mesh.updateMatrixWorld();
  });

  return (
    <div>
      <h1>Matrix 矩阵运算</h1>
      <div id="canvas"></div>
    </div>
  );
};

export default Matrix;
