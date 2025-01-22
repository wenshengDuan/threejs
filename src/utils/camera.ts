import { PerspectiveCamera } from "three";

export function createPerspectiveCamera(
  ...args: ConstructorParameters<typeof PerspectiveCamera>
) {
  return new PerspectiveCamera(...args);
}
