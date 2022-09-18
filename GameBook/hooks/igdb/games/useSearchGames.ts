import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getGameCovers, searchGames } from '../../../igdb/api/games'
import { Game } from '../../../types/games/Game'

interface Props {
  searchText: string,
  platformSlug?: string 
}

export const useSearchGames = (props: Props): UseQueryResult<Game[]> => {
  const { searchText } = props

  return useQuery(['search-games', searchText], async (): Promise<Game[]> => {
    const gameResponses = await searchGames(searchText)
    const gameCoverResponses = await getGameCovers(gameResponses.map(gr => gr.id).filter(id => !!id))

    return gameResponses.map(gr => {
      return {
        igdbId: gr.id,
        slug: gr.slug,
        name: gr.name,
        coverImgId: gameCoverResponses?.find(gcr => gcr.game === gr.id)?.image_id || ''
      }
    })
  })
}