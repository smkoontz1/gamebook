import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

export const LoadingSpinner = () => {
  return (
    <View style={styles.loadingContainer}>
      <Text>Loading</Text>
      <View style={styles.spinner}>
        <ActivityIndicator size='large' color={'black'} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 50,
    alignItems: 'center'
  },
  spinner: {
    margin: 20
  }
});