import { BoxGeometry } from "three";

export function createBox(...args: ConstructorParameters<typeof BoxGeometry>) {
  return new BoxGeometry(...args);
}
