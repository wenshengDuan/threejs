import { FC } from "react";
import { useInit } from "../../hooks/useInit";
import { useMount } from "../../hooks/useMount";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model: FC = () => {
  const { scene, camera, renderer, controls } = useInit("canvas");

  useMount(() => {
    const loader = new GLTFLoader();
    loader.load("/models/工厂.gltf", function (gltf) {
      console.log("gltf", gltf);
      scene.add(gltf.scene);
    });

    camera.position.set(100, 150, 0);
    camera.lookAt(0, 0, 0);
  });

  return (
    <div>
      <h1>gltf 模型</h1>
      <div id="canvas"></div>
    </div>
  );
};

export default Model;
