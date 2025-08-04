import { render } from "@testing-library/react";
import { useEffect, useRef } from "react";
import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  CameraHelper,
  CircleGeometry,
  Clock,
  DirectionalLight,
  DirectionalLightHelper,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  PointLight,
  PointLightHelper,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";

import Stats from "three/examples/jsm/libs/stats.module";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createBox } from "./utils";
import { Button, Modal } from "antd";
import { reject } from "lodash";

export default function Chapter01() {
  const ref = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    console.log("init", { initRef, ref });
    if (!ref.current || initRef.current) return;
    // 创建一个三维场景
    const scene = new Scene();

    // // 创建一个立方体集合地点对象
    // const box = new BoxGeometry(5, 5, 5);

    // // 创建一个材质
    // const material = new MeshLambertMaterial({
    //   color: 0x00ffff,
    //   // transparent: true,
    //   opacity: 0.5,
    // });

    // 创建一个圆形平面
    // const circle = new CircleGeometry(50);
    //
    // const circleMaterial = new MeshLambertMaterial({
    // color: 0x00ffff,
    // opacity: 0.5,
    // side: DoubleSide,
    // });
    //
    // const mesh = new Mesh(circle, circleMaterial);
    // scene.add(mesh);

    // // 创建一个网格模型
    // const mesh = new Mesh(box, material);
    // mesh.position.set(0, 0, 0);

    // // 将网格模型添加到场景中
    // scene.add(mesh);

    // for (let i = 0; i < 10; i++) {
    //   for (let j = 0; j < 10; j++) {
    //     const mesh = new Mesh(box, material);
    //     // const x = (Math.random() - 0.5) * 200;
    //     // const y = (Math.random() - 0.5) * 200;
    //     // const z = (Math.random() - 0.5) * 200;

    //     mesh.position.set(i * 10, 0, j * 10);
    //     scene.add(mesh);
    //   }
    // }

    // 创建一个球体
    const sphere = new SphereGeometry(50);
    const mesh = new MeshPhongMaterial({
      color: 0x00ffff,
      shininess: 50,
      specular: 0x444444,
    });
    const sphereMesh = new Mesh(sphere, mesh);
    scene.add(sphereMesh);

    // 添加一个坐标辅助器
    const axesHelper = new AxesHelper(200);
    scene.add(axesHelper);

    // // 添加点光源
    // const pointLight = new PointLight(0xffffff, 1);
    // pointLight.position.set(100, 100, 100);
    // // 这里要设置一下 默认为2 衰减很快 导致看不见物体
    // pointLight.decay = 0;
    // scene.add(pointLight);

    // // 可视化点光源
    // const pointLightHelper = new PointLightHelper(pointLight, 5, 0xffff00);
    // scene.add(pointLightHelper);

    // 添加环境光
    const ambientLight = new AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    //添加平行光源
    const directionalLight = new DirectionalLight(0xffffff, 5);
    directionalLight.position.set(100, 150, 100);
    // directionalLight.target = mesh;
    scene.add(directionalLight);

    // 可视化平行光源
    const directionalLightHelper = new DirectionalLightHelper(directionalLight, 10, 0xffff00);
    scene.add(directionalLightHelper);

    // 定义画布宽高
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 创建一个透视相机
    const camera = new PerspectiveCamera(90, width / height, 0.1, 1000);
    camera.position.set(0, 0, 500);
    camera.up.set(0, 100, 0);
    camera.lookAt(0, 0, 0);

    // 可视化相机
    const cameraHelper = new CameraHelper(camera);
    scene.add(cameraHelper);

    // 创建一个webgl渲染器
    const renderer = new WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x404040);

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.target.set(50, 50, 50);
    // controls.update();

    //
    // controls.addEventListener("change", function () {
    //   renderer.render(scene, camera);
    // });

    // 添加到dom中
    ref.current?.appendChild(renderer.domElement);

    const clock = new Clock();

    // 添加性能监控器
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    stats.dom.style.position = "absolute";
    stats.dom.style.inset = "unset";
    stats.dom.style.bottom = "0px";
    stats.dom.style.right = "0px";
    stats.dom.querySelectorAll("canvas")?.forEach((canvas) => (canvas.style.display = "block"));

    // 动画渲染函数
    function render() {
      // !帧率设备的刷新率有关 mac电脑120hz 一般显示器60hz
      // const deltaTime = clock.getDelta() * 1000;
      // console.log("间隔时间ms", deltaTime);
      // console.log("帧率", 1000 / deltaTime);

      // mesh.rotateY(0.01);
      renderer.render(scene, camera);
      stats.update();
      requestAnimationFrame(render);
    }

    render();

    window.addEventListener("resize", () => {
      // 如果容器宽高小于浏览器视口宽高 会自动调整大小以适应容器
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

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
      {/*  */}
      <h2>渲染一个立方体</h2>
      <Button
        type="primary"
        onClick={() => {
          Modal.confirm({
            content: "异步关闭弹窗",
            onOk: () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  reject(false);
                }, 1000);
              });
            },
            onCancel: () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(true);
                }, 1000);
              });
            },
          });
        }}
      >
        弹窗
      </Button>
      <div ref={ref} id="canvas"></div>
    </div>
  );
}
