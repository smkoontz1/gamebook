import { Platform } from '../../types/platforms/Platform'
import { StyleSheet, Image, View, Text } from 'react-native'

const getImgLogoUrl = (imgId: string) => {
  return `https://images.igdb.com/igdb/image/upload/t_cover_small/${imgId}.png`
}

interface Props {
  platform: Platform
}

export const PlatformListItem = (props: Props) => {
  const { platform } = props
  
  return (
    <View style={styles.menuItemContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: getImgLogoUrl(platform.logoImgId || '')
          }}
        />
      </View>
      <View style={styles.platformNameContainer}>
        <Text style={styles.platformName}>
          {platform.name}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  menuItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  platformNameContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  platformName: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});