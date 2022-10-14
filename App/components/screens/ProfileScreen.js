import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";

import React, { useEffect, useState } from "react";
import Header from "../AppHeader";
import Footer from "./Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Button, Card, Paragraph, Title } from "react-native-paper";
const {width, height} = Dimensions.get("window");
//what
const ProfileScreen = () => {
  const [accessToken, setAccessToken] = useState("");
  const [userName, setuserName] = useState("");
  const [profilePic, setprofilePic] = useState("");
  const [fullName, setFullName] = useState("");
  const [uName, setUname] = useState("");
  const [mailId, setMailID] = useState("");
  const [mobile, setMobile] = useState("");
  const [insertedDate,setInsertedDate] = useState("")
  const [pic, setpic] = useState("");

  const [userData, setUserData] = useState([]);

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
      url: `https://virtullearning.cloudjiffy.net/BitStreamIOMobile/mobilelogin/v1/queryMobileUserByUserName/${userName}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((res) => {
  
      setUserData(JSON.stringify(res.data));
      setUname(JSON.stringify(res.data.userName));
      setMobile(JSON.stringify(res.data.mobileNumber));
      setMailID(JSON.stringify(res.data.mailId));
      setInsertedDate(JSON.stringify(res.data.insertedDate));
      setFullName(JSON.stringify(res.data.fullName));
      setpic(JSON.stringify(res.data.profilePicPath));
    });
  };
  var profilename = userData;

  var SampleNameArray = { name: "Sarvana" };

  return (
    <View>
   
    <View>
      <Header />
      <View style={{zIndex:-1}}>
<View>
<ScrollView>
      <Card style={styles.card}>
        <Card.Cover
          source={{
            uri: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
          }}
           style={{
            borderRadius: 10,
            overflow: "hidden",
            height: 140,
            width: 120,
            alignContent: "center",
            alignSelf: "center",
            marginTop:5,
          
          }} 
        /> 
        <View>
          <Text style={styles.text}>
            fullName:{fullName == null ? "Hidden" : fullName}
          </Text>
          <Text style={styles.text}>{uName}</Text>
          {/* <Title>MobileNumber:{mobile}</Title>
    <Title>EMail:{mailId}</Title> */}
        </View>
        
      </Card>
      </ScrollView>
      </View>
      
      <Card style={styles.card1}>
      <ScrollView style={styles.card10}>
        
        <TouchableOpacity>
        <Text></Text>
        <Text style={{fontSize:20,color:"skyblue" ,borderBottomColor:"black",borderWidth:2,borderColor:"white"}}>OVERVIEW</Text>

        </TouchableOpacity>
       
        <Text style={{fontSize:25}}>PROFILE DETAILS :</Text>
        <Text></Text>
        <Text style={styles.text1}>
            fullName:
          </Text>
          <Text style={styles.text2}>{fullName == null ? "Hidden" : fullName}</Text>
          <Text></Text>
          <Text style={styles.text1}>UserName:</Text>
          <Text style={styles.text2}>{uName}</Text>
          <Text></Text>
          <Text style={styles.text1}>MobileNumber:</Text>
          <Text style={styles.text2}>{mobile}</Text>
          <Text></Text>
    <Text style={styles.text1}>EMail:</Text>
    <Text style={styles.text2}>{mailId}</Text>
    <Text></Text>
    <Text style={styles.text1}>Created Date:</Text>
    <Text style={styles.text2}>{insertedDate}</Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    </ScrollView>
      </Card>
     
    </View>
    
    </View>
    <View style={styles.footer}>
    <Footer/>
    </View>  
    </View>);
};

export default ProfileScreen;
const styles = StyleSheet.create({
  footer: {
    zIndex:-1,
    marginTop:height-1240,
  },
  text: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
  },
  card: {
   
    alignContent:"flex-start",
    zIndex: -1,
    height: height*0.29 ,
    width: width-41,
    marginLeft: 20,
    marginTop: 20,
  },
  card1:{
 
    width:width-41,
    height:height*.55,
    marginTop:30,
    marginRight:20,
    marginLeft: 20,
    paddingLeft:20,
    paddingRight:20,


    
  },
  card10:{
    zIndex: -1,
  },
  text1:{
    fontSize:20,
    color:"skyblue"
  },
  text2:{
   
      fontSize:25
    
  }
});
