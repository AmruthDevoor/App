import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import Header from '../AppHeader'
import Footer from './Footer'

const SettingScreen = () => {
  return (
    <View style={{ flex: 1,}}>
      <Header/>
    <Text style={{zIndex: -1}}>
    This is SettingScreen Screen
    </Text>
    <View style={styles.footer}><Footer/></View>
    </View>
  )
}

export default SettingScreen
const styles = StyleSheet.create({
footer:{
  marginTop: 270
}
})