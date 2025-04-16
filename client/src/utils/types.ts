export interface registerData {
  email?: string;
  password?: string;
  name?: string;
  dob?: string;
  gender?: string;
  imageUrl?: string;
  verified_email?: boolean;
};

export interface loginData {
  email?: string;
  password?: string;
  typeLogin?: string;
};

export interface User {
  _id: string;
  email?: string;
  name: string;
  dob?: string;
  gender?: string;
  imageUrl?: string[];
  genres?: string[];
  popularity?: number;
  type: string;
};

export interface Album {
  _id: string;
  title: string;
  image_url?: string;
  type?: string;
  createdAt?: string;
  artists?: Artist[];
  songs?: string[]
};

export interface AlbumData {
  _id: string;
  title: string;
  image_url: string;
  type?: string;
  createdAt?: string;
  artists?: Artist[];
  songs?: Song[]
};

export interface Song {
  _id: string;
  title: string;
  image_url: string;
  audio_url: string;
  duration: number;
  isExplicit?: boolean;
  type?: string;
  artists?: Artist[];
  albums: Album;
  popularity?: number;
  views?: number;
}

export interface Artist {
  _id: string;
  name: string;
  image_url: string;
  type?: string;
};

export interface Playlist {
  _id: string;
  title: string;
  image_url: string;
  description: string;
  type?: string;
  users?: User;
  songs: string[];
  saves?: number;
}

export interface PlaylistData {
  _id: string;
  title: string;
  image_url: string;
  description: string;
  type?: string;
  users?: User;
  songs: Song[];
  saves?: number;
  albums?: Album;
}

export interface VerifyUserData {
  email: string;
  token: string;
}

export interface MenuItem {
  id: number;
  title: string;
  path?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface NavItem {
  href: string;
  icon: React.ElementType;
  text: string;
}

export interface UpdateUserData {
  name?: string;
  imageUrl?: File;
}

export interface CreateSongData {
  title?: string;
  imageUrl?: File;
  audioUrl?: File;
  duration?: string;
  isExplicit?: boolean;
  type?: string;
  artists?: string[];
  albums?: string;
}

export interface GenreItem {
  _id: string;
  genre_name: string;
  image_url: string;
};

export interface Library {
  _id: string;
  items: LibraryItem[];
};

export interface LibraryItem {
  _id: string;
  type: string;
  track: Track;
  playedAt: string;
  createdAt: string;
}

export interface Track {
  _id: string;
  title?: string;
  name?: string;
  image_url?: string;
  imageUrl?: string[];
  type: string;
  artists?: Artist[];
  users?: Artist;
  songs?: string[];
}

export interface TopArtist {
  items: Artist[];
  next: boolean;
}

export interface TopTrack {
  items: Song[];
  next: boolean;
}

export interface SearchResult {
  songs?: Song[];
  artists?: Artist[];
  albums?: Album[];
  playlists?: Playlist[];
  users?: Artist[];
  genres?: GenreItem[];
}