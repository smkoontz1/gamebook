import { PlatformsScreenProps } from '../types/navigation'

import { StyleSheet, Text } from 'react-native'
import { usePlatforms } from '../hooks/igdb/usePlatforms'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PlatformList } from '../components/Platforms/PlatformList'
import { useStoredPlatformIgdbIds } from '../hooks/storage/useStoredPlatformIgdbIds'
import { useStorageContext } from '../hooks/contexts/useStorageContext'
import { useEffect, useState } from 'react'
import { Platform } from '../types/platforms/Platform'
import { LoadingSpinner } from '../components/Common/LoadingSpinner'


export default function PlatformsListScreen({ route, navigation }: PlatformsScreenProps<'PlatformsList'>) {
  const { storedPlatforms } = route.params

  const {
    isFetching: arePlatformsFetching,
    isError: isPlatformsError,
    error: platformsError,
    data: platforms
  } = usePlatforms({ platformIdgbIds: storedPlatforms?.platformIgdbIds || [] })
  
  return (
    <SafeAreaView style={styles.container}>
      {arePlatformsFetching
        ? <LoadingSpinner />
        : <PlatformList platforms={platforms} />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});