import { GamesScreenProps } from '../../types/navigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert, Platform as HostPlatform, Text, StyleSheet, ScrollView } from 'react-native'
import { useSearchGames } from '../../hooks/igdb/games/useSearchGames'
import { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { LoadingSpinner } from '../../components/Common/LoadingSpinner'
import { GamesList } from '../../components/Games/GamesList'
import { Game } from '../../types/games/Game'
import { usePlatformStore } from '../../hooks/stores/usePlatformStore'
import { useMutation } from '@tanstack/react-query'
import { PlatformState } from '../../types/state/PlatformStore'
import { StatusBar } from 'expo-status-bar'

interface AddGameMutationVariables {
  gameIgdbId: number,
  platformIgdbId: number
}

export default function AddGameModalScreen({ route, navigation }: GamesScreenProps<'AddGameModal'>) {
  const { platformIgdbId, platformName, platformSlug } = route.params
  const [searchText, setSearchText] = useState('')
  const [queryText, setQueryText] = useState('')
  const { addGame } = usePlatformStore()

  const {
    isFetching: areGamesFetching,
    isError: isGamesError,
    error: gamesError,
    data: games
  } = useSearchGames({ searchText: queryText, platformSlug: platformSlug })

  const addGameMutation = useMutation<PlatformState, unknown, AddGameMutationVariables, unknown>(addGameMutationVars => {
    const { gameIgdbId, platformIgdbId } = addGameMutationVars
    
    return addGame(gameIgdbId, platformIgdbId)
  })

  const showAlert = (game: Game) => {
    Alert.alert(
      'Add Game',
      `${game.name} will be added to your ${platformName} game list.`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: async () => {
            addGameMutation.mutate({ gameIgdbId: game.igdbId, platformIgdbId: platformIgdbId || 0 })
            navigation.navigate('GamesList', { platformIgdbId, platformSlug, platformName })
          }
        }
      ]
    )
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
      {areGamesFetching
        ? <LoadingSpinner />
        : <ScrollView>
            <GamesList
              games={games}
              onGamePressed={showAlert}
            />
          </ScrollView>}

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