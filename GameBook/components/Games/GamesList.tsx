import { Game } from '../../types/games/Game'
import { Image, StyleSheet, Text, View } from 'react-native'
import { List } from 'react-native-paper'
import { getSmallGameCoverImageUrl } from '../../helpers/imageHelpers'

interface Props {
  games: Game[] | undefined
  onGamePressed?: (game: Game) => void
}

export const GamesList = (props: Props) => {
  const { games, onGamePressed } = props

  return (
    <>
      {games && games?.length > 0
      ? <List.Section>
          {games.map(game => (
            <List.Item 
              key={games.indexOf(game)}
              title={game.name}
              titleStyle={styles.listItemTitle}
              left={() =>
                <Image
                  style={styles.cover}
                  source={{
                    uri: getSmallGameCoverImageUrl(game.coverImgId)
                  }}
                />
              }
              onPress={() => onGamePressed && onGamePressed(game)}
            />
          ))}
        </List.Section>
      : <View style={styles.textContainer}>
          <Text>No Games.</Text>
        </View>
      }
    </>
  )
}

// TODO, don't do this this way, use the actual size
const coverAspectRatio = 90 / 128

const styles = StyleSheet.create({
  cover: {
    width: 40,
    height: undefined,
    aspectRatio: coverAspectRatio
  },
  listItemTitle: {
    marginLeft: 20
  },
  textContainer: {
    flex: 1,
    alignItems: 'center'
  }
})