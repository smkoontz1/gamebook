import { PlatformsScreenProps } from '../../types/navigation'
import { Pressable, StyleSheet } from 'react-native'
import { usePlatforms } from '../../hooks/igdb/platforms/usePlatforms'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PlatformList } from '../../components/Platforms/PlatformList'
import { LoadingSpinner } from '../../components/Common/LoadingSpinner'
import { usePlatformStore } from '../../hooks/stores/usePlatformStore'
import Colors from '../../constants/Colors'
import { List } from 'react-native-paper'
import { Platform } from '../../types/platforms/Platform'
import { Image, View, Text } from 'react-native'
import { getImgLogoUrl } from '../../helpers/imageHelpers'

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
  }
});