import { useEffect, useRef } from "react";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

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
    const material = new MeshBasicMaterial({
      color: 0x00ff00,
    });

    // 创建一个网格模型
    const mesh = new Mesh(box, material);
    mesh.position.set(0, 0, 0);

    // 将网格模型添加到场景中
    scene.add(mesh);

    // 定义画布宽高
    const width = 200;
    const height = 100;

    // 创建一个透视相机
    const camera = new PerspectiveCamera(90, width / height, 0.1, 1000);
    camera.position.set(100, 100, 100);
    camera.lookAt(0, 0, 0);

    // 创建一个webgl渲染器
    const renderer = new WebGLRenderer();
    renderer.setSize(width, height);
    renderer.render(scene, camera);

    // 添加到dom中
    ref.current?.appendChild(renderer.domElement);

    console.log("初始化渲染");
    initRef.current = true;
  }, []);

  return (
    <div>
      <h2>渲染一个立方体</h2>
      <div ref={ref} id="canvas"></div>
    </div>
  );
}
