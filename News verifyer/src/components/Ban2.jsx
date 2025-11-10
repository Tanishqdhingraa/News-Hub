import React from "react";

const Ban2 = () => {
  const genres = [
    {
      name: "Politics",
      img: "https://images.unsplash.com/photo-1606788075761-9c3d0e9fc25c?auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Crime",
      img: "https://images.unsplash.com/photo-1603775020644-eb8decd79994?auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Sports",
      img: "https://images.unsplash.com/photo-1505842465776-3d90f616310d?auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Technology",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Entertainment",
      img: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Business",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Health",
      img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "World",
      img: "https://images.unsplash.com/photo-1502920917128-1aa500764b43?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <div className="w-full py-12 bg-blue-600 mt-28 text-white overflow-hidden">
      <h1 className="text-5xl font-bold text-center mb-10">
        Explore News by Genre 📰
      </h1>

      <div className="flex w-max animate-scroll space-x-10 px-10">
        {genres.map((genre, index) => (
          <div
            key={index}
            className="relative min-w-[250px] h-48 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300"
          >
            {/* Background Image */}
            <img
              src={genre.img}
              alt={genre.name}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            {/* Genre Name */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <h2 className="text-2xl font-semibold">{genre.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ban2;
