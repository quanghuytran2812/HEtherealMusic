export const pathname = {
  publics: {
    layout: "/",
    notFound: "*",
    homepage: "",
    searchPage: "search/:type/:query",
    explore: "explore",
    login: "login",
    signup: "signup",
    accountVerification: "account/verification",
    genre: "genre/:genreId",
    album: "album/:albumId",
    playlist: "playlist/:playlistId",
    artist: "artist/:artistId",
  },
  users: {
    account: "/account",
    profile: "/profile",
    setting: "/setting"
  },
  admin: {
    layout: "/admin",
    song: "song",
  }
};
