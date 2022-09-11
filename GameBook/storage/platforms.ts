import AsyncStorage from '@react-native-async-storage/async-storage'
import { StoredPlatforms } from '../types/storage/platforms/StoredPlatforms'

const STORAGE_KEYS = {
  PLATFORMS: 'platforms'
}

export const addPlatform = async (platformIgdbId: number): Promise<StoredPlatforms> => {
  const currentPlatformIgdbIds = await getPlatformIgdbIds()

  const newPlatformStorage: StoredPlatforms = {
    platformIgdbIds: [
      ...currentPlatformIgdbIds,
      platformIgdbId
    ]
  }

  // const newPlatformStorage: StoredPlatforms = {
  //   platformIgdbIds: []
  // }

  await AsyncStorage.setItem(STORAGE_KEYS.PLATFORMS, JSON.stringify(newPlatformStorage))

  return newPlatformStorage
}

export const getPlatformIgdbIds = async (): Promise<number[]> => {
  const platformStorageJson = await AsyncStorage.getItem(STORAGE_KEYS.PLATFORMS)
  const platformStorage: StoredPlatforms = JSON.parse(platformStorageJson || '')

  return platformStorage?.platformIgdbIds || []
}