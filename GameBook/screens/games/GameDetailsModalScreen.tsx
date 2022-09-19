import { Button, Card, Paragraph } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GamesScreenProps } from '../../types/navigation'
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native'
import { getBigGameCoverImageUrl } from '../../helpers/imageHelpers'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { PlatformState } from '../../types/state/PlatformStore'
import { usePlatformStore } from '../../hooks/stores/usePlatformStore'
import { Game } from '../../types/games/Game'

interface RemoveGameMutationVariables {
  gameIgdbId: number,
  platformIgdbId: number
}

export default function GameDetailsModalScreen({ route, navigation }: GamesScreenProps<'GameDetailsModal'>) {
  const { game, platformIgdbId, platformName } = route.params
  const { deleteGame } = usePlatformStore()

  const removeGameMutation = useMutation<PlatformState, unknown, RemoveGameMutationVariables, unknown>(removeGameMutationVars => {
    const { gameIgdbId, platformIgdbId } = removeGameMutationVars

    return deleteGame(gameIgdbId, platformIgdbId)
  })

  const showRemoveAlert = (game: Game) => {
    Alert.alert(
      'Remove Game',
      `${game.name} will be removed from your ${platformName} game list.`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            removeGameMutation.mutate({ gameIgdbId: game.igdbId, platformIgdbId })
            navigation.goBack()
          }
        }
      ]
    )
  }

  const gameCoverImgUrl = getBigGameCoverImageUrl(game.coverImgId || '')
  const [gameCoverDimensions, setGameCoverDimensions] = useState({ width: 1, height: 1 })

  game.coverImgId && Image.getSize(
    gameCoverImgUrl,
    (width, height) => setGameCoverDimensions({ width, height }),
    () => console.error('Error getting game cover dimensions')
  )

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.coverContainer}>
          <Card.Cover
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: gameCoverDimensions.width / gameCoverDimensions.height,
            }}
            source={{uri: gameCoverImgUrl }}
          />
        </View>
        <ScrollView style={styles.cardContentContainer}>
          <Card.Content>
            <Paragraph>{game.details?.summary}</Paragraph>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button
              mode='outlined'
              onPress={() => showRemoveAlert(game)}
            >
              Remove Game
            </Button>
          </Card.Actions>
        </ScrollView>
      </Card>
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
    alignItems: 'center'
  },
  cardContentContainer: {
    flexDirection: 'column',
    marginBottom: 20
  },
  coverContainer: {
    alignSelf: 'center',
    width: '60%',
    margin: 20
  },
  cardActions: {
    alignSelf: 'center',
    margin: 20
  }
})