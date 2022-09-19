import { Text, View, StyleSheet } from 'react-native'
import { List } from 'react-native-paper'
import { Platform } from '../../types/platforms/Platform'
import { PlatformLogoImage } from './PlatformLogoImage'

interface Props {
  platforms: Platform[] | undefined
  onPlatformPressed?: (platform: Platform) => void
}

export const PlatformsList = (props: Props) => {
  const { platforms, onPlatformPressed } = props

  return (
    <>
      {platforms && platforms?.length > 0
      ? <List.Section>
          {platforms.map(platform => (
            <List.Item
              key={platforms.indexOf(platform)}
              title={platform.name}
              titleStyle={styles.listItemTitle}
              left={() =>
                <PlatformLogoImage platformLogoImgId={platform.logoImgId || ''} />}
              onPress={() => onPlatformPressed && onPlatformPressed(platform)}
            />
          ))}
        </List.Section>
      : <View style={styles.textContainer}>
          <Text>No Platforms.</Text>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  listItemTitle: {
    marginLeft: 20
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
})