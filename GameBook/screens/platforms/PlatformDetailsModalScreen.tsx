import { PlatformsScreenProps } from '../../types/navigation'
import { Alert, Platform as HostPlatform, StyleSheet, View, Text, Image, Pressable, FlatList, ListRenderItem } from 'react-native'
import { getPlatformDetailsImgLogoUrl } from '../../helpers/imageHelpers'
import { Button } from '@rneui/themed'
import { Category, Platform } from '../../types/platforms/Platform'
import { LabeledList } from '../../components/Common/LabeledList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation } from '@tanstack/react-query'
import { PlatformState } from '../../types/state/PlatformStore'
import { usePlatformStore } from '../../hooks/stores/usePlatformStore'

const getCategoryString = (category: Category) => {
  switch (category) {
    case Category.Console:
      return 'Console'
    case Category.Arcade:
      return 'Arcade'
    case Category.Platform:
      return 'Platform'
    case Category.OperatingSystem:
      return 'Operating System'
    case Category.PortableConsole:
      return 'Portable Console'
    case Category.Computer:
      return 'Computer'
    default:
      return 'Unknown'
  }
}

interface KeyValuePair<TKey, TValue> {
  key: TKey,
  value: TValue
}

export default function PlatformDetailsModalScreen({ route, navigation }: PlatformsScreenProps<'PlatformDetailsModal'>) {
  const { platform } = route.params
  const { details } = platform
  const { deletePlatform } = usePlatformStore()
   
  const removePlatformMutation = useMutation<PlatformState, unknown, number, unknown>(platformIgdbId => {
    return deletePlatform(platformIgdbId)
  })

  const showRemoveAlert = (platform: Platform) => {
    Alert.alert(
      'Remove Platform',
      `${platform.name} will be removed from your platform list.`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            removePlatformMutation.mutate(platform.igdbId)
            navigation.navigate('PlatformsList')
          }
        }
      ]
    )
  }

  // TODO
  const gamesOwned = 24

  const keyValuePairs: KeyValuePair<string, string>[] = [
    {
      key: 'Category',
      value: getCategoryString(details?.category || 0)
    },
    {
      key: 'Generation',
      value: details?.generation?.toString() || ''
    },
    {
      key: 'Games Owned',
      value: gamesOwned.toString()
    }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: getPlatformDetailsImgLogoUrl(platform.logoImgId || '')
        }}
      />

      <LabeledList keyValuePairs={keyValuePairs}/>
      
      <View style={styles.buttonsContainer}>
        <Button
          title={'View Games'}
          size='lg'
          style={styles.button}
        />
        <Button
          title={'Remove Platform'}
          size='lg'
          style={styles.button}
          onPress={() => showRemoveAlert(platform)}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  logoContainer: {
    marginBottom: 40
  },
  logo: {
    width: '50%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 40
  },
  button: {
    marginVertical: 5
  },
  buttonsContainer: {
    width: '60%',
    margin: 40
  },
  listItemRow: {
    flexDirection: 'row',
    marginVertical: 5
  },
  listItemLabelContainer: {
    flex: 1,
    marginRight: 5,
    alignItems: 'flex-end'
  },
  listItemValueContainer: {
    flex: 1,
    marginLeft: 5,
    alignItems: 'flex-start'
  }
})