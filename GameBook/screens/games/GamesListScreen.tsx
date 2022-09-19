import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GamesScreenProps } from '../../types/navigation'
import { usePlatformStore } from '../../hooks/stores/usePlatformStore'
import { useGames } from '../../hooks/igdb/games/useGames'
import { LoadingSpinner } from '../../components/Common/LoadingSpinner'
import { GamesList } from '../../components/Games/GamesList'

export default function GamesListScreen({ route, navigation }: GamesScreenProps<'GamesList'>) {
  const { platformIgdbId = 0, platformName = '' } = route?.params || {}

  const storedGameIgdbIds = usePlatformStore((state) => state.platformState.platforms.find(p => p.platformIgdbId === platformIgdbId)?.gameIgdbIds) || []

  const {
    isFetching: areGamesFetching,
    isError: isGamesError,
    error: gamesError,
    data: games
  } = useGames({ gameIgdbs: storedGameIgdbIds })

  return (
    <SafeAreaView style={styles.container}>
      {areGamesFetching
        ? <LoadingSpinner />
        : <GamesList
            games={games}
            onGamePressed={(game) => navigation.navigate('GameDetailsModal', { game, platformIgdbId, platformName })}
          />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  }
})