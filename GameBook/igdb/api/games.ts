import axios from 'axios'
import { ACCESS_TOKEN, CLIENT_ID, IGDB_API_BASE_URL } from '../../constants/TEMP'
import { GameCoverResponse } from '../../types/igdb/responses/games/GameCoverResponse'
import { GameResponse } from '../../types/igdb/responses/games/GameResponse'

export async function getGames(gameIgdbIds: number[]): Promise<GameResponse[]> {
  const QUERY_FIELDS = [
    'aggregated_rating',
    'artworks',
    'category',
    'collection',
    'cover',
    'first_release_date',
    'franchise',
    'game_modes',
    'genres',
    'name',
    'platforms',
    'screenshots',
    'storyline',
    'summary'
  ]

  const requestBody = `
    fields ${QUERY_FIELDS.join(',')};
    where id = (${gameIgdbIds?.join(',')});
  `

  console.log('Get games request', requestBody)

  const response = await axios.post<GameResponse[]>(
    '/games',
    requestBody,
    {
      baseURL: IGDB_API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Client-ID': CLIENT_ID
      }
    }
  )

  return response?.data
}

export async function getGameCovers(gameCoverIgdbIds: number[]): Promise<GameCoverResponse[]> {
  if (gameCoverIgdbIds.length <= 0) {
    return []
  }

  const QUERY_FIELDS = [
    'alpha_channel',
    'animated',
    'game',
    'height',
    'image_id',
    'url',
    'width'
  ]

  const requestBody = `
    fields ${QUERY_FIELDS.join(',')};
    where game = (${gameCoverIgdbIds.join(',')});
  `

  const response = await axios.post<GameCoverResponse[]>(
    '/covers',
    requestBody,
    {
      baseURL: IGDB_API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Client-ID': CLIENT_ID
      }
    }
  )

  return response?.data
}

export async function searchGames(searchText: string, platformSlug?: string): Promise<GameResponse[]> {
  const QUERY_FIELDS = [
    'aggregated_rating',
    'artworks',
    'category',
    'collection',
    'cover',
    'first_release_date',
    'franchise',
    'game_modes',
    'genres',
    'name',
    'platforms',
    'screenshots',
    'storyline',
    'summary'
  ]

  const requestBody = `
    search:"${searchText}";
    ${platformSlug ? `where platforms.slug = "${platformSlug}";` : ''}
    fields ${QUERY_FIELDS.join(',')};
    limit 20;
  `
  const response = await axios.post<GameResponse[]>(
    '/games',
    requestBody,
    {
      baseURL: IGDB_API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Client-ID': CLIENT_ID
      }
    }
  )

  return response?.data
}