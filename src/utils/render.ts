import { WebGLRenderer } from "three";

export function createWebGLRender(
  ...args: ConstructorParameters<typeof WebGLRenderer>
) {
  return new WebGLRenderer(...args);
}
