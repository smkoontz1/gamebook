/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StoredPlatforms } from '../storage/platforms/StoredPlatforms';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
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

export type PlatformsStackParamList = {
  PlatformsList: { storedPlatforms: StoredPlatforms };
  AddPlatformModal: undefined;
}

export type PlatformsScreenProps<Screen extends keyof PlatformsStackParamList> = NativeStackScreenProps<
  PlatformsStackParamList,
  Screen
>

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<PlatformsStackParamList>
>;