import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Chapter01 from "../chapter_01";
import Gui from "../chapter_01/gui";
import PointsModel from "../chapter_02/bufferGeometry/pointsModel";
import LineModel from "../chapter_02/bufferGeometry/lineModel";
import LineSegments from "../chapter_02/bufferGeometry/lineSegments";
import LineLoopModel from "../chapter_02/bufferGeometry/lineLoop";
import MeshModel from "../chapter_02/bufferGeometry/mesh";
import Indices from "../chapter_02/bufferGeometry/indices";
import Normal from "../chapter_02/bufferGeometry/normal";
import GroupIndex from "../chapter_03/Group";
import TraverseIndex from "../chapter_03/Traverse";
import OrthographicIndex from "../chapter_04/orthographic";
import Box3Index from "../chapter_04/box3";
import Model from "../chapter_06/model";
import Matrix from "../chapter_25/matrix";
import Trigonometric from "../chapter_25/trigonometric";
import VectorThree from "../chapter_25/vector3";
import RayIndex from "../chapter_14/ray";
import RayCasterIndex from "../chapter_14/raycaster";
import Point2Line from "../chapter_14/point2line";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "chapter/01",
          children: [
            {
              path: "",
              element: <Chapter01 />,
            },
            {
              path: "gui",
              element: <Gui />,
            },
          ],
        },
        {
          path: "chapter/02/bufferGeometry",
          children: [
            {
              path: "points",
              element: <PointsModel />,
            },
            {
              path: "line",
              element: <LineModel />,
            },
            {
              path: "line_segments",
              element: <LineSegments />,
            },
            {
              path: "line_loop",
              element: <LineLoopModel />,
            },
            {
              path: "mesh",
              element: <MeshModel />,
            },
            {
              path: "indices",
              element: <Indices />,
            },
            {
              path: "normal",
              element: <Normal />,
            },
          ],
        },
        {
          path: "chapter/03",
          children: [
            {
              path: "group",
              element: <GroupIndex />,
            },
            {
              path: "traverse",
              element: <TraverseIndex />,
            },
          ],
        },
        {
          path: "chapter/04",
          children: [
            {
              path: "orthographic",
              element: <OrthographicIndex />,
            },
            {
              path: "box3",
              element: <Box3Index />,
            },
          ],
        },
        {
          path: "chapter/06",
          children: [
            {
              path: "model",
              element: <Model />,
            },
          ],
        },
        {
          path: "chapter/14",
          children: [
            {
              path: "ray",
              element: <RayIndex />,
            },
            {
              path: "ray-caster",
              element: <RayCasterIndex />,
            },
            {
              path: "p2l",
              element: <Point2Line />,
            },
          ],
        },
        {
          path: "chapter/25",
          children: [
            {
              path: "matrix",
              element: <Matrix />,
            },
            {
              path: "trig",
              element: <Trigonometric />,
            },
            {
              path: "vector3",
              element: <VectorThree />,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
