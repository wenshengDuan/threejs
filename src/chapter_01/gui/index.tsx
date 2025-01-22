import { FC } from "react";
import { useMount } from "../../hooks/useMount";
import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  DirectionalLight,
  DirectionalLightHelper,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";

const Gui: FC = () => {
  useMount(() => {
    const scene = new Scene();
    const box = new BoxGeometry(100, 100, 100);
    const material = new MeshLambertMaterial({
      color: 0x00ffff,
    });

    const mesh = new Mesh(box, material);
    mesh.rotateY(Math.PI / 4);
    // mesh.position.x = 50;
    // mesh.translateX(100);
    scene.add(mesh);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new PerspectiveCamera(90, width / height, 0.1, 1000);
    camera.position.set(0, 150, 300);
    // 等会改成mesh.position
    camera.lookAt(0, 0, 0);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 3);
    directionalLight.position.set(100, 150, 100);
    directionalLight.target = mesh;
    scene.add(directionalLight);

    const directionLightHelper = new DirectionalLightHelper(
      directionalLight,
      5,
      0xffff00
    );
    scene.add(directionLightHelper);

    const axesHelper = new AxesHelper(300);
    scene.add(axesHelper);

    const renderer = new WebGLRenderer({
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    document.querySelector("#canvas")?.appendChild(renderer.domElement);

    // 会自适应父级窗口大小
    new OrbitControls(camera, renderer.domElement);

    const rotate = {
      bool: false,
    };

    function render() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      renderer.render(scene, camera);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (rotate.bool) {
        mesh.rotateY(0.01);
      }
      requestAnimationFrame(render);
    }

    render();

    const gui = new GUI();

    const folder = gui.addFolder("Position");
    folder
      .add(mesh.position, "x", -100, 100)
      .name("x坐标")
      .step(0.1)
      .onChange(function (value) {
        console.log("x坐标改变了", value);
      });
    folder.add(mesh.position, "y", -100, 100).name("y坐标").step(0.1);
    folder.add(mesh.position, "z", -100, 100).name("z坐标").step(0.1);
    folder.add(rotate, "bool").name("旋转");

    const cameraGui = gui.addFolder("camera");
    cameraGui.close();
    cameraGui.add(camera.position, "x", -200, 1000);
    cameraGui.add(camera.position, "y", -200, 1000);
    cameraGui.add(camera.position, "z", -200, 1000);

    const light = gui.addFolder("光照强度");
    light.add(ambientLight, "intensity", 0, 10).name("环境光").step(0.1);
    light.add(directionalLight, "intensity", 0, 10).name("平行光").step(0.1);
    const directionalLightFolder = light.addFolder("平行光位置");
    directionalLightFolder.add(directionalLight.position, "x", -100, 100);
    directionalLightFolder.add(directionalLight.position, "y", -100, 100);
    directionalLightFolder.add(directionalLight.position, "z", -100, 100);
    directionalLightFolder.close();

    gui.addColor(mesh.material, "color").name("材料颜色");
  });

  return (
    <div>
      <h2>GUI 辅助调试</h2>
      <div id="canvas"></div>
    </div>
  );
};

export default Gui;
