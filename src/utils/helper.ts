import { AxesHelper, DirectionalLightHelper } from "three";

export function createDirectionalLightHelper(
  ...args: ConstructorParameters<typeof DirectionalLightHelper>
) {
  return new DirectionalLightHelper(...args);
}

export function createAxesHelper(
  ...args: ConstructorParameters<typeof AxesHelper>
) {
  return new AxesHelper(...args);
}
