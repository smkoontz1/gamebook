import { useState } from 'react'
import { ActivityIndicator, StyleSheet, View, Text, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData, DrawerLayoutAndroidComponent, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PlatformsList } from '../../components/Platforms/PlatformList'
import { useSearchPlatforms } from '../../hooks/igdb/platforms/useSearchPlatforms'
import { StatusBar } from 'expo-status-bar'
import { Alert, Platform as HostPlatform } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { Platform } from '../../types/platforms/Platform'
import { PlatformsScreenProps } from '../../types/navigation'
import { LoadingSpinner } from '../../components/Common/LoadingSpinner'
import { PlatformState } from '../../types/state/PlatformStore'
import { usePlatformStore } from '../../hooks/stores/usePlatformStore'
import Colors from '../../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { Searchbar } from 'react-native-paper'

export default function AddPlatformModalScreen({ navigation }: PlatformsScreenProps<'AddPlatformModal'>) {
  const [searchText, setSearchText] = useState('')
  const [queryText, setQueryText] = useState('')
  const { addPlatform } = usePlatformStore()
  
  const {
    isFetching: arePlatformsFetching,
    isError: isPlatformsError,
    error: platformsError,
    data: platforms
  } = useSearchPlatforms({ searchText: queryText })
  
  const addPlatformMutation = useMutation<PlatformState, unknown, number, unknown>(platformIgdbId => {
    return addPlatform(platformIgdbId)
  })

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
      <Searchbar
        style={styles.searchbar}
        placeholder='Search'
        placeholderTextColor={'gray'}
        onChangeText={(t) => setSearchText(t)}
        onSubmitEditing={(e) => setQueryText(e.nativeEvent.text)}
        value={searchText}
      />
      {arePlatformsFetching
        ? <LoadingSpinner />
        : <ScrollView>
            <PlatformsList
              platforms={platforms}
              onPlatformPressed={showAlert}
            />
          </ScrollView>
      }

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={HostPlatform.OS === 'ios' ? 'light' : 'auto'} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchbar: {
    marginBottom: 20
  }
})