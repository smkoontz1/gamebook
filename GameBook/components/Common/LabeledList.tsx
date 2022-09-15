import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import { KeyValuePair } from '../../types/common/KeyValuePair'

interface Props<TKey, TValue> {
  keyValuePairs: KeyValuePair<TKey, TValue>[]
}

export function LabeledList<TKey, TValue>(props: Props<TKey, TValue>) {
  const { keyValuePairs } = props

  const keyValuePairElements = keyValuePairs.map(kvp => {
    return (
      <View key={keyValuePairs.indexOf(kvp)} style={styles.listItemRow}>
        <View style={styles.listItemLabelContainer}>
          <Text>{kvp.key?.toString()}: </Text>
        </View>
        <View style={styles.listItemValueContainer}>
          <Text>{kvp.value?.toString()}</Text>
        </View>
      </View>
    )
  })

  return (
    <>
      {keyValuePairElements}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItemRow: {
    flexDirection: 'row',
    marginVertical: 5
  },
  listItemLabelContainer: {
    flex: 1,
    marginRight: 5,
    alignItems: 'flex-end'
  },
  listItemValueContainer: {
    flex: 1,
    marginLeft: 5,
    alignItems: 'flex-start'
  }
})