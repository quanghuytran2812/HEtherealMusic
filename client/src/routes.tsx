import App from "./App";
import { pathname } from "./lib/pathname";
import { AdminLayout, SongPage } from "./pages/admin";
import { ProtectedRoute } from "./pages/auth";
import {
  AccountVerification,
  AlbumPage,
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
            element: <ProtectedRoute allowedRoles={["user"]} />,
            children: [
              {
                path: pathname.publics.profile,
                element: <ProfilePage />,
              },
              {
                path: pathname.publics.album,
                element: <AlbumPage />,
              },
            ],
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
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: pathname.admin.layout,
            element: <AdminLayout />,
            children: [
              {
                path: pathname.admin.song,
                element: <SongPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
