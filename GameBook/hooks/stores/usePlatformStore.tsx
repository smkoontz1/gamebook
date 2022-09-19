import create from 'zustand'
import { persist } from 'zustand/middleware'
import { PlatformState, PlatformStore } from '../../types/state/PlatformStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ASYNC_STORAGE_KEYS = {
  PLATFORM_STATE: 'platform-state'
}

const addPlatform = (newPlatformIgdbId: number, platformState: PlatformState): PlatformState => {
  return {
    ...platformState,
    platforms: [
      ...platformState?.platforms,
      {
        platformIgdbId: newPlatformIgdbId,
        gameIgdbIds: []
      }
    ]
  }
}

const deletePlatform = (platformIgdbId: number, platformState: PlatformState): PlatformState => {
  const newPlatforms = platformState.platforms.filter(p => p.platformIgdbId !== platformIgdbId) || []
  
  return {
    ...platformState,
    platforms: newPlatforms
  }
}

const addGame = (gameIgdbId: number, platformIgdbId: number, platformState: PlatformState): PlatformState => {
  const platform = platformState.platforms.find(p => p.platformIgdbId === platformIgdbId)
  
  if (platform) {
    platform.gameIgdbIds = [
      ...platform.gameIgdbIds,
      gameIgdbId
    ]
  }

  return platformState
}

const deleteGame = (gameIgdbId: number, platformIgdbId: number, platformState: PlatformState): PlatformState => {
  const platform = platformState.platforms.find(p => p.platformIgdbId === platformIgdbId)

  if (platform) {
    platform.gameIgdbIds = platform.gameIgdbIds.filter(id => id !== gameIgdbId)
  }

  return platformState
}

export const usePlatformStore = create<PlatformStore, [['zustand/persist', PlatformStore]]>(
  persist(
    (set, get) => ({
      _platformStateHydrated: false,
      setPlatformStateHydrated: () => {
        set({
          _platformStateHydrated: true
        })
      },
      platformState: {
        platforms: []
      },
      addPlatform: async (newPlatformIgdbId) => {
        const newPlatformState = addPlatform(newPlatformIgdbId, get().platformState)
        
        set({ platformState: newPlatformState })
        return newPlatformState
      },
      deletePlatform: async (platformIgdbId) => {
        const newPlatformState = deletePlatform(platformIgdbId, get().platformState)

        set({ platformState: newPlatformState })
        return newPlatformState
      },
      addGame: async (newGameIgdbId, platformIgdbId) => {
        const newPlatformState = addGame(newGameIgdbId, platformIgdbId, get().platformState)

        set({ platformState: newPlatformState })
        return newPlatformState
      },
      deleteGame: async (gameIgdbId, platformIgdbId) => {
        const newPlatformState = deleteGame(gameIgdbId, platformIgdbId, get().platformState)

        set({ platformState: newPlatformState })
        return newPlatformState
      }
    }),
    {
      name: ASYNC_STORAGE_KEYS.PLATFORM_STATE,
      getStorage: () => AsyncStorage,
      onRehydrateStorage:() => (state) => {
        state?.setPlatformStateHydrated()
      }
    }
  )
)