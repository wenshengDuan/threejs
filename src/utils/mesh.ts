import { Mesh, MeshLambertMaterial } from "three";

export function createLamberMaterial(
  ...args: ConstructorParameters<typeof MeshLambertMaterial>
) {
  return new MeshLambertMaterial(...args);
}

export function createMesh(...args: ConstructorParameters<typeof Mesh>) {
  return new Mesh(...args);
}
