import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getPlatformIgdbIds } from '../../storage/platforms'

export const useStoredPlatformIgdbIds = (): UseQueryResult<number[]> => {
  return useQuery(['stored-platforms'], async () => {
    return await getPlatformIgdbIds()
  })
}