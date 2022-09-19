import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getGameCovers, getGames } from '../../../igdb/api/games'
import { Game } from '../../../types/games/Game'
import fp from 'lodash/fp'

interface Props {
  gameIgdbs: number[]
}

export const useGames = (props: Props): UseQueryResult<Game[]> => {
  const { gameIgdbs } = props

  return useQuery(['games', gameIgdbs], async (): Promise<Game[]> => {
    const gameResponses = await getGames(gameIgdbs)
    const gameCoverResponses = await getGameCovers(gameResponses.map(gr => gr.id).filter(id => !!id))

    const games: Game[] = gameResponses.map(gr => {
      return {
        igdbId: gr.id,
        slug: gr.slug,
        name: gr.name,
        coverImgId: gameCoverResponses?.find(gcr => gcr.game === gr.id)?.image_id || '',
        details: {
          aggregated_rating: gr.aggregated_rating,
          category: gr.category,
          first_release_date: gr.first_release_date,
          summary: gr.summary
        }
      }
    })

    return fp.sortBy('name', games)
  },
  {
    enabled: gameIgdbs?.length > 0
  })
}