"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  overview?: string
  release_date?: string
  backdrop_path?: string
  genre_ids?: number[]
  imdb_id?: string
}

interface MovieState {
  myList: Movie[]
  userRatings: { [movieId: number]: number }
  watchProgress: { [movieId: number]: number }
}

type MovieAction =
  | { type: "ADD_TO_LIST"; payload: Movie }
  | { type: "REMOVE_FROM_LIST"; payload: number }
  | { type: "LOAD_FROM_STORAGE"; payload: MovieState }
  | { type: "SET_USER_RATING"; payload: { movieId: number; rating: number } }
  | { type: "REMOVE_USER_RATING"; payload: number }
  | { type: "UPDATE_WATCH_PROGRESS"; payload: { movieId: number; progress: number } }

const MovieContext = createContext<{
  state: MovieState
  dispatch: React.Dispatch<MovieAction>
} | null>(null)

function movieReducer(state: MovieState, action: MovieAction): MovieState {
  console.log("Movie action:", action.type, action.payload) // Debug log

  switch (action.type) {
    case "ADD_TO_LIST":
      if (state.myList.some((movie) => movie.id === action.payload.id)) {
        return state
      }
      const newStateAdd = {
        ...state,
        myList: [...state.myList, action.payload],
      }
      console.log("Added to list, new state:", newStateAdd)
      return newStateAdd

    case "REMOVE_FROM_LIST":
      const newStateRemove = {
        ...state,
        myList: state.myList.filter((movie) => movie.id !== action.payload),
      }
      console.log("Removed from list, new state:", newStateRemove)
      return newStateRemove

    case "LOAD_FROM_STORAGE":
      return action.payload

    case "SET_USER_RATING":
      return {
        ...state,
        userRatings: {
          ...state.userRatings,
          [action.payload.movieId]: action.payload.rating,
        },
      }

    case "REMOVE_USER_RATING":
      const { [action.payload]: removed, ...remainingRatings } = state.userRatings
      return {
        ...state,
        userRatings: remainingRatings,
      }

    case "UPDATE_WATCH_PROGRESS":
      return {
        ...state,
        watchProgress: {
          ...state.watchProgress,
          [action.payload.movieId]: action.payload.progress,
        },
      }

    default:
      return state
  }
}

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(movieReducer, {
    myList: [],
    userRatings: {},
    watchProgress: {},
  })

  useEffect(() => {
    const savedList = localStorage.getItem("movieList")
    const savedRatings = localStorage.getItem("userRatings")
    const savedProgress = localStorage.getItem("watchProgress")

    if (savedList || savedRatings || savedProgress) {
      try {
        dispatch({
          type: "LOAD_FROM_STORAGE",
          payload: {
            myList: savedList ? JSON.parse(savedList) : [],
            userRatings: savedRatings ? JSON.parse(savedRatings) : {},
            watchProgress: savedProgress ? JSON.parse(savedProgress) : {},
          },
        })
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("movieList", JSON.stringify(state.myList))
  }, [state.myList])

  useEffect(() => {
    localStorage.setItem("userRatings", JSON.stringify(state.userRatings))
  }, [state.userRatings])

  useEffect(() => {
    localStorage.setItem("watchProgress", JSON.stringify(state.watchProgress))
  }, [state.watchProgress])

  return <MovieContext.Provider value={{ state, dispatch }}>{children}</MovieContext.Provider>
}

export function useMovieContext() {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error("useMovieContext must be used within MovieProvider")
  }
  return context
}
