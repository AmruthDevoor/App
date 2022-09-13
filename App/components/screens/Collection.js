import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import Header from '../AppHeader'
import Footer from './Footer'

const Collection = () => {
  return (
    <View style={{ flex: 1, }}>
      <Header/>
    <Text>
    This is Collection Screen
    </Text>
    <View style={styles.footer}><Footer/></View>
    </View>
  )
}

export default Collection
const styles = StyleSheet.create({
footer:{
  marginTop: 270,
}
})