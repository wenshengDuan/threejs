import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Chapter01 from "../chapter_01";
import Gui from "../chapter_01/gui";

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
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
