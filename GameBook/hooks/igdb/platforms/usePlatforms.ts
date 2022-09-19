import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Platform } from '../../../types/platforms/Platform'
import { getPlatformLogos, getPlatforms } from '../../../igdb/api/platforms'
import fp from 'lodash/fp'

interface Props {
  platformIgdbIds: number[]
}

export const usePlatforms = (props: Props): UseQueryResult<Platform[]> => {
  const { platformIgdbIds } = props
  
  return useQuery(['platforms', platformIgdbIds], async (): Promise<Platform[]> => {
    const platformResponses = await getPlatforms(platformIgdbIds)
    const platformLogoResponses
      = await getPlatformLogos(platformResponses.map(pr => pr.platform_logo).filter(id => !!id))

    const platforms: Platform[] = platformResponses.map(pr => {
      return {
        igdbId: pr.id,
        slug: pr.slug,
        name: pr.name,
        logoImgId: platformLogoResponses?.find(plr => plr.id === pr.platform_logo)?.image_id || '',
        details: {
          category: pr.category,
          generation: pr.generation,
          summary: pr.summary
        }
      }
    })

    return fp.sortBy('name', platforms)
  },
  {
    enabled: platformIgdbIds?.length > 0
  })
}