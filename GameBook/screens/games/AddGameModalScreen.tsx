import { GamesScreenProps } from '../../types/navigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { useSearchGames } from '../../hooks/igdb/games/useSearchGames'
import { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { LoadingSpinner } from '../../components/Common/LoadingSpinner'
import { GameList } from '../../components/Games/GameList'

export default function AddGameModalScreen({ route, navigation }: GamesScreenProps<'AddGameModal'>) {
  const { platformSlug } = route.params
  const [searchText, setSearchText] = useState('')
  const [queryText, setQueryText] = useState('')

  const {
    isFetching: areGamesFetching,
    isError: isGamesError,
    error: gamesError,
    data: games
  } = useSearchGames({ searchText: queryText })

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
            <GameList
              games={games}
              onGamePressed={(game) => console.log('Pressed ', game.name)}
            />
          </ScrollView>}
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