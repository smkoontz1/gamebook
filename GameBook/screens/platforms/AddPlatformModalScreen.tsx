import { useState } from 'react'
import { ActivityIndicator, StyleSheet, View, Text, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData, DrawerLayoutAndroidComponent } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PlatformList } from '../../components/Platforms/PlatformList'
import { useSearchPlatforms } from '../../hooks/igdb/useSearchPlatforms'
import { StatusBar } from 'expo-status-bar'
import { Alert, Platform as HostPlatform } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { Platform } from '../../types/platforms/Platform'
import { PlatformsScreenProps } from '../../types/navigation'
import { LoadingSpinner } from '../../components/Common/LoadingSpinner'
import { PlatformState } from '../../types/state/PlatformStore'
import { usePlatformStore } from '../../hooks/stores/usePlatformStore'
import colors from '../../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'

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
      <View style={styles.inputContainer}>
        <FontAwesome
          name='search'
          size={25}
          color={'black'}
          style={styles.searchIcon}
        />
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
            onPlatformPressed={showAlert}
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
    paddingHorizontal: 20,
    backgroundColor: colors.appBackground
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  searchIcon: {
    flex: 1,
  },
  input: {
    flex: 8,
    height: 40,
    width: '100%',
    marginTop: 12,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  }
})