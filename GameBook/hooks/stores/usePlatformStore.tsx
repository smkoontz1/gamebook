import create from 'zustand'
import { persist } from 'zustand/middleware'
import { PlatformStore } from '../../types/state/PlatformStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ASYNC_STORAGE_KEYS = {
  PLATFORM_STATE: 'platform-state'
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
        platformIgdbIds: []
      },
      addPlatform: async (newPlatformIgdbId) => {
        const platformState = get().platformState

        set({
          platformState: {
            ...platformState,
            platformIgdbIds: [
              ...platformState?.platformIgdbIds,
              newPlatformIgdbId]
          }
        })

        return platformState
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