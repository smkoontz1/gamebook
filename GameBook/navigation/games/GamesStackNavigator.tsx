import { FontAwesome } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable } from 'react-native'
import { Title } from 'react-native-paper'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import AddGameModalScreen from '../../screens/games/AddGameModalScreen'
import GamesListScreen from '../../screens/games/GamesListScreen'
import { GamesScreenProps, GamesStackParamList } from '../../types/navigation'

const GamesStack = createNativeStackNavigator<GamesStackParamList>()

export default function GamesNavigator() {
  const colorScheme = useColorScheme()

  return (
    <GamesStack.Navigator>
      <GamesStack.Screen
        name='GamesList'
        component={GamesListScreen}
        options={({ route, navigation }: GamesScreenProps<'GamesList'>) => {
          const { platformIgdbId, platformSlug, platformName } = route?.params || {}

          return {
            title: `${platformName || 'All'} Games`,
            headerRight: () => (
              <Pressable
                onPress={async () => navigation.navigate('AddGameModal', {
                  platformIgdbId,
                  platformSlug,
                  platformName
                })}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1
                })}
              >
                <FontAwesome
                  name='plus'
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            )
          }
        }}
      />
      <GamesStack.Group screenOptions={{ presentation: 'modal' }}>
        <GamesStack.Screen
          name='AddGameModal'
          component={AddGameModalScreen}
          options={({ route, navigation }: GamesScreenProps<'AddGameModal'>) => {
            const { platformName } = route?.params || {}

            return {
              title: `Add ${platformName ? `${platformName} ` : ''}Game`
            }
          }}
        />
      </GamesStack.Group>
    </GamesStack.Navigator>
  )
}