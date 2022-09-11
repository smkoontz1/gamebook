import { SectionList, ListRenderItem, Text, Pressable, View, StyleSheet } from 'react-native'
import { Platform } from '../../types/platforms/Platform'
import { PlatformListItem } from './PlatformListItem'
import { MenuSeparator } from '../Common/MenuSeparator'

interface Props {
  platforms: Platform[] | undefined
  onPressed?: (platform: Platform) => void
}

export const PlatformList = (props: Props) => {
  const {
    platforms,
    onPressed
  } = props

  const renderPlatformMenuItem: ListRenderItem<Platform> = ({ item }: { item: Platform }) => {
    return (
      <Pressable onPress={() => onPressed && onPressed(item)}>
        <PlatformListItem platform={item} />
      </Pressable>
    )
  }

  return (
    <>
      {platforms
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
          ItemSeparatorComponent={MenuSeparator}
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
    alignItems: 'center'
  },
})