import { View, Text ,StyleSheet } from 'react-native'
import React from 'react'
import Header from '../AppHeader'
import Footer from './Footer'

const ProfileScreen = () => {
  return (
    <View>
     <Header />
     <View style={styles.footer}><Footer/></View>
    </View>
  )
}

export default ProfileScreen
const styles = StyleSheet.create({
  footer:{
    marginTop: 290,
  }
})