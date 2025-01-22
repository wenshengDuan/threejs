import { BoxGeometry, Mesh, MeshLambertMaterial } from "three";

export function createBox(width: number, height: number, depth: number) {
  const box = new BoxGeometry(width, height, depth);
  const material = new MeshLambertMaterial({
    color: 0x00ffff,
    opacity: 0.5,
  });
  const mesh = new Mesh(box, material);
  return mesh;
}
