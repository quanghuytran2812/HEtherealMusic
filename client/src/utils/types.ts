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
