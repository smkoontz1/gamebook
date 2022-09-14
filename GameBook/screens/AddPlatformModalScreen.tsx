import { useState } from 'react'
import { ActivityIndicator, StyleSheet, View, Text, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData, DrawerLayoutAndroidComponent } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PlatformList } from '../components/Platforms/PlatformList'
import { useSearchPlatforms } from '../hooks/igdb/useSearchPlatforms'
import { StatusBar } from 'expo-status-bar'
import { Alert, Platform as HostPlatform } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { Platform } from '../types/platforms/Platform'
import { PlatformsScreenProps } from '../types/navigation'
import { LoadingSpinner } from '../components/Common/LoadingSpinner'
import { PlatformState } from '../types/state/PlatformStore'
import { usePlatformStore } from '../hooks/stores/usePlatformStore'

export default function AddPlatformModalScreen({ navigation }: PlatformsScreenProps<'AddPlatformModal'>) {
  const [searchText, setSearchText] = useState('')
  const [queryText, setQueryText] = useState('')
  const { addPlatform } = usePlatformStore()

  const addPlatformMutation = useMutation<PlatformState, unknown, number, unknown>(platformId => {
    return addPlatform(platformId)
  })

  const {
    isFetching: arePlatformsFetching,
    isError: isPlatformsError,
    error: platformsError,
    data: platforms
  } = useSearchPlatforms({ searchText: queryText })

  const showAlert = (platform: Platform) => {
    Alert.alert(
      'Add Platform',
      `${platform.name} will be added to your platform list.`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: async () => {
            addPlatformMutation.mutate(platform.igdbId)
            navigation.navigate('PlatformsList')
          }
        }
      ]
    )
  }

  if (platformsError) {
    console.error('Platforms error', JSON.stringify(platformsError))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(t) => setSearchText(t)}
          onSubmitEditing={(e) => setQueryText(e.nativeEvent.text)}
          value={searchText}
        />
      </View>
      {arePlatformsFetching
        ? <LoadingSpinner />
        : <PlatformList
            platforms={platforms}
            onPressed={showAlert}
          />
      }

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={HostPlatform.OS === 'ios' ? 'light' : 'auto'} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    width: '80%',
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10
  }
})