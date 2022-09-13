import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const AppLink = ({text, onPress}) => {
  return (
    <Pressable onPress={onPress} >
      <Text style={styles.link}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    link:{
        color:'black',
        fontSize:16,
    }
})
export default AppLink