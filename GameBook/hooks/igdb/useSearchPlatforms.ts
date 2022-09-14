import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getPlatformLogos, searchPlatforms } from '../../igdb/igdbApi'
import { Platform } from '../../types/platforms/Platform'


interface Props {
  searchText: string
}

export const useSearchPlatforms = (props: Props): UseQueryResult<Platform[]> => {
  const { searchText } = props
  
  return useQuery(['platforms', searchText], async (): Promise<Platform[]> => {
    const platformResponses = await searchPlatforms(searchText)
    const platformLogoResponses = await getPlatformLogos(platformResponses.map(pr => pr.platform_logo).filter(id => !!id))

    return platformResponses.map(pr => {
      return {
        igdbId: pr.id,
        name: pr.name,
        logoImgId: platformLogoResponses?.find(plr => plr.id === pr.platform_logo)?.image_id || ''
      }
    })
  },
  {
    enabled: !!searchText
  })
}