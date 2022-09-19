import { PlatformsScreenProps } from '../../types/navigation'
import { Pressable, StyleSheet } from 'react-native'
import { usePlatforms } from '../../hooks/igdb/platforms/usePlatforms'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PlatformsList } from '../../components/Platforms/PlatformList'
import { LoadingSpinner } from '../../components/Common/LoadingSpinner'
import { usePlatformStore } from '../../hooks/stores/usePlatformStore'

export default function PlatformsListScreen({ navigation }: PlatformsScreenProps<'PlatformsList'>) {
  const storedPlatforms = usePlatformStore((state) => state.platformState.platforms)
  const storedPlatformIgdbIds = storedPlatforms?.map(sp => sp.platformIgdbId) || []

  const {
    isFetching: arePlatformsFetching,
    isError: isPlatformsError,
    error: platformsError,
    data: platforms
  } = usePlatforms({ platformIgdbIds: storedPlatformIgdbIds })
  
  return (
    <SafeAreaView style={styles.container}>
      {arePlatformsFetching
        ? <LoadingSpinner />
        : <PlatformsList
            platforms={platforms}
            onPlatformPressed={(platform) => navigation.navigate('PlatformDetailsModal', { platform })}
          />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  }
});