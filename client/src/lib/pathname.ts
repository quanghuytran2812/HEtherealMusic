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
    track: "track/:trackId",
    listAlbumDetail: "artist/:artistId/discography/all"
  },
  users: {
    account: "/account",
    profile: "/user/:userId",
    setting: "/setting"
  },
  admin: {
    layout: "/admin",
    song: "song",
  }
};
