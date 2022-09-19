
interface GameDetails {
  aggregated_rating: number
  category: number // TODO
  first_release_date: number
  summary: string
}

export interface Game {
  igdbId: number,
  slug: string,
  name: string,
  coverImgId: string
  details?: GameDetails
}