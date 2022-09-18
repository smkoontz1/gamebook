import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GamesScreenProps } from '../../types/navigation'
import colors from '../../constants/Colors'

export default function GamesListScreen({ route, navigation }: GamesScreenProps<'GamesList'>) {
  const { platformIgdbId } = route?.params || {}

  return (
    <SafeAreaView style={styles.container}>
      {platformIgdbId
      ? <Text>Games for: {platformIgdbId}</Text>
      : <Text>All Games</Text>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  }
})