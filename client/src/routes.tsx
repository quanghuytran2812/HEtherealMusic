import App from "@/App";
import { PublicLayout } from "@/layouts/public";
import { pathname } from "@/lib/pathname";
import { AdminLayout, SongPage } from "@/pages/admin";
import { ProtectedRoute } from "@/pages/auth";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("@/pages/public/HomePage"));
const SearchPage = lazy(() => import("@/pages/public/SearchPage"));
const ExplorePage = lazy(() => import("@/pages/public/ExplorePage"));
const AlbumPage = lazy(() => import("@/pages/public/AlbumPage"));
const PlaylistPage = lazy(() => import("@/pages/public/PlaylistPage"));
const ArtistPage = lazy(() => import("@/pages/public/ArtistPage"));
const LoginPage = lazy(() => import("@/pages/public/LoginPage"));
const SignupPage = lazy(() => import("@/pages/public/SignupPage"));
const NotFoundPage = lazy(() => import("@/pages/public/NotFoundPage"));
const ProfilePage = lazy(() => import("@/pages/user/ProfilePage"));
const AccountVerification = lazy(() => import("@/pages/public/AccountVerification"));

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
            element: <Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense>,
          },
          {
            path: pathname.publics.searchPage,
            element: <Suspense fallback={<div>Loading...</div>}><SearchPage /></Suspense>,
          },
          {
            path: pathname.publics.explore,
            element: <Suspense fallback={<div>Loading...</div>}><ExplorePage /></Suspense>,
          },
          {
            element: <ProtectedRoute allowedRoles={["user", "artist"]} />,
            children: [
              {
                path: pathname.users.profile,
                element: <Suspense fallback={<div>Loading...</div>}><ProfilePage /></Suspense>,
              },
              {
                path: pathname.publics.album,
                element: <Suspense fallback={<div>Loading...</div>}><AlbumPage /></Suspense>,
              },
              {
                path: pathname.publics.playlist,
                element: <Suspense fallback={<div>Loading...</div>}><PlaylistPage /></Suspense>,
              },
              {
                path: pathname.publics.artist,
                element: <Suspense fallback={<div>Loading...</div>}><ArtistPage /></Suspense>,
              },
            ],
          },
        ],
      },
      {
        path: pathname.publics.signup,
        element: <Suspense fallback={<div>Loading...</div>}><SignupPage /></Suspense>,
      },
      {
        path: pathname.publics.login,
        element: <Suspense fallback={<div>Loading...</div>}><LoginPage /></Suspense>,
      },
      {
        path: pathname.publics.accountVerification,
        element: <Suspense fallback={<div>Loading...</div>}><AccountVerification /></Suspense>,
      },
      {
        path: pathname.publics.notFound,
        element: <Suspense fallback={<div>Loading...</div>}><NotFoundPage /></Suspense>,
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
