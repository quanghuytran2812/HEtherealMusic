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
  email: string;
  name: string;
  dob: string;
  gender: string;
  imageUrl: string[];
  genres: string[];
  popularity: number;
  type: string;
};

export interface Album {
  _id: string;
  title: string;
  image_url: string;
  type?: string;
  createdAt?: string;
  artists?: Artist[];
  songs?: [Song]
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
  albumName?: string;
  popularity?: number;
  views?: number;
}

export interface Artist {
  _id: string;
  name: string;
};

export interface Playlist {
  _id: number;
  title: string;
  imageUrl: string;
  desc: string;
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
