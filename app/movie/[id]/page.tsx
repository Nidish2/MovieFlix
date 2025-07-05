import { notFound } from "next/navigation"
import { NetflixLayout } from "@/components/netflix-layout"
import { MovieDetailsPage } from "@/components/movie-details-page"

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function Page({ params }: MoviePageProps) {
  const movieId = Number.parseInt(params.id)

  if (isNaN(movieId)) {
    notFound()
  }

  return (
    <NetflixLayout>
      <MovieDetailsPage movieId={movieId} />
    </NetflixLayout>
  )
}
