import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Chapter01 from "../chapter_01";
import Gui from "../chapter_01/gui";
import PointsModel from "../chapter_02/bufferGeometry/pointsModel";
import LineModel from "../chapter_02/bufferGeometry/lineModel";
import LineSegments from "../chapter_02/bufferGeometry/lineSegments";

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
