import { ArrowHelper, Plane, PlaneHelper, Raycaster, Vector2, Vector3 } from "three";
import { useInit } from "../../hooks/useInit";
import { useMount } from "../../hooks/useMount";

const Point2Line = () => {
  const { camera, scene } = useInit("canvas");

  useMount(() => {
    camera.position.set(100, 0, 0);
    camera.lookAt(0, 0, 0);

    const raycaster = new Raycaster();
    raycaster.setFromCamera(new Vector2(0, 0), camera);
    const arrowHelper = new ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 100, 0xffff00);
    scene.add(arrowHelper);

    const point = new Vector3(10, 0, -10);
    const intersectP = new Vector3();
    raycaster.ray.closestPointToPoint(point, intersectP);

    const ah2 = new ArrowHelper(point.clone().sub(intersectP).normalize(), intersectP, 100, 0xffff00);

    scene.add(ah2);

    const planeHelper = new PlaneHelper(new Plane(new Vector3(0, 0, -1), -10), 100, 0xcccccc);
    scene.add(planeHelper);
  });

  return (
    <div>
      <h1>Point2Line</h1>
      <div id="canvas"></div>
    </div>
  );
};

export default Point2Line;
