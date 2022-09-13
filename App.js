
import React from 'react'

import AuthNavigator from './App/Navigation/AuthNavigator'
import { NavigationContainer ,DefaultTheme} from '@react-navigation/native';
import BottomNavigate from './App/components/Dashboard/BottomNavigate';
import { Dimensions, StyleSheet } from 'react-native';
import Header from './App/components/AppHeader';
const { width, height } = Dimensions.get("window");

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