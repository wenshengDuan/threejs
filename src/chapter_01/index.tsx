import { render } from "@testing-library/react";
import { useEffect, useRef } from "react";
import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  PointLight,
  PointLightHelper,
  Scene,
  WebGLRenderer,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Chapter01() {
  const ref = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    console.log("init", { initRef, ref });
    if (!ref.current || initRef.current) return;
    // 创建一个三维场景
    const scene = new Scene();

    // 创建一个立方体集合地点对象
    const box = new BoxGeometry(100, 100, 100);

    // 创建一个材质
    const material = new MeshLambertMaterial({
      color: 0x00ffff,
      // transparent: true,
      opacity: 0.5,
    });

    // 创建一个网格模型
    const mesh = new Mesh(box, material);
    mesh.position.set(0, 0, 0);

    // 将网格模型添加到场景中
    scene.add(mesh);

    // 添加一个坐标辅助器
    const axesHelper = new AxesHelper(200);
    scene.add(axesHelper);

    // 添加光源
    const pointLight = new PointLight(0xffffff, 1);
    pointLight.position.set(-100, -150, -100);
    // 这里要设置一下 默认为2 衰减很快 导致看不见物体
    pointLight.decay = 0;
    scene.add(pointLight);

    // 可视化点光源
    const pointLightHelper = new PointLightHelper(pointLight, 10, 0xffff00);
    scene.add(pointLightHelper);

    // 添加环境光
    const ambientLight = new AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // 添加平行光源
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 150, 100);
    directionalLight.target = mesh;
    scene.add(directionalLight);

    // 可视化平行光源
    const directionalLightHelper = new DirectionalLightHelper(
      directionalLight,
      10,
      0xffff00
    );
    scene.add(directionalLightHelper);

    // 定义画布宽高
    const width = 800;
    const height = 600;

    // 创建一个透视相机
    const camera = new PerspectiveCamera(90, width / height, 0.1, 1000);
    camera.position.set(0, 100, 300);
    camera.lookAt(0, 0, 0);

    // // 可视化相机
    // const cameraHelper = new CameraHelper(camera);
    // scene.add(cameraHelper);

    // 创建一个webgl渲染器
    const renderer = new WebGLRenderer();
    renderer.setSize(width, height);
    renderer.render(scene, camera);

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", function () {
      renderer.render(scene, camera);
    });

    // 添加到dom中
    ref.current?.appendChild(renderer.domElement);

    console.log("初始化渲染");
    initRef.current = true;
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>渲染一个立方体</h2>
      <div ref={ref} id="canvas"></div>
    </div>
  );
}
