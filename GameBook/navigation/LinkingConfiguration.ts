/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types/navigation';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Platforms: {
            screens: {
              AddPlatformModal: 'add-platform',
              PlatformsList: 'platforms',
              PlatformDetailsModal: 'platform-details'
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
      Games: {
        screens: {
          AddGameModal: 'add-game',
          GamesList: 'games',
          GameDetailsModal: 'game-details'
        }
      },
    },
  },
};

export default linking;
