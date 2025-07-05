const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "eec8ca18da6c9523e3f50a8c6f69c633"
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

// Enhanced fallback data with IMDB IDs
const fallbackData = {
  nowPlaying: {
    results: [
      {
        id: 950387,
        title: "A Minecraft Movie",
        poster_path: "/iPPTGh2OXuIv6d7cwuoPkw8govp.jpg",
        backdrop_path: "/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
        vote_average: 6.1,
        overview:
          "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld.",
        release_date: "2025-03-31",
        genre_ids: [10751, 35, 12, 14],
        imdb_id: "tt3566834",
      },
      {
        id: 558449,
        title: "Gladiator II",
        poster_path: "/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
        backdrop_path: "/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg",
        vote_average: 6.8,
        overview:
          "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum.",
        release_date: "2024-11-13",
        genre_ids: [28, 18, 36],
        imdb_id: "tt9218128",
      },
      {
        id: 912649,
        title: "Venom: The Last Dance",
        poster_path: "/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
        backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
        vote_average: 6.4,
        overview: "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in.",
        release_date: "2024-10-22",
        genre_ids: [878, 28, 12],
        imdb_id: "tt16366836",
      },
      {
        id: 1100782,
        title: "Smile 2",
        poster_path: "/aE85MnPIsSoSs3978Noo16BRsKN.jpg",
        backdrop_path: "/xlkclSE4aq7r3JsFIJRgs21zUew.jpg",
        vote_average: 6.8,
        overview:
          "About to embark on a new world tour, global pop sensation Skye Riley begins experiencing increasingly terrifying and inexplicable events.",
        release_date: "2024-10-16",
        genre_ids: [27, 9648],
        imdb_id: "tt21807222",
      },
    ],
  },
  popular: {
    results: [
      {
        id: 1184918,
        title: "The Wild Robot",
        poster_path: "/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
        backdrop_path: "/417tYZ4XUyJrtyZXj7HpvWf1E8f.jpg",
        vote_average: 8.5,
        overview: "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island.",
        release_date: "2024-09-12",
        genre_ids: [16, 878, 10751],
        imdb_id: "tt29623480",
      },
      {
        id: 533535,
        title: "Deadpool & Wolverine",
        poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        backdrop_path: "/yDHYTfA3R0jFYba4jLjs5AkmncA.jpg",
        vote_average: 7.7,
        overview:
          "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him.",
        release_date: "2024-07-24",
        genre_ids: [28, 35, 878],
        imdb_id: "tt6263850",
      },
      {
        id: 1022789,
        title: "Inside Out 2",
        poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        backdrop_path: "/stKGOm8UyhuLPR9sZLjsRO5HHw1.jpg",
        vote_average: 7.6,
        overview:
          "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions!",
        release_date: "2024-06-11",
        genre_ids: [16, 10751, 12, 35],
        imdb_id: "tt22022452",
      },
      {
        id: 519182,
        title: "Despicable Me 4",
        poster_path: "/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
        backdrop_path: "/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
        vote_average: 7.1,
        overview:
          "Gru and Lucy and their girls welcome a new baby boy. But when Gru faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina.",
        release_date: "2024-06-20",
        genre_ids: [16, 10751, 35, 28],
        imdb_id: "tt7510222",
      },
    ],
  },
  topRated: {
    results: [
      {
        id: 278,
        title: "The Shawshank Redemption",
        poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        backdrop_path: "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
        vote_average: 8.7,
        overview:
          "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
        release_date: "1994-09-23",
        genre_ids: [18, 80],
        imdb_id: "tt0111161",
      },
      {
        id: 238,
        title: "The Godfather",
        poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
        vote_average: 8.7,
        overview:
          "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
        release_date: "1972-03-14",
        genre_ids: [18, 80],
        imdb_id: "tt0068646",
      },
      {
        id: 424,
        title: "Schindler's List",
        poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
        backdrop_path: "/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
        vote_average: 8.6,
        overview:
          "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis.",
        release_date: "1993-12-15",
        genre_ids: [18, 36, 10752],
        imdb_id: "tt0108052",
      },
      {
        id: 240,
        title: "The Godfather Part II",
        poster_path: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
        backdrop_path: "/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
        vote_average: 8.6,
        overview:
          "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York.",
        release_date: "1974-12-20",
        genre_ids: [18, 80],
        imdb_id: "tt0071562",
      },
    ],
  },
  upcoming: {
    results: [
      {
        id: 324544,
        title: "In the Lost Lands",
        poster_path: "/iHf6bXPghWB6gT8kFkL1zo00x6X.jpg",
        backdrop_path: "/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg",
        vote_average: 5.926,
        overview:
          "A queen sends the powerful and feared sorceress Gray Alys to the ghostly wilderness of the Lost Lands.",
        release_date: "2025-02-27",
        genre_ids: [14, 12, 28],
        imdb_id: "tt1234567",
      },
      {
        id: 1034541,
        title: "Terrifier 3",
        poster_path: "/7NDHoebflLwL1CcgLJ9wZbbDrmV.jpg",
        backdrop_path: "/18TSJF1WLA4CkymvVUcKDBwUJ9F.jpg",
        vote_average: 6.9,
        overview:
          "Five years after surviving Art the Clown's Halloween massacre, Sienna and Jonathan are still struggling to rebuild their shattered lives.",
        release_date: "2024-10-09",
        genre_ids: [27, 53],
        imdb_id: "tt27911000",
      },
    ],
  },
  kids: {
    results: [
      {
        id: 446893,
        title: "Trolls World Tour",
        poster_path: "/7W0G3YECgDAfnuiHG91r8WqgIOe.jpg",
        backdrop_path: "/qsxhnirlp7y4Ae9bd11oYJSX59j.jpg",
        vote_average: 7.285,
        overview:
          "Queen Poppy and Branch make a surprising discovery -- there are other Troll worlds beyond their own.",
        release_date: "2020-03-11",
        genre_ids: [10751, 16, 35, 14, 12, 10402],
        imdb_id: "tt6587640",
      },
      {
        id: 508947,
        title: "Turning Red",
        poster_path: "/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg",
        backdrop_path: "/iKsaQqKCrwCKqzVdnyv3HuGP0No.jpg",
        vote_average: 7.4,
        overview:
          "Thirteen-year-old Mei is experiencing the awkwardness of being a teenager with a twist – when she gets too excited, she transforms into a giant red panda.",
        release_date: "2022-03-10",
        genre_ids: [16, 35, 10751, 14],
        imdb_id: "tt8097030",
      },
      {
        id: 508442,
        title: "Soul",
        poster_path: "/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg",
        backdrop_path: "/kf456ZqeC45XTvo6W9pW5clyCdb.jpg",
        vote_average: 8.1,
        overview: "Joe Gardner is a middle school band teacher whose life hasn't quite gone the way he expected.",
        release_date: "2020-12-25",
        genre_ids: [16, 35, 18, 10751, 14],
        imdb_id: "tt2948372",
      },
    ],
  },
}

// Instant cache with pre-loaded data
const instantCache = new Map()

// Initialize cache with fallback data for instant loading
function initializeCache() {
  instantCache.set(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=1`, {
    data: fallbackData.nowPlaying,
    timestamp: Date.now(),
  })
  instantCache.set(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`, {
    data: fallbackData.popular,
    timestamp: Date.now(),
  })
  instantCache.set(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=1`, {
    data: fallbackData.topRated,
    timestamp: Date.now(),
  })
  instantCache.set(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=1`, {
    data: fallbackData.upcoming,
    timestamp: Date.now(),
  })
}

// Initialize cache immediately
initializeCache()

async function fetchWithInstantCache(url: string, fallback: any) {
  const cacheKey = url
  const cached = instantCache.get(cacheKey)

  // Return cached data immediately if available
  if (cached) {
    // Fetch fresh data in background without blocking
    setTimeout(async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWM4Y2ExOGRhNmM5NTIzZTNmNTBhOGM2ZjY5YzYzMyIsIm5iZiI6MTcyNTUzNDE4OC40MzYsInN1YiI6IjY2ZDk4ZmVjYTllZmM3Zjc2ZTkyODJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D1Fp74OtEjAV6He4Beqp5CYiz9RIKg6aa3HHsFpDJGU`,
            "Content-Type": "application/json",
          },
        })
        if (response.ok) {
          const data = await response.json()
          if (data.results) {
            data.results = data.results.map((movie: any) => ({
              ...movie,
              imdb_id: movie.imdb_id || `tt${movie.id}`,
            }))
          }
          instantCache.set(cacheKey, { data, timestamp: Date.now() })
        }
      } catch (error) {
        console.warn("Background fetch failed:", error)
      }
    }, 100)

    return cached.data
  }

  // If no cache, return fallback immediately
  return fallback
}

function removeDuplicates(movies: any[]) {
  const seen = new Set()
  return movies.filter((movie) => {
    if (seen.has(movie.id)) return false
    seen.add(movie.id)
    return true
  })
}

export async function fetchNowPlaying(page = 1) {
  const data = await fetchWithInstantCache(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`,
    fallbackData.nowPlaying,
  )
  return { ...data, results: removeDuplicates(data.results || []) }
}

export async function fetchPopular(page = 1) {
  const data = await fetchWithInstantCache(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
    fallbackData.popular,
  )
  return { ...data, results: removeDuplicates(data.results || []) }
}

export async function fetchTopRated(page = 1) {
  const data = await fetchWithInstantCache(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`,
    fallbackData.topRated,
  )
  return { ...data, results: removeDuplicates(data.results || []) }
}

export async function fetchUpcoming(page = 1) {
  const data = await fetchWithInstantCache(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`,
    fallbackData.upcoming,
  )
  return { ...data, results: removeDuplicates(data.results || []) }
}

export async function fetchTrendingMovies() {
  const data = await fetchWithInstantCache(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`, fallbackData.popular)
  return { ...data, results: removeDuplicates(data.results || []) }
}

export async function fetchKidsContent() {
  const data = await fetchWithInstantCache(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10751,16&certification_country=US&certification.lte=G&sort_by=popularity.desc`,
    fallbackData.kids,
  )
  return { ...data, results: removeDuplicates(data.results || []) }
}

export async function fetchMoviesByGenre(genreId: number, page = 1) {
  const data = await fetchWithInstantCache(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,
    fallbackData.popular,
  )
  return { ...data, results: removeDuplicates(data.results || []) }
}

export async function searchMovies(query: string, page = 1) {
  if (!query.trim()) return { results: [] }

  const data = await fetchWithInstantCache(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
    { results: [] },
  )
  return { ...data, results: removeDuplicates(data.results || []) }
}

export async function fetchMovieDetails(movieId: number) {
  const fallbackDetails = {
    id: 950387,
    title: "A Minecraft Movie",
    poster_path: "/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
    backdrop_path: "/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
    vote_average: 6.08,
    overview:
      "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld.",
    release_date: "2025-03-31",
    runtime: 101,
    imdb_id: "tt3566834",
    genres: [
      { id: 10751, name: "Family" },
      { id: 35, name: "Comedy" },
      { id: 12, name: "Adventure" },
      { id: 14, name: "Fantasy" },
    ],
  }

  return fetchWithInstantCache(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`, fallbackDetails)
}

export async function fetchMovieCredits(movieId: number) {
  const fallbackCredits = {
    cast: [
      {
        id: 117642,
        name: "Jason Momoa",
        character: "Garrett",
        profile_path: "/6dEFBpZH8C8OijsynkSajQT99Pb.jpg",
      },
      {
        id: 70851,
        name: "Jack Black",
        character: "Steve",
        profile_path: "/9QKdFKfc3Zi5XwnQHrFukFMpo5o.jpg",
      },
    ],
    crew: [
      {
        id: 1234,
        name: "Jared Hess",
        job: "Director",
      },
    ],
  }

  return fetchWithInstantCache(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`, fallbackCredits)
}

export async function fetchSimilarMovies(movieId: number) {
  const fallbackSimilar = {
    results: [
      {
        id: 446893,
        title: "Trolls World Tour",
        poster_path: "/7W0G3YECgDAfnuiHG91r8WqgIOe.jpg",
        backdrop_path: "/qsxhnirlp7y4Ae9bd11oYJSX59j.jpg",
        vote_average: 7.285,
        overview:
          "Queen Poppy and Branch make a surprising discovery -- there are other Troll worlds beyond their own.",
        release_date: "2020-03-11",
        imdb_id: "tt6587640",
      },
    ],
  }

  const data = await fetchWithInstantCache(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`, fallbackSimilar)
  return { ...data, results: removeDuplicates(data.results || []) }
}

export function getImageUrl(path: string | null) {
  if (!path) return "/placeholder.svg?height=300&width=200"
  return `${IMAGE_BASE_URL}${path}`
}

export function getIMDBUrl(imdbId: string) {
  return `https://www.imdb.com/title/${imdbId}`
}

// Calculate match percentage based on genres and ratings
export function calculateMatchPercentage(movie: any, userPreferences: any) {
  let score = 0
  let maxScore = 0

  // Genre matching (40% weight)
  if (userPreferences.favoriteGenres?.length > 0) {
    const commonGenres =
      movie.genre_ids?.filter((id: number) => userPreferences.favoriteGenres.includes(id)).length || 0
    score += (commonGenres / userPreferences.favoriteGenres.length) * 40
  }
  maxScore += 40

  // Rating preference (30% weight)
  if (userPreferences.minRating) {
    const ratingScore = Math.min(movie.vote_average / userPreferences.minRating, 1) * 30
    score += ratingScore
  }
  maxScore += 30

  // Release year preference (20% weight)
  if (userPreferences.preferredYears?.length > 0) {
    const movieYear = new Date(movie.release_date).getFullYear()
    const yearMatch = userPreferences.preferredYears.includes(movieYear) ? 20 : 0
    score += yearMatch
  }
  maxScore += 20

  // Popularity boost (10% weight)
  const popularityScore = Math.min(movie.vote_average / 10, 1) * 10
  score += popularityScore
  maxScore += 10

  return Math.round((score / maxScore) * 100)
}
