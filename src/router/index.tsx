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
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
