/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Game } from '../games/Game';
import { Platform } from '../platforms/Platform';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Games: NavigatorScreenParams<GamesStackParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Platforms: NavigatorScreenParams<PlatformsStackParamList> | undefined;
  TabTwo: undefined;
};

export type GamesStackParamList = {
  GamesList: {
    platformIgdbId?: number
    platformSlug: string
    platformName?: string
  },
  GameDetailsModal: {
    game: Game
    platformIgdbId: number
    platformName: string
  }
  AddGameModal: {
    platformIgdbId?: number
    platformSlug: string
    platformName?: string
  }
}

export type GamesScreenProps<Screen extends keyof GamesStackParamList> = NativeStackScreenProps<
  GamesStackParamList,
  Screen
>

export type PlatformsStackParamList = {
  PlatformsList: undefined;
  PlatformDetailsModal: { platform: Platform }
  AddPlatformModal: undefined;
}

export type PlatformsScreenProps<Screen extends keyof PlatformsStackParamList> = NativeStackScreenProps<
  PlatformsStackParamList,
  Screen
>

export type PlatformDetailsModalScreenProps = CompositeScreenProps<
  NativeStackScreenProps<PlatformsStackParamList, 'PlatformDetailsModal'>,
  NativeStackScreenProps<RootStackParamList, 'Games'>
>

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<PlatformsStackParamList>
>;