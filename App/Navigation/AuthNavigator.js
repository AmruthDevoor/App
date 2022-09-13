import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ViewComponent } from 'react-native'
import About from '../components/screens/About'
import SettingScreen from '../components/screens/SettingScreen'
import ForgetPassword from '../components/screens/ForgetPassword'
import HomeScreen from '../components/screens/HomeScreen'

import Login from '../components/screens/Login'
import Notifications from '../components/screens/Notifications'
import SignUp from '../components/screens/SignUp'
import SideBar from '../components/SideBar'
import ProfileScreen from '../components/screens/ProfileScreen'
import Collection from '../components/screens/Collection'
import Tasks from '../components/screens/Tasks'

import Stock from '../components/screens/Stock'
import ProductRequest from '../components/screens/ProductRequest'
import Attendance from '../components/screens/Attendance'
import Leave from '../components/screens/Leave'
import Material from '../components/screens/Material'
const sampleTabNavigation = createNativeStackNavigator() 


const AuthNavigator = () => {
  return (
  <sampleTabNavigation.Navigator screenOptions={{headerShown: false}} >
    <sampleTabNavigation.Screen name='Login' component={Login} />
    <sampleTabNavigation.Screen name='SignUp' component={SignUp} />
    <sampleTabNavigation.Screen name='ForgetPassword' component={ForgetPassword} />
    <sampleTabNavigation.Screen  name='HomeScreen' component={HomeScreen} />
    <sampleTabNavigation.Screen name='About' component={About} />
    <sampleTabNavigation.Screen name='Notifications' component={Notifications} />
    <sampleTabNavigation.Screen name='SettingScreen' component={SettingScreen} />
    <sampleTabNavigation.Screen name='Tasks' component={Tasks} />
    <sampleTabNavigation.Screen name='Collection' component={Collection} />
    <sampleTabNavigation.Screen name='Stock' component={Stock} />
    <sampleTabNavigation.Screen name='ProfileScreen' component={ProfileScreen} />
    <sampleTabNavigation.Screen name='ProductRequest' component={ProductRequest} />
    <sampleTabNavigation.Screen name='Material' component={Material} />

    <sampleTabNavigation.Screen name='Attendance' component={Attendance} />
    <sampleTabNavigation.Screen name='Leave' component={Leave} />


   
    
  </sampleTabNavigation.Navigator>
  )
}

export default AuthNavigator