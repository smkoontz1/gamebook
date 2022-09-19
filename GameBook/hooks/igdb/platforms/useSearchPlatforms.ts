import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getPlatformLogos, searchPlatforms } from '../../../igdb/api/platforms'
import { Platform } from '../../../types/platforms/Platform'
import fp from 'lodash/fp'

interface Props {
  searchText: string
}

export const useSearchPlatforms = (props: Props): UseQueryResult<Platform[]> => {
  const { searchText } = props
  
  return useQuery(['search-platforms', searchText], async (): Promise<Platform[]> => {
    const platformResponses = await searchPlatforms(searchText)
    const platformLogoResponses =
      await getPlatformLogos(platformResponses.map(pr => pr.platform_logo || 0).filter(id => !!id))

    const platforms = platformResponses.map(pr => {
      return {
        igdbId: pr.id || 0,
        slug: pr.slug || '',
        name: pr.name || '',
        logoImgId: platformLogoResponses?.find(plr => plr.id === pr.platform_logo)?.image_id || ''
      }
    })

    return fp.sortBy('name', platforms)
  },
  {
    enabled: !!searchText
  })
}