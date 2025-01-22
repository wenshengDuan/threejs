import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function createOrbitControls(
  ...args: ConstructorParameters<typeof OrbitControls>
) {
  return new OrbitControls(...args);
}
