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
  imageUrl: string;
  genres: string[];
  popularity: number;
  type: string;
};

export interface Album {
  _id: number;
  title: string;
  imageUrl: string;
  artist?: string; // Optional for albums
};

export interface Artist {
  _id: number;
  title: string;
  imageUrl: string;
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