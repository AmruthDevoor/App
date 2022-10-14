import { View, Text , StyleSheet, ScrollView, Alert, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../AppHeader'
import Footer from './Footer'
import moment from 'moment'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

import {
  responsiveScreenHeight,
  useResponsiveHeight,
  useResponsiveWidth,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Card, Paragraph } from "react-native-paper";
import axios from 'axios';

const Tasks = () => {
  const[techId,setTechId]=useState("")
  const[accessToken,setAccessToken]=useState("")
  const[task,setTask]=useState([]);

  useEffect(() => {
    
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
     });
     
    AsyncStorage.getItem("AccessToken").then((value) => {

      setAccessToken(JSON.parse(value));
    });
    
    getTaskData();
  },[accessToken]);
  
  const getTaskData = () => {
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/task/v1/getTasksByTechnicianId/{technicianId}?technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken},
    }).then((result) => {

      setTask(result.data);

    });
  };
  const showAlert = (text) =>{
    Alert.alert(text)
 }
  return (
    <View>
    <Header />
    <ScrollView style={styles.main1}>
      <Text style={styles.head}>Collection</Text>
      <View>
        {task.map((tsk) => {
          return (
            <Card style={styles.card}>
              <View style={{flexDirection:"row" ,backgroundColor:"skyblue"}}>
              <Text style={styles.title}>{tsk.taskName}</Text>
           <TouchableOpacity onPress = {()=>{showAlert(tsk.description)}}> 
            <Text  style={styles.title}> <MaterialIcons
                    name="error"
                    size={20}
                    color="#0073A9"
                  /></Text>
                   </TouchableOpacity>
                  </View>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
              {/* <Card.Content style={styles.content0}>
                <Paragraph style={styles.paragraph}>
                  {tsk.description}
                </Paragraph>
              </Card.Content> */}
              <Card.Content style={{paddingTop:20}} >
                <Text>Ticket .No: {tsk.taskTicketNumber}</Text>
               </Card.Content>
               <Card.Content style={{flexDirection:"row",paddingTop:10}} > 
                <View >
                <Text >
                  Assigned Date: {moment(tsk.assigningDate).format("L")}
                </Text  >
                </View>
                <View >
                <Text style={{paddingLeft:30}}>DeadLine: {moment(tsk.deadlineDate).format("L")}</Text>
                </View>
              </Card.Content>
            </Card>
          );
        })}

      
      </View>
    </ScrollView>
    <View style={styles.footer}>
      <Footer />
    </View>
  </View>
  )
}

export default Tasks
const styles = StyleSheet.create({
  container: {
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
  },
  card: {
    // height: responsiveScreenHeight(20),
    marginTop: responsiveHeight(0) + 20,
    marginLeft: responsiveWidth(0)+8,
    zIndex: -1,
    backgroundColor:"white",
    width: responsiveScreenWidth(95)
  },
  paragraph: {
    height: responsiveScreenHeight(10),
  },
  head:{
    fontSize: 25,
  
    paddingLeft:17,
    paddingTop:10
    },
  main1:{
    backgroundColor:"#f6f9ff",
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
zIndex:-1,
  },

  footer: {
    zindex: -1,

    marginTop:-580,
    position: "relative",
   
  },
  Content:{
display: "flex",
flexDirection: "row",
flexWrap: "nowrap",
width: responsiveScreenWidth(100),
  },
  Content1:{
  width:"33.3%",

 
  },
  title:{
    backgroundColor:"skyblue",
    fontSize:23,
    paddingBottom:13,
    paddingTop:10,
  },
  
});


//how to access a nested array?

