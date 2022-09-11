import { useCallback, useState } from 'react'
import { Storage, StorageContext } from '../../contexts/StorageContext'

export const useStorageContext = (): StorageContext => {
  const [storage, setStorage] = useState<Storage>(
    {} as Storage
  )
  
  const setNewStorage = useCallback((newStorage: Storage): void => {
    setStorage(newStorage)
  }, [])

  return {
    storage,
    setNewStorage
  }
}