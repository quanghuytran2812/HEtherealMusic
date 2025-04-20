import { CardMore } from "@/components/cards";
import { SearchFilter } from "@/components/filter";
import { ListItem } from "@/components/list";
import {
  album_col,
  body_large,
  body_medium,
  card_link,
  col,
  duration_col,
  img_cover,
  img_holder,
  list_header,
  number_col,
  section_title,
  slider,
  slider_inner,
  title_large,
  title_wrapper,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { useSearchStore } from "@/stores/useSearchStore";
import { Clock } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SearchPage = () => {
  const { type = "all", query = "" } = useParams();
  const { results, isLoading, error, search } = useSearchStore();

  // Trigger search when URL params change
  useEffect(() => {
    if (query) {
      const decodedQuery = decodeURIComponent(query);
      search(decodedQuery, type === "all" ? undefined : type);
    }
  }, [query, type, search]);

  return (
    <div className="mt-16 md:mt-0 px-4">
      <SearchFilter
        items={results}
        type={type}
        query={decodeURIComponent(query)}
      />
      <div className={cn("grid", type === "all" && "lg:grid-cols-2")}>
        {/* TOP RESULT */}
        {!isLoading &&
          !error &&
          results.genres &&
          results.genres.length > 0 &&
          type === "all" && (
            <section className="mt-4 relative">
              <div className={cn(title_wrapper)}>
                <h2 className={cn(title_large, section_title)}>Top Result</h2>
              </div>

              <div className="rounded-lg bg-[#181818] p-5 flex flex-col gap-4">
                <figure
                  className={cn(
                    img_holder,
                    "aspect-[1/1] size-[92px] rounded-lg"
                  )}
                >
                  <img
                    src={results.genres?.[0]?.image_url}
                    alt={results.genres?.[0]?.genre_name}
                    width={100}
                    height={100}
                    loading="lazy"
                    decoding="async"
                    className={cn(img_cover)}
                  />
                </figure>
                <div className="min-h-14 flex flex-col gap-1">
                  <p className="text-[#fff] text-3xl font-bold">
                    {results.genres?.[0]?.genre_name}
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">Genre</p>
                </div>
              </div>
              <Link
                to={`/genre/${results.genres?.[0]?._id}`}
                className={cn(card_link)}
              ></Link>
            </section>
          )}
        {/* TRACKS */}
        {!isLoading && !error && results.songs && results.songs.length > 0 && (
          <section className={cn(type === "all" && "mt-4")}>
            {type === "all" && (
              <div className={cn(title_wrapper)}>
                <h2 className={cn(title_large, section_title)}>Songs</h2>
              </div>
            )}

            {type === "songs" && (
              <div className={cn(list_header)}>
                <div className={cn(body_large, number_col)}>#</div>
                <div className={cn(body_medium, col)}>Title</div>
                <div className={cn(body_medium, album_col, col)}>Album</div>
                <div className={cn(duration_col)}>
                  <span className={cn("material-symbols-rounded")}>
                    <Clock size={16} />
                  </span>
                </div>
              </div>
            )}

            <div className="list">
              {results?.songs.map((song, i) => (
                <ListItem
                  key={song._id}
                  track={{
                    _id: song._id,
                    title: song.title,
                    image_url: song.image_url,
                    artists: song.artists,
                    albumName: type === "songs" ? song.albums.title : "",
                    duration: song.duration,
                    trackNumber: i + 1,
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
      {/* ARTISTS */}
      {!isLoading &&
        !error &&
        results.artists &&
        results.artists.length > 0 && (
          <section className="mt-4">
            {type === "all" && (
              <div className={cn(title_wrapper)}>
                <h2 className={cn(title_large, section_title)}>Artists</h2>
              </div>
            )}

            {type === "all" && (
              <div className={cn(slider, "slider")}>
                <div className={cn(slider_inner)}>
                  {results.artists.map((artist) => {
                    return (
                      <CardMore
                        key={artist._id}
                        item={{
                          _id: artist._id,
                          title: artist.name,
                          type: artist.type,
                          text: artist.type,
                          link: `/artist/${artist._id}`,
                          image_url: artist.image_url,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {type === "artists" && (
              <div className={cn("grid-list")}>
                {results.artists.map((artist) => {
                  return (
                    <CardMore
                      key={artist._id}
                      item={{
                        _id: artist._id,
                        title: artist.name,
                        type: artist.type,
                        text: artist.type,
                        link: `/artist/${artist._id}`,
                        image_url: artist.image_url,
                      }}
                    />
                  );
                })}
              </div>
            )}
          </section>
        )}
      {/* ALBUM */}
      {!isLoading && !error && results.albums && results.albums.length > 0 && (
        <section className="mt-4">
          {type === "all" && (
            <div className={cn(title_wrapper)}>
              <h2 className={cn(title_large, section_title)}>Albums</h2>
            </div>
          )}

          {type === "all" && (
            <div className={cn(slider, "slider")}>
              <div className={cn(slider_inner)}>
                {results.albums.map((album) => {
                  const artistsAlbum =
                    album.artists?.map((artist) => artist.name).join(", ") ||
                    "Unknown Artist";
                  const text = `${
                    album.createdAt && new Date(album.createdAt).getFullYear()
                  } • ${artistsAlbum}`;
                  return (
                    <CardMore
                      key={album._id}
                      item={{
                        _id: album._id,
                        title: album.title,
                        type: "album",
                        text: text,
                        link: `/album/${album._id}`,
                        image_url: album.image_url,
                        songs: album.songs,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {type === "albums" && (
            <div className={cn("grid-list")}>
              {results.albums.map((album) => {
                const artistsAlbum =
                  album.artists?.map((artist) => artist.name).join(", ") ||
                  "Unknown Artist";
                const text = `${
                  album.createdAt && new Date(album.createdAt).getFullYear()
                } • ${artistsAlbum}`;
                return (
                  <CardMore
                    key={album._id}
                    item={{
                      _id: album._id,
                      title: album.title,
                      type: "album",
                      text: text,
                      link: `/album/${album._id}`,
                      image_url: album.image_url,
                      songs: album.songs,
                    }}
                  />
                );
              })}
            </div>
          )}
        </section>
      )}
      {/* PLAYLIST */}
      {!isLoading &&
        !error &&
        results.playlists &&
        results.playlists.length > 0 && (
          <section className="mt-4">
            {type === "all" && (
              <div className={cn(title_wrapper)}>
                <h2 className={cn(title_large, section_title)}>Playlists</h2>
              </div>
            )}

            {type === "all" && (
              <div className={cn(slider, "slider")}>
                <div className={cn(slider_inner)}>
                  {results.playlists.map((playlist) => {
                    return (
                      <CardMore
                        key={playlist._id}
                        item={{
                          _id: playlist._id,
                          title: playlist.title,
                          type: "playlist",
                          text: `By ${playlist.users?.name}`,
                          link: `/playlist/${playlist._id}`,
                          image_url: playlist.image_url,
                          songs: playlist.songs,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {type === "playlists" && (
              <div className={cn("grid-list")}>
                {results.playlists.map((playlist) => {
                  return (
                    <CardMore
                      key={playlist._id}
                      item={{
                        _id: playlist._id,
                        title: playlist.title,
                        type: "playlist",
                        text: `By ${playlist.users?.name}`,
                        link: `/playlist/${playlist._id}`,
                        image_url: playlist.image_url,
                        songs: playlist.songs,
                      }}
                    />
                  );
                })}
              </div>
            )}
          </section>
        )}
      {/* PROFILE */}
      {!isLoading && !error && results.users && results.users.length > 0 && (
        <section className="mt-4">
          {type === "all" && (
            <div className={cn(title_wrapper)}>
              <h2 className={cn(title_large, section_title)}>Profiles</h2>
            </div>
          )}

          {type === "all" && (
            <div className={cn(slider, "slider")}>
              <div className={cn(slider_inner)}>
                {results.users.map((user) => {
                  return (
                    <CardMore
                      key={user._id}
                      item={{
                        _id: user._id,
                        title: user.name,
                        type: "artist",
                        text: "Profile",
                        link: `/user/${user._id}`,
                        image_url: user.image_url,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {type === "users" && (
            <div className={cn("grid-list")}>
              {results.users.map((user) => {
                return (
                  <CardMore
                    key={user._id}
                    item={{
                      _id: user._id,
                      title: user.name,
                      type: "artist",
                      text: "Profile",
                      link: `/user/${user._id}`,
                      image_url: user.image_url,
                    }}
                  />
                );
              })}
            </div>
          )}
        </section>
      )}
      {/* GENRES & MOODS */}
      {!isLoading && !error && results.genres && results.genres.length > 0 && (
        <section className="mt-4">
          {type === "all" && (
            <div className={cn(title_wrapper)}>
              <h2 className={cn(title_large, section_title)}>Genres & Moods</h2>
            </div>
          )}

          {type === "all" && (
            <div className={cn(slider, "slider")}>
              <div className={cn(slider_inner)}>
                {results.genres.map((genre) => {
                  return (
                    <CardMore
                      key={genre._id}
                      item={{
                        _id: genre._id,
                        title: genre.genre_name,
                        type: "genre",
                        link: `/genre/${genre._id}`,
                        image_url: genre.image_url,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {type === "genres" && (
            <div className={cn("grid-list")}>
              {results.genres.map((genre) => {
                return (
                  <CardMore
                    key={genre._id}
                    item={{
                      _id: genre._id,
                      title: genre.genre_name,
                      type: "genre",
                      link: `/album/${genre._id}`,
                      image_url: genre.image_url,
                    }}
                  />
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default SearchPage;
