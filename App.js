
import React from 'react'

import AuthNavigator from './App/Navigation/AuthNavigator'
import { NavigationContainer ,DefaultTheme} from '@react-navigation/native';

import { Dimensions, StyleSheet } from 'react-native';



// const theme={...DefaultTheme,colors:{...DefaultTheme.colors, background:'#f6f9ff'} 


const App = () => {
  return (
  <NavigationContainer  style={Styles.container}  >
   <AuthNavigator/>
   {/* <BottomNavigate/> */}
 
 
    
  </NavigationContainer>
  )
}

export default App
const Styles = StyleSheet.create({
  container:{
    backgroundColor:"#f6f9ff",

    
     }
    })