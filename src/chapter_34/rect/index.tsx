import { FC } from "react";
import { useInit } from "../../hooks/useInit";
import { useMount } from "../../hooks/useMount";

const WebglRect: FC = () => {
  useMount(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 835;
    canvas.height = 835;

    // webgl 和 webgl2 有什么不同
    const gl = canvas.getContext("webgl");

    // 检查webgl是否支持
    if (!gl) {
      console.error("WebGL not supported");
      throw new Error("WebGL not supported");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);

    // 顶点着色器源码
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // 片段着色器源码
    const fragmentShaderSource = `
      void main() {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
      }
    `;

    // 创建并编译着色器代码
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) {
        console.error("Failed to create shader");
        throw new Error("Failed to create shader");
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Failed to compile shader", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        throw new Error("Failed to compile shader");
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // 创建并链接着色器程序
    const program = gl.createProgram();
    if (!program) {
      console.error("Failed to create program");
      throw new Error("Failed to create program");
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Failed to link program");
      throw new Error("Failed to link program");
    }
    gl.useProgram(program);

    // 定义矩形顶点数据
    const vertices = new Float32Array([
      -0.5,
      -0.5, // 左下角
      0.5,
      -0.5, // 右下角
      0.5,
      0.5, // 右上角
      -0.5,
      0.5, // 左上角
    ]);

    // 创建顶点缓冲区
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 获取顶点着色器中 a_position 的位置
    const positionLocation = gl.getAttribLocation(program, "a_position");
    // 启用顶点属性数组
    gl.enableVertexAttribArray(positionLocation);
    // 设置顶点属性指针
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0); // 黑色背景
    gl.clear(gl.COLOR_BUFFER_BIT); // 清空画布
    gl.drawArrays(gl.LINE_LOOP, 0, 4);

    document.getElementById("canvas")?.appendChild(canvas);
  });

  return (
    <div>
      <h1>webgl 渲染矩形</h1>
      <div id="canvas"></div>
    </div>
  );
};

export default WebglRect;
