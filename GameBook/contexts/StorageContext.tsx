import React from 'react'
import { StoredPlatforms } from '../types/storage/platforms/StoredPlatforms'

export interface Storage {
  platforms: StoredPlatforms
}

export interface StorageContext {
  storage: Storage,
  setNewStorage: (newStorage: Storage) => void
}

export const StorageContext = React.createContext<StorageContext>({
  storage: {} as Storage,
  setNewStorage: () => {}
})