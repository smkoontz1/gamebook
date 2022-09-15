import { PlatformsScreenProps } from '../../types/navigation'

import { StyleSheet } from 'react-native'
import { usePlatforms } from '../../hooks/igdb/usePlatforms'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PlatformList } from '../../components/Platforms/PlatformList'
import { LoadingSpinner } from '../../components/Common/LoadingSpinner'
import { usePlatformStore } from '../../hooks/stores/usePlatformStore'
import colors from '../../constants/Colors'


export default function PlatformsListScreen({ navigation }: PlatformsScreenProps<'PlatformsList'>) {
  const platformIgdbIds = usePlatformStore((state) => state.platformState.platformIgdbIds)
  
  const {
    isFetching: arePlatformsFetching,
    isError: isPlatformsError,
    error: platformsError,
    data: platforms
  } = usePlatforms({ platformIdgbIds: platformIgdbIds || [] })
  
  return (
    <SafeAreaView style={styles.container}>
      {arePlatformsFetching
        ? <LoadingSpinner />
        : <PlatformList
            platforms={platforms}
            onPlatformPressed={(platform) => {
               navigation.navigate('PlatformDetailsModal', { platform })
            }}
          />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.appBackground
  }
});