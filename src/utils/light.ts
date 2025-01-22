import { AmbientLight, DirectionalLight } from "three";

export function createAmbientLight(
  ...args: ConstructorParameters<typeof AmbientLight>
) {
  return new AmbientLight(...args);
}

export function createDirectionalLight(
  ...args: ConstructorParameters<typeof DirectionalLight>
) {
  return new DirectionalLight(...args);
}
