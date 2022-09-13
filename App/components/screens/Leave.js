import { View, Text , StyleSheet, Dimensions} from 'react-native'
import React from 'react'
import Header from '../AppHeader'
import Footer from './Footer'
const { width, height } = Dimensions.get("window");

const Leave = () => {
  return (
    <View style={{ flex: 1, }}>
      <Header/>
    <Text>
    This is Leave Screen
    </Text>
    <View style={styles.footer}><Footer/></View>
    </View>
  )
}

export default Leave
const styles = StyleSheet.create({
footer:{
  marginTop: 270,
  
}
})