import { SectionList, ListRenderItem, Text, View, StyleSheet } from 'react-native'
import { Platform } from '../../types/platforms/Platform'
import { PlatformListItem } from './PlatformListItem'

interface Props {
  platforms: Platform[] | undefined
  onPlatformPressed?: (platform: Platform) => void
}

export const PlatformList = (props: Props) => {
  const { platforms, onPlatformPressed } = props

  const renderPlatformMenuItem: ListRenderItem<Platform> = ({ item }: { item: Platform }) => {
    return (
      <PlatformListItem platform={item} onPressed={onPlatformPressed} />
    )
  }

  return (
    <>
      {platforms && platforms?.length > 0
      ? <SectionList
          sections={[{ title: 'Platforms', data: platforms.sort((a, b) => { 
            if (a.name < b.name) {
              return -1
            }

            if (a.name > b.name) {
              return 1
            }

            return 0
          })}]}
          renderItem={renderPlatformMenuItem}
          keyExtractor={item => item.igdbId.toString()}
        />
      : <View style={styles.textContainer}>
          <Text>No Platforms.</Text>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
})