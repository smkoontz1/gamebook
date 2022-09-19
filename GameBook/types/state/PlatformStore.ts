
export interface StoredPlatform {
  platformIgdbId: number
  gameIgdbIds: number[]
}

export interface PlatformState {
  platforms: StoredPlatform[]
}

export interface PlatformStore {
  _platformStateHydrated: boolean,
  setPlatformStateHydrated: () => void
  platformState: PlatformState,
  addPlatform: (newPlatformIgdbId: number) => Promise<PlatformState>
  deletePlatform: (platformIdbId: number) => Promise<PlatformState>
  addGame: (newGameIgdbId: number, platformIgdbId: number) => Promise<PlatformState>
  deleteGame: (gameIgdbId: number, platformIgdbId: number) => Promise<PlatformState>
}