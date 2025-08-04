import { FC, useEffect, useRef } from "react";
import {
  BufferGeometry,
  BufferAttribute,
  LineBasicMaterial,
  Line,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
  AxesHelper,
  Color,
  Vector3,
  Vector2,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const TopView = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  margin-top: 20px;
`;

const SVGOverlay = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  & line {
    pointer-events: all;
    stroke: #ffffff;
    stroke-width: 2;
  }
`;

const CustomGeometry: FC = () => {
  const lineRef = useRef<Line>();
  const topViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 创建场景
    const scene = new Scene();
    scene.background = new Color(0x000000);

    // 创建相机
    const width = 800;
    const height = 400;
    const camera = new OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
    camera.position.set(0, 0, 40);
    camera.lookAt(0, 0, 0);

    // 创建渲染器
    const canvasContainer = document.getElementById("canvas");
    // 清除已存在的canvas元素
    if (canvasContainer?.firstChild) {
      canvasContainer.removeChild(canvasContainer.firstChild);
    }
    const renderer = new WebGLRenderer();
    renderer.setSize(width, height);
    canvasContainer?.appendChild(renderer.domElement);

    // 创建几何体
    const geometry = new BufferGeometry();
    const vertices = new Float32Array([-0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0, -0.5, 0.5, 0]);
    geometry.setAttribute("position", new BufferAttribute(vertices, 3));

    // 创建材质
    const material = new LineBasicMaterial({ color: 0xff0000 });

    // 创建线条
    const line = new Line(geometry, material);
    line.position.set(20, 20, 30);
    line.scale.set(20, 40, 10);
    scene.add(line);
    lineRef.current = line;

    // 创建俯视图场景
    const topScene = new Scene();
    topScene.background = new Color(0x000000);

    const topCamera = new OrthographicCamera(-20, 20, 20, -20, 1, 1000);
    topCamera.position.set(0, 0, -40);
    topCamera.lookAt(0, 0, 0);

    const topRenderer = new WebGLRenderer();
    topRenderer.setSize(400, 400);
    topViewRef.current?.appendChild(topRenderer.domElement);

    // 创建俯视图中的线框
    const topLine = line.clone();
    topScene.add(topLine);

    // 创建SVG覆盖层
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "400");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.pointerEvents = "none";
    topViewRef.current?.appendChild(svg);

    // 创建可拖动的矩形框架
    const rectGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svg.appendChild(rectGroup);

    // 创建四条边
    const edges = [
      { id: "top", x1: 180, y1: 180, x2: 220, y2: 180 },
      { id: "right", x1: 220, y1: 180, x2: 220, y2: 220 },
      { id: "bottom", x1: 180, y1: 220, x2: 220, y2: 220 },
      { id: "left", x1: 180, y1: 180, x2: 180, y2: 220 },
    ];

    edges.forEach((edge) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", edge.x1.toString());
      line.setAttribute("y1", edge.y1.toString());
      line.setAttribute("x2", edge.x2.toString());
      line.setAttribute("y2", edge.y2.toString());
      line.style.pointerEvents = "all";
      line.style.cursor = edge.id === "left" || edge.id === "right" ? "ew-resize" : "ns-resize";
      line.dataset.edge = edge.id;
      rectGroup.appendChild(line);
    });

    // 处理拖拽
    let isDragging = false;
    let activeEdge: string | null = null;
    let startX = 0;
    let startY = 0;
    let initialRect = { x: 180, y: 180, width: 40, height: 40 };

    const updateEdgePositions = (rect: { x: number; y: number; width: number; height: number }) => {
      const edges = rectGroup.children;
      // 更新边的位置
      Array.from(edges).forEach((edge) => {
        const svgEdge = edge as SVGLineElement;
        switch (svgEdge.dataset.edge) {
          case "top":
            svgEdge.setAttribute("x1", rect.x.toString());
            svgEdge.setAttribute("y1", rect.y.toString());
            svgEdge.setAttribute("x2", (rect.x + rect.width).toString());
            svgEdge.setAttribute("y2", rect.y.toString());
            break;
          case "right":
            svgEdge.setAttribute("x1", (rect.x + rect.width).toString());
            svgEdge.setAttribute("y1", rect.y.toString());
            svgEdge.setAttribute("x2", (rect.x + rect.width).toString());
            svgEdge.setAttribute("y2", (rect.y + rect.height).toString());
            break;
          case "bottom":
            svgEdge.setAttribute("x1", rect.x.toString());
            svgEdge.setAttribute("y1", (rect.y + rect.height).toString());
            svgEdge.setAttribute("x2", (rect.x + rect.width).toString());
            svgEdge.setAttribute("y2", (rect.y + rect.height).toString());
            break;
          case "left":
            svgEdge.setAttribute("x1", rect.x.toString());
            svgEdge.setAttribute("y1", rect.y.toString());
            svgEdge.setAttribute("x2", rect.x.toString());
            svgEdge.setAttribute("y2", (rect.y + rect.height).toString());
            break;
        }
      });

      // 更新3D线框的位置和缩放
      if (lineRef.current) {
        lineRef.current.position.x = (rect.x + rect.width / 2 - 200) / 4;
        lineRef.current.position.y = -(rect.y + rect.height / 2 - 200) / 4;
        lineRef.current.scale.x = rect.width / 40;
        lineRef.current.scale.y = rect.height / 40;
        topLine.position.copy(lineRef.current.position);
        topLine.scale.copy(lineRef.current.scale);
      }
    };

    svg.addEventListener("mousedown", (e: MouseEvent) => {
      const target = e.target as SVGElement;
      if (target.tagName === "line") {
        isDragging = true;
        activeEdge = target.dataset.edge || null;
        startX = e.clientX;
        startY = e.clientY;
        initialRect = {
          x: parseFloat(rectGroup.children[0].getAttribute("x1") || "180"),
          y: parseFloat(rectGroup.children[0].getAttribute("y1") || "180"),
          width:
            parseFloat(rectGroup.children[1].getAttribute("x1") || "220") -
            parseFloat(rectGroup.children[0].getAttribute("x1") || "180"),
          height:
            parseFloat(rectGroup.children[2].getAttribute("y1") || "220") -
            parseFloat(rectGroup.children[0].getAttribute("y1") || "180"),
        };
      }
    });

    document.addEventListener("mousemove", (e: MouseEvent) => {
      if (!isDragging || !activeEdge) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const newRect = { ...initialRect };

      switch (activeEdge) {
        case "left":
          newRect.x = Math.min(Math.max(0, initialRect.x + dx), initialRect.x + initialRect.width - 20);
          newRect.width = initialRect.width - (newRect.x - initialRect.x);
          break;
        case "right":
          newRect.width = Math.min(Math.max(20, initialRect.width + dx), 400 - newRect.x);
          break;
        case "top":
          newRect.y = Math.min(Math.max(0, initialRect.y + dy), initialRect.y + initialRect.height - 20);
          newRect.height = initialRect.height - (newRect.y - initialRect.y);
          break;
        case "bottom":
          newRect.height = Math.min(Math.max(20, initialRect.height + dy), 400 - newRect.y);
          break;
      }

      updateEdgePositions(newRect);
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      activeEdge = null;
    });

    // 渲染俯视图
    const renderTopView = () => {
      requestAnimationFrame(renderTopView);
      topRenderer.render(topScene, topCamera);
    };
    renderTopView();

    // 添加坐标轴辅助
    const axesHelper = new AxesHelper(100);
    scene.add(axesHelper);

    // 添加相机辅助器
    // const cameraHelper = new CameraHelper(camera);
    // scene.add(cameraHelper);

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // 渲染函数
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      // 清理资源
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      controls.dispose();
      axesHelper.dispose();
      // cameraHelper.dispose();
      scene.remove(line);
      scene.remove(axesHelper);
      // scene.remove(cameraHelper);

      // 清理俯视图资源
      if (topViewRef.current) {
        while (topViewRef.current.firstChild) {
          topViewRef.current.removeChild(topViewRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <Container>
      {/* <h2>自定义几何体</h2> */}
      <div id="canvas"></div>
      <TopView ref={topViewRef} />
    </Container>
  );
};

export default CustomGeometry;
