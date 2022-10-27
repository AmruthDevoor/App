import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../AppHeader";
import Footer from "./Footer";
import { MaterialIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
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
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const PlantHealthTask = () => {
  const [techId, setTechId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [plantTask, setPlantTask] = useState([]);
  const navigation = useNavigation();
  const onForm = (pid) => {
   //console.warn(pid)
    AsyncStorage.setItem ("planthealthtaskId",JSON.stringify(pid));
    navigation.navigate("PlantHealthForm");
  };


  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });

    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });

    getPlantTaskData();
  }, [accessToken]);

  const getPlantTaskData = () => {
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/planthealthtask/v1/getPlantHealthTasksByTechnicianId/{technicianId}?technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setPlantTask(result.data);
      console.warn(result)
    });
  };
  const showAlert = (text) =>{
    Alert.alert(text)
 }
  
  return (
    
    <View>
    <Header />
    <ScrollView style={styles.main1} >
      <Text style={styles.head}>Plant Health</Text>
      <View>
        {plantTask.map((plaTsk) => {
          return (
            <TouchableOpacity  onPress={(e)=>{
              onForm(plaTsk.planthealthtaskId)
              console.warn(plaTsk.planthealthtaskId)
                          }}>
            <Card style={styles.card}>
              <View style={{flexDirection:"row" ,backgroundColor:"skyblue"}}>
              <Text style={styles.title}>{plaTsk.planthealthtaskName}</Text>
           <TouchableOpacity onPress = {()=>{showAlert(plaTsk.description)}}> 
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
                <Text>Ticket .No: {plaTsk.planthealthtaskTicketNumber}</Text>
               </Card.Content>
               <Card.Content style={{flexDirection:"row",paddingTop:10}} > 
                <View >
                <Text >
                  Assigned Date: {moment(plaTsk.assigningDate).format("L")}
                </Text  >
                </View>
                <View >
                <Text style={{paddingLeft:30}}>DeadLine: {moment(plaTsk.deadlineDate).format("L")}</Text>
                </View>
              </Card.Content>
            </Card>
            </TouchableOpacity>
          );
        })}

        {/* <Card style={styles.card}>
      <Card.Title style={styles.title} title="Task name:" />
    
      <View
style={{
  borderBottomColor: 'black',
  borderBottomWidth: StyleSheet.hairlineWidth,
}}
/>
      <Card.Content style={styles.content0}>
        <Paragraph style={styles.paragraph}>Descreption:</Paragraph>
      </Card.Content>
      <Card.Content>
        <View style={styles.Content}>
      <Text  style={styles.Content1}>Ticket .No:</Text>
      <Text  style={styles.Content1}>Assign Date:</Text>
      <Text  style={styles.Content2}>DeadLine:</Text>
      </View>
      </Card.Content>
    </Card>
     */}
      </View>
    </ScrollView>
    <View style={styles.footer}>
      <Footer />
    </View>
  </View>
  );
};

export default PlantHealthTask;
const styles = StyleSheet.create({
  container: {
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
  },
  card: {
    // height: responsiveScreenHeight(20),
    marginTop: responsiveHeight(0) + 20,
    marginLeft: responsiveWidth(0) + 8,
    zIndex: -1,
    backgroundColor: "white",
    width: responsiveScreenWidth(95),
  },
  paragraph: {
    height: responsiveScreenHeight(10),
  },
  head: {
    fontSize: 25,

    paddingLeft: 17,
    paddingTop: 10,
  },
  main1: {
    backgroundColor: "#f6f9ff",
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
    zIndex: -1,
  },

  footer: {
    zindex: -1,

    marginTop: -580,
    position: "relative",
  },
  Content: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: responsiveScreenWidth(100),
  },
  Content1: {
    width: "33.3%",
  },
  title: {
    backgroundColor: "skyblue",
    fontSize: 23,
    paddingBottom: 13,
    paddingTop: 10,
  },
});

//how to access a nested array?
