
export interface PlatformState {
  platformIgdbIds: number[]
}

export interface PlatformStore {
  _platformStateHydrated: boolean,
  setPlatformStateHydrated: () => void
  platformState: PlatformState,
  addPlatform: (newPlatformIgdbId: number) => Promise<PlatformState>
  deletePlatform: (platformIdbId: number) => Promise<PlatformState>
}