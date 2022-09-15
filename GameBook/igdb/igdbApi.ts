import axios from 'axios'
import { ACCESS_TOKEN, CLIENT_ID } from '../constants/TEMP'
import { PlatformLogoResponse } from '../hooks/igdb/usePlatformLogos'
import { PlatformResponse } from '../types/igdb/responses/PlatformResponse'

export async function getPlatforms(platformIdgbIds: number[]): Promise<PlatformResponse[]> {
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
    where id = (${platformIdgbIds?.join(',')});
  `
  
  const response = await axios.post<PlatformResponse[]>(
    '/platforms',
    requestBody,
    {
      baseURL: 'https://api.igdb.com/v4',
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
      baseURL: 'https://api.igdb.com/v4',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Client-ID': CLIENT_ID
      }
    }
  )

  return response?.data
}

export async function searchPlatforms(searchText: string): Promise<PlatformResponse[]> {
  const QUERY_FIELDS = [
    'id',
    'abbreviation',
    'alternative_name',
    'category',
    'generation',
    'name',
    'platform_logo',
    'platform_family',
    'slug'
  ]

  const requestBody = `
    search:"${searchText}";
    fields ${QUERY_FIELDS.join(',')};
    limit 20;
  `

  console.log('Searching', requestBody)

  const response = await axios.post<PlatformResponse[]>(
    '/platforms',
    requestBody,
    {
      baseURL: 'https://api.igdb.com/v4',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Client-ID': CLIENT_ID
      }
    }
  )

  return response?.data
}