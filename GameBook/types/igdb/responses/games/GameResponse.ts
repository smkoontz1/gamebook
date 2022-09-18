export interface GameResponse {
  id: number,
  aggregated_rating: number,
  artworks: number[],
  category: number,
  collection: number,
  cover: number,
  first_release_date: number,
  franchise: number,
  game_modes: number[],
  genres: number[],
  name: string,
  platforms: number[],
  screenshots: number[],
  slug: string,
  summary: string
}