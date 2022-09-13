import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';

const AppInput = ({value, placeholder, onChange, ...rest}) => {
  return (
    
    <TextInput
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    style={styles.input}
    {...rest}/>

  )
}
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    input: {
        width: width - 40,
        height:50,
        backgroundColor: "#EAE9E7",
        fontSize: 20,
        paddingHorizontal: 15,
        borderRadius: 8,
        color: "black",
        marginBottom: 20,
       
      },
      

})

export default AppInput