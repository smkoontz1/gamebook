import axios from 'axios'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { ACCESS_TOKEN, CLIENT_ID } from '../../constants/TEMP'

export interface PlatformLogoResponse {
  id: number,
  alpha_channel: boolean,
  animated: boolean,
  height: number,
  image_id: string,
  url: string,
  width: number,
}

const QUERY_FIELDS = [
  'id',
  'alpha_channel',
  'animated',
  'height',
  'image_id',
  'url',
  'width'
]

interface Props {
  platformLogoIds: number[]
}

// export const usePlatformLogos = (props: Props): UseQueryResult<PlatformLogoResponse[]> => {
//   const { platformLogoIds } = props

//   console.log('Fetching logos for', JSON.stringify(platformLogoIds))

//   const requestBody = `
//     fields ${QUERY_FIELDS.join(',')};
//     where id = (${platformLogoIds.join(',')});
//   `

//   return useQuery(['platform_logos', platformLogoIds], async () => {
//     console.log('Executing request')
    
//     const response = await axios.post<PlatformLogoResponse[]>(
//       '/platform_logos',
//       requestBody,
//       {
//         baseURL: 'https://api.igdb.com/v4',
//         headers: {
//           'Authorization': `Bearer ${ACCESS_TOKEN}`,
//           'Client-ID': CLIENT_ID
//         }
//       }
//     )
    
//     console.log(response.request)


//     return response?.data
//   },
//   {
//     enabled: platformLogoIds?.length > 0
//   })
// }