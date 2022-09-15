import { Platform } from '../../types/platforms/Platform'
import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { getImgLogoUrl } from '../../helpers/imageHelpers'

interface Props {
  platform: Platform
  onPressed?: (platform: Platform) => void
}

export const PlatformListItem = (props: Props) => {
  const { platform, onPressed } = props
  
  return (
    <Pressable
      onPress={() => onPressed && onPressed(platform)}
      style={({ pressed }) => ({
        ...styles.menuItemContainer,
        backgroundColor: pressed ? 'lightgray' : styles.menuItemContainer.backgroundColor
      })}>
      <View style={styles.menuItem}>
        <View style={styles.logoContainer}>
          {platform.logoImgId
          ? <Image
              style={styles.logo}
              source={{
                uri: getImgLogoUrl(platform.logoImgId || '')
              }}
            />
          : <FontAwesome 
              name={'gamepad'}
              size={40}
              style={{ color: 'darkslategray' }}
            />}
          
        </View>
        <View style={styles.platformNameContainer}>
          <Text style={styles.platformName}>
            {platform.name}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  menuItemContainer: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  menuItem: {
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