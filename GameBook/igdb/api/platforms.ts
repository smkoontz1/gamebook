import axios from 'axios'
import { ACCESS_TOKEN, CLIENT_ID, IGDB_API_BASE_URL } from '../../constants/TEMP'
import { PlatformLogoResponse } from '../../types/igdb/responses/platforms/PlatformLogoResponse'
import { PlatformResponse } from '../../types/igdb/responses/platforms/PlatformResponse'

export async function getPlatforms(platformIgdbIds: number[]): Promise<PlatformResponse[]> {
  const QUERY_FIELDS = [
    'id',
    'abbreviation',
    'alternative_name',
    'category',
    'generation',
    'name',
    'platform_family',
    'platform_logo',
    'slug',
    'summary'
  ]
  
  const requestBody = `
    fields ${QUERY_FIELDS.join(',')};
    where id = (${platformIgdbIds?.join(',')});
  `
  
  const response = await axios.post<PlatformResponse[]>(
    '/platforms',
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

export async function getPlatformLogos(platformLogoIgdbIds: number[]): Promise<PlatformLogoResponse[]> {
  if (platformLogoIgdbIds.length <= 0) {
    return []
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

  const requestBody = `
    fields ${QUERY_FIELDS.join(',')};
    where id = (${platformLogoIgdbIds.join(',')});
  `

  const response = await axios.post<PlatformLogoResponse[]>(
    '/platform_logos',
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

export async function searchPlatforms(searchText: string): Promise<Partial<PlatformResponse>[]> {
  const QUERY_FIELDS = [
    'id',
    'name',
    'platform_logo'
  ]

  const requestBody = `
    search:"${searchText}";
    fields ${QUERY_FIELDS.join(',')};
    limit 20;
  `

  const response = await axios.post<Partial<PlatformResponse>[]>(
    '/platforms',
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