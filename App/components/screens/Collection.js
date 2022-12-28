import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../AppHeader";
import Footer from "./Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
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
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import BaseUrl from "../api/BaseUrl";

const Collection = () => {
  const [techId, setTechId] = useState("");
  const [collectiontaskId, setCollectiontaskId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [task, setTask] = useState([]);
  const navigation = useNavigation();
  const onForm = (Cid) => {
   
    AsyncStorage.setItem ("collectiontaskId",JSON.stringify(Cid));
    navigation.navigate("collectionForm");
  };
  
  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });

    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });

    getTaskData();
  }, [accessToken,collectiontaskId,task]);

  const getTaskData = () => {
    axios({
      method: "GET",
      url: `${BaseUrl}/collectiontask/v1/getCollectionTasksByTechnicianId/{technicianId}?technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
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
          {task.length<=0 ? <Text>No Data Found</Text> : task.map((tsk) => {
            return (
              <TouchableOpacity onPress={(e)=>{
                onForm(tsk.collectiontaskId)
                            }}>
              <Card style={styles.card}>
                <View style={{flexDirection:"row" ,backgroundColor:"skyblue"}}>
                <Text style={styles.title}>{tsk.collectiontaskName}</Text>
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
                  <Text>Ticket .No: {tsk.collectiontaskTicketNumber}</Text>
                 </Card.Content>
                 <Card.Content style={{flexDirection:"row",paddingTop:10}} > 
                  <View >
                  <Text >
                    Assigned Date: {moment(tsk.assigningDate).format("LL")}
                  </Text  >
                  </View>
                  <View >
                  <Text style={{paddingLeft:30}}>DeadLine: {moment(tsk.deadlineDate).format("LL")}</Text>
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
         <Text></Text>
     <Text></Text>
     <Text></Text>
     <Text></Text>
     <Text></Text>
     <Text></Text>
     <Text></Text>
     <Text></Text>
     <Text></Text>
     <Text></Text>
     <Text></Text>
     <Text></Text>
     <Text></Text>
     <Text></Text>
    
     <Text></Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default Collection;
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

    marginTop: -590,
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

//what is the syntax of ternary operator?
