import App from "./App";
import { pathname } from "./lib/pathname";
import { HomePage, PublicLayout, SearchPage } from "./pages/public";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: pathname.publics.layout,
        element: <PublicLayout />,
        children: [
          {
            path: pathname.publics.homepage,
            element: <HomePage />,
          },
          {
            path: pathname.publics.searchpage,
            element: <SearchPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
