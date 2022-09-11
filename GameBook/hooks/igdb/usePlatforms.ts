import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Platform } from '../../types/platforms/Platform'
import { getPlatformLogos, getPlatforms } from '../../igdb/igdbApi'

interface Props {
  platformIdgbIds: number[]
}

export const usePlatforms = (props: Props): UseQueryResult<Platform[]> => {
  const { platformIdgbIds } = props
  
  return useQuery(['platforms', platformIdgbIds], async (): Promise<Platform[]> => {
    console.log('Getting platforms with', platformIdgbIds)
    const platformResponses = await getPlatforms(platformIdgbIds)
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
    enabled: platformIdgbIds?.length > 0
  })
}