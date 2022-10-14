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
const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
    input: {
        width: width *0.9,
        height:height*0.065,
        backgroundColor: "#EAE9E7",
        fontSize: 20,
        paddingHorizontal: 15,
        borderRadius: 8,
        color: "black",
        marginBottom: height*0.01,
       
      },
      

})

export default AppInput