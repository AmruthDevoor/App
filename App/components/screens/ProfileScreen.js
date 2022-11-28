import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from "react-native";

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
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/login/login/v1/getTechnicianProfileByUserName/{userName}?userName=${userName}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((res) => {
  
      setUserData(JSON.stringify(res.data));
      setUname(JSON.stringify(res.data.userName));
      setMobile((res.data.mobileNumber));
      setMailID((res.data.email));
      setInsertedDate((res.data.insertedDate));
      setFullName((res.data.fullName));
      setpic(res.data.technicianPicPath);
      console.warn(res)
    });
  };
  var profilename = userData;

  var SampleNameArray = { name: "Sarvana" };
  const imageUrl =
    "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/file/downloadFile/?filePath=";
  return (
    <View>
     
   <Card>
   
      <Header />
      <View style={{zIndex:-1}}>
<View>

      <Card style={styles.card}>
        <ScrollView>
        <View>
{  pic===null ? (
  <Image
  style={{
    borderRadius: 10,
    overflow: "hidden",
    height: 140,
    width: 120,
    alignContent: "center",
    alignSelf: "center",
    marginTop:5,
  }}
  source={require("../../assets/noImage.jpg")}
/>
):(
  <Image
                    style={{
                      borderRadius: 10,
                      overflow: "hidden",
                      height: 140,
                      width: 120,
                      alignContent: "center",
                      alignSelf: "center",
                      marginTop:5,
                    }}
                    source={{uri:imageUrl+pic}}
                    
                  />
)
}

</View>
        <View>
          <Text style={styles.text}>
            Name:{fullName == null ? "Hidden" : fullName}
          </Text>
          <Text style={styles.text}>{uName}</Text>
          {/* <Title>MobileNumber:{mobile}</Title>
    <Title>EMail:{mailId}</Title> */}
        </View>
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
        
    </ScrollView>
    </Card>
      
      </View>
      
        <View>
     
      </View>
    </View>
    
    
    </Card>
    
    <View style={styles.footer}>
    <Footer/>
    </View>  
    </View>
    // <View>
    //  <Image
    //                 style={{
    //                   width: 150,
    //                   height: 130,
    //                   borderWidth: 2,
    //                   borderColor: "black",
    //                 }}
    //                 source={{uri:imageUrl+pic}}
    //               />
    // </View>
    );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  footer: {
  
    marginTop:height-1240,
  },
  text: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
  },
  card: {
   
    alignContent:"flex-start",
    
    height: height*0.85 ,
    width: width-40,
    marginLeft: 20,
    marginTop: 20,
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
