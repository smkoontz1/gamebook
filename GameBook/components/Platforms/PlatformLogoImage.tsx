import { Image, StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { getImgLogoUrl } from '../../helpers/imageHelpers'

interface Props {
  platformLogoImgId: string
}

export const PlatformLogoImage = (props: Props) => {
  const { platformLogoImgId } = props

  return (
    <>
      {platformLogoImgId
        ? <Image
            style={styles.logo}
            source={{
              uri: getImgLogoUrl(platformLogoImgId)
            }}
          />
        : <View style={styles.iconContainer}>
            <FontAwesome
              name='gamepad'
              size={40}
              style={{ color: 'darkslategray' }}
            />
          </View>}
    </>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 50,
    height: 50
  }
})