import { StyleSheet, View } from 'react-native'

export const MenuSeparator = () => {
  return (
    <View style={styles.menuSeparatorContainer}>
      <View style={styles.menuSeparator}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  menuSeparatorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuSeparator: {
    height: 2,
    width: '90%',
    backgroundColor: 'gray'
  }
});