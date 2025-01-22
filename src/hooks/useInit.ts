import { useMemo, useState } from "react";
import { Scene } from "three";
import { createPerspectiveCamera } from "../utils/camera";
import { createWebGLRender } from "../utils/render";
import { createOrbitControls } from "../utils/controls";
import {
  createAxesHelper,
  createDirectionalLightHelper,
} from "../utils/helper";
import { useMount } from "./useMount";
import { createAmbientLight, createDirectionalLight } from "../utils/light";

export function useInit(domId: string) {
  const [scene] = useState(() => new Scene());
  const [camera] = useState(() =>
    createPerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  );
  const [ambientLight] = useState(() => createAmbientLight(0xffffff, 0.5));
  const [directionalLight] = useState(() =>
    createDirectionalLight(0xffffff, 3)
  );
  const [directionalLightHelper] = useState(() =>
    createDirectionalLightHelper(directionalLight, 5, 0xffff00)
  );

  const [renderer] = useState(() =>
    createWebGLRender({
      antialias: true,
    })
  );
  const [controls] = useState(() =>
    createOrbitControls(camera, renderer.domElement)
  );

  const [axesHelper] = useState(() => createAxesHelper(400));

  useMount(() => {
    const obj = [
      camera,
      ambientLight,
      directionalLight,
      axesHelper,
      directionalLightHelper,
    ];
    obj.forEach((item) => scene.add(item));

    document.querySelector(`#${domId}`)?.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);

    function render() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      renderer.render(scene, camera);
      const aspect = width / height;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      requestAnimationFrame(render);
    }

    render();
  });

  return useMemo(() => {
    return {
      scene,
      camera,
      renderer,
      ambientLight,
      directionalLight,
      directionalLightHelper,
      axesHelper,
      controls,
    };
  }, [
    directionalLightHelper,
    ambientLight,
    axesHelper,
    camera,
    controls,
    directionalLight,
    renderer,
    scene,
  ]);
}
