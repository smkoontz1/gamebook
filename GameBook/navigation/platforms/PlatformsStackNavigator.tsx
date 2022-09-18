import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useColorScheme from '../../hooks/useColorScheme'
import PlatformsListScreen from '../../screens/platforms/PlatformsListScreen'
import { PlatformsScreenProps, PlatformsStackParamList } from '../../types/navigation'
import { FontAwesome } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import Colors from '../../constants/Colors'
import PlatformDetailsModalScreen from '../../screens/platforms/PlatformDetailsModalScreen'
import AddPlatformModalScreen from '../../screens/platforms/AddPlatformModalScreen'

const PlatformsStack = createNativeStackNavigator<PlatformsStackParamList>()

export default function PlatformsNavigator() {
  const colorScheme = useColorScheme()
  
  return (
    <PlatformsStack.Navigator>
      <PlatformsStack.Screen
        name='PlatformsList'
        component={PlatformsListScreen}
        options={({ navigation }: PlatformsScreenProps<'PlatformsList'>) => ({
          title: 'Platforms',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('AddPlatformModal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name='plus'
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <PlatformsStack.Group screenOptions={{ presentation: 'modal' }}>
        <PlatformsStack.Screen
          name='PlatformDetailsModal'
          component={PlatformDetailsModalScreen}
          options={({ route }: PlatformsScreenProps<'PlatformDetailsModal'>) => ({
            title: route.params.platform.name,
          })}
        />
        <PlatformsStack.Screen
          name='AddPlatformModal'
          component={AddPlatformModalScreen}
          options={() => ({
            title: 'Add Platform'
          })}
        />
      </PlatformsStack.Group>
    </PlatformsStack.Navigator>
  )
}