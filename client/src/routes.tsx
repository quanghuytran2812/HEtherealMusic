import App from "./App";
import { pathname } from "./lib/pathname";
import { AdminLayout, SongPage } from "./pages/admin";
import {
  AccountVerification,
  GenrePage,
  HomePage,
  LoginPage,
  NotFoundPage,
  PublicLayout,
  SearchPage,
  SignupPage,
} from "./pages/public";
import { ProfilePage } from "./pages/user";

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
          {
            path: pathname.publics.genre,
            element: <GenrePage />,
          },
          {
            path: pathname.publics.profile,
            element: <ProfilePage />,
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
      {
        path: pathname.publics.notFound,
        element: <NotFoundPage />,
      },
      {
        path: pathname.admin.layout,
        element: <AdminLayout />,
        children: [
          {
            path: pathname.admin.song,
            element: <SongPage />,
          },
        ],
      }
    ],
  },
];

export default routes;
