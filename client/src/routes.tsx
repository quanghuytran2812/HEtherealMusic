import App from "./App";
import { pathname } from "./lib/pathname";
import {
  AccountVerification,
  HomePage,
  LoginPage,
  PublicLayout,
  SearchPage,
  SignupPage,
} from "./pages/public";

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
      {
        path: pathname.publics.signup,
        element: <SignupPage />,
      },
      {
        path: pathname.publics.login,
        element: <LoginPage />,
      },
      {
        path: pathname.publics.accountVerification,
        element: <AccountVerification />,
      },
    ],
  },
];

export default routes;
