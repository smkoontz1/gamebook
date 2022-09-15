/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AddPlatformModalScreen from '../screens/platforms/AddPlatformModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import PlatformsListScreen from '../screens/platforms/PlatformsListScreen';
import PlatformDetailsModalScreen from '../screens/platforms/PlatformDetailsModalScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { PlatformsScreenProps, PlatformsStackParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types/navigation';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
 const BottomTab = createBottomTabNavigator<RootTabParamList>();

 function BottomTabNavigator() {
   const colorScheme = useColorScheme();

   return (
     <BottomTab.Navigator
       initialRouteName='Platforms'
       screenOptions={{
         tabBarActiveTintColor: Colors[colorScheme].tint,
       }}>
       <BottomTab.Screen
         name='Platforms'
         component={PlatformsNavigator}
         options={({ navigation }: RootTabScreenProps<'Platforms'>) => ({
           title: 'Platforms',
           tabBarIcon: ({ color }) => <TabBarIcon name='gamepad' color={color} />,
           headerShown: false
         })}
       />
       <BottomTab.Screen
         name="TabTwo"
         component={TabTwoScreen}
         options={{
           title: 'Tab Two',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         }}
       />
     </BottomTab.Navigator>
   );
 }

const PlatformsStack = createNativeStackNavigator<PlatformsStackParamList>()

function PlatformsNavigator() {
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

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
