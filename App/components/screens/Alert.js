import { Alert,View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileScreen from './ProfileScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BaseUrl from '../api/BaseUrl';
import { useNavigation } from '@react-navigation/native';

const Alerts = () => {
    const [userName, setuserName] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
     
        AsyncStorage.getItem("user").then((value) => {
          setuserName(JSON.parse(value));
        });
        AsyncStorage.getItem("AccessToken").then((value) => {
            setAccessToken(JSON.parse(value));
          });
     
        
    get_user();
    
      });



    const get_user = () => {

        axios({
          method: "GET",
          url: `${BaseUrl}/login/login/v1/getTechnicianProfileByUserName/{userName}?userName=${userName}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }).then((res) => {
      
          Alert.alert("Welcome "+res.data.fullName,"UserName:"+res.data.userName,)
          navigation.navigate("HomeScreen");
        
        });
      };
    
  return (
   <>
   </>
  )
}

export default Alerts