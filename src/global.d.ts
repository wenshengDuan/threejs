import * as lodash from "lodash";

declare global {
  interface Window {
    lodash: typeof lodash;
  }
}
