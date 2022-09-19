import { PlatformDetailsModalScreenProps, PlatformsScreenProps } from '../../types/navigation'
import { Alert, Platform as HostPlatform, StyleSheet, View, Text, Image, Pressable, FlatList, ListRenderItem } from 'react-native'
import { getPlatformDetailsImgLogoUrl } from '../../helpers/imageHelpers'
import { Category, Platform } from '../../types/platforms/Platform'
import { LabeledList } from '../../components/Common/LabeledList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation } from '@tanstack/react-query'
import { PlatformState } from '../../types/state/PlatformStore'
import { usePlatformStore } from '../../hooks/stores/usePlatformStore'
import { Button, Card, Paragraph } from 'react-native-paper'
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { KeyValuePair } from '../../types/common/KeyValuePair'

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

export default function PlatformDetailsModalScreen({ route, navigation }: PlatformDetailsModalScreenProps) {
  const { platform } = route.params
  const { details } = platform
  const gameCount = usePlatformStore((state) => state.platformState.platforms.find(p => p.platformIgdbId === platform.igdbId))?.gameIgdbIds?.length || 0
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
            navigation.goBack()
          }
        }
      ]
    )
  }
  
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
      value: gameCount.toString()
    }
  
  ]

  const platformDetailsImgLogoUrl = getPlatformDetailsImgLogoUrl(platform.logoImgId || '')
  const [platformLogoDimensions, setPlatformLogoDimensions] = useState({ width: 1, height: 1 })

  platform.logoImgId && Image.getSize(
    platformDetailsImgLogoUrl,
    (width, height) => setPlatformLogoDimensions({ width, height }),
    () => console.error('Error getting platform logo dimensions'))

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.logoContainer}>
          {platform.logoImgId
            ? <Card.Cover
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: platformLogoDimensions.width / platformLogoDimensions.height,
                  backgroundColor: 'white'
                }}
                source={{ uri: platformDetailsImgLogoUrl }}
              />
            : <FontAwesome
                name='gamepad'
                size={150}
                style={{ color: 'darkslategray' }}
              />}
        </View>
        <Card.Content>
          <LabeledList keyValuePairs={keyValuePairs} />
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            mode='contained'
            onPress={() => {
              navigation.goBack()
              navigation.navigate('Games', {
                screen: 'GamesList',
                params: { 
                  platformIgdbId: platform.igdbId,
                  platformSlug: platform.slug,
                  platformName: platform.name
                } 
              })
            }}
          >
            View Games
          </Button>
          <Button
            mode='outlined'
            onPress={() => showRemoveAlert(platform)}
          >
            Remove Platform
          </Button>
        </Card.Actions>
      </Card>

      <StatusBar style={HostPlatform.OS === 'ios' ? 'light' : 'auto'} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  card: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  logoContainer: {
    alignSelf: 'center',
    width: '60%',
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderRadius: 5
  },
  cardActions: {
    margin: 20
  }
})