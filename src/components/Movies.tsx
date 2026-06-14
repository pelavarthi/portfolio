const favorites = [
  {
    title: "Catch Me If You Can",
    year: "2002",
    genre: "Biography/Crime",
    rating: "9.0",
    poster: "https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_.jpg",
  },
  {
    title: "Avatar: The Last Airbender",
    year: "2005",
    genre: "Animation",
    rating: "10.0",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0nGX3E27dyM9o4ZRsniEzFXbdlTkosz0Djlg6I5eBZZ5kY-TGawmFkh8a31_FT1jmEmOEIw&s=10",
  },
    {
    title: "The Terminal",
    year: "2004",
    genre: "Comedy/Drama",
    rating: "9.5",
    poster: "https://m.media-amazon.com/images/M/MV5BMTM1MTIwNTMxOF5BMl5BanBnXkFtZTcwNjIxMjQyMw@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "Death Note",
    year: "2006",
    genre: "Anime",
    rating: "10.0",
    poster: "https://m.media-amazon.com/images/M/MV5BYTgyZDhmMTEtZDFhNi00MTc4LTg3NjUtYWJlNGE5Mzk2NzMxXkEyXkFqcGc@._V1_QL75_UX190_CR0,2,190,281_.jpg",
  },
  {
    title: "Get Out",
    year: "2017",
    genre: "Horror/Mystery",
    rating: "8.4",
    poster: "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_.jpg",
  },
  {
    title: "Invincible",
    year: "2021",
    genre: "Animation",
    rating: "9.2",
    poster: "https://m.media-amazon.com/images/M/MV5BZGM5MmM2ZDAtMzBjNS00NjMxLWE4ZTMtNzFjMWMxYzU2ZThjXkEyXkFqcGc@._V1_.jpg",
  },
  {
    title: "Chennai Express",
    year: "2013",
    genre: "Action/Comedy",
    rating: "10.0",
    poster: "https://m.media-amazon.com/images/M/MV5BZmU5YzYzYTctNTk2OC00NWE5LWI5ZTctNmYwZWE0ODczYTkyXkEyXkFqcGc@._V1_.jpg",
  },
  {
    title: "The Imitation Game",
    year: "2014",
    genre: "Biography/Drama",
    rating: "8.6",
    poster: "https://m.media-amazon.com/images/M/MV5BNjI3NjY1Mjg3MV5BMl5BanBnXkFtZTgwMzk5MDQ3MjE@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "Suits",
    year: "2011",
    genre: "Drama",
    rating: "9.3",
    poster: "https://m.media-amazon.com/images/I/71HGgigujnL._AC_UF894,1000_QL80_.jpg",
  },
  {
    title: "Rush Hour",
    year: "1998",
    genre: "Action/Comedy",
    rating: "10.0",
    poster: "https://m.media-amazon.com/images/M/MV5BMGZiMzViNmEtNTNlZi00MzFmLTk5NTEtNDE2OTUzNmNlMTY4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
];

const watchlist = [
  {
    title: "Attack on Titan",
    genre: "Anime",
    poster: "https://m.media-amazon.com/images/M/MV5BZjliODY5MzQtMmViZC00MTZmLWFhMWMtMjMwM2I3OGY1MTRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
   },
  {
    title: "Breaking Bad",
    genre: "Drama",
    poster: "https://i.pinimg.com/736x/d6/63/c5/d663c5d17d169bfb49f6536b5043d195.jpg",
  },
  {
    title: "The Pursuit of Happyness",
    genre: "Drama",
    poster: "https://m.media-amazon.com/images/M/MV5BMTQ5NjQ0NDI3NF5BMl5BanBnXkFtZTcwNDI0MjEzMw@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "Good Will Hunting",
    genre: "Drama",
    poster: "https://m.media-amazon.com/images/M/MV5BOTI0MzcxMTYtZDVkMy00NjY1LTgyMTYtZmUxN2M3NmQ2NWJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
  },
  {
    title: "Whiplash",
    genre: "Drama/Music",
    poster: "https://m.media-amazon.com/images/M/MV5BYTcyM2UwODktYTRkOC00M2FkLWI2YmUtMzA4NWM4YzQ5ZGVmXkEyXkFqcGc@._V1_.jpg",
  },
  {
    title: "One Piece",
    genre: "Anime",
    poster: "https://m.media-amazon.com/images/M/MV5BMTNjNGU4NTUtYmVjMy00YjRiLTkxMWUtNzZkMDNiYjZhNmViXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "Shutter Island",
    genre: "Mystery/Thriller",
    poster: "https://m.media-amazon.com/images/M/MV5BYmY0YzY3N2ItZGRjZC00MjY1LWJlY2ItMmMwM2NkZGVlMTBiXkEyXkFqcGc@._V1_.jpg",
  },
  {
    title: "Stranger Things",
    genre: "Sci-Fi/Horror",
    poster: "https://m.media-amazon.com/images/M/MV5BOWU2NjY5NWQtMjdkZi00ODJlLThkZTAtMzFlYmJmMGE2NjZkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "Peaky Blinders",
    genre: "Crime/Drama",
    poster: "https://m.media-amazon.com/images/M/MV5BOGM0NGY3ZmItOGE2ZC00OWIxLTk0N2EtZWY4Yzg3ZDlhNGI3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "Outer Banks",
    genre: "Action/Crime",
    poster: "https://www.thecalifornianpaper.com/wp-content/uploads/2024/11/AAAABflv1iMP0nyV5C9bntUKNrkH9JznFv1HFLmh4grP2pd2llL7HEDjHgm7qhJOZmj1THabC1oKXcumjgqJ5SJ4LI3xF5oiA5YtBt5MOcWhjkt99FsrBbecdPFUmy1iH7xGvuqTIw.jpg",
  },
];

export default function Movies() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <div className="mb-16 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600">
          Cinema
        </p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Movies & Shows
        </h2>
        <p className="mt-4 text-lg text-stone-600">
          Favorites and what&apos;s next on the watchlist.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Favorites Section */}
        <div>
          <h3 className="mb-8 flex items-center text-xl font-bold text-stone-900">
            <span className="mr-2 text-2xl">⭐</span> Favorites
          </h3>
          <div className="space-y-4">
            {favorites.map((movie) => (
              <div
                key={movie.title}
                className="group flex items-center gap-4 rounded-xl border border-stone-100 bg-white p-3 shadow-sm transition-all hover:border-blue-100 hover:shadow-md"
              >
                <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-md bg-stone-100 ring-1 ring-stone-200/50">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between min-w-0">
                  <div className="truncate pr-2">
                    <h4 className="font-semibold text-stone-900 group-hover:text-blue-600 truncate">
                      {movie.title}
                    </h4>
                    <p className="text-xs text-stone-500">
                      {movie.year} • {movie.genre}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-sm font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {movie.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Watchlist Section */}
        <div>
          <h3 className="mb-8 flex items-center text-xl font-bold text-stone-900">
            <span className="mr-2 text-2xl">⏳</span> Watchlist
          </h3>
          <div className="space-y-4">
            {watchlist.map((movie) => (
              <div
                key={movie.title}
                className="group flex items-center gap-4 rounded-xl border border-stone-100 bg-stone-50/50 p-3 transition-all hover:bg-stone-50"
              >
                <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-md bg-stone-200/50 ring-1 ring-stone-200/50">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-stone-900 truncate pr-2">{movie.title}</h4>
                    <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      {movie.genre}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
