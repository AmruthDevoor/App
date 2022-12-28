import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Platform,
    Pressable,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ScrollView,
  } from "react-native";
  import DateTimePicker from "@react-native-community/datetimepicker";
  import React, { useEffect, useState } from "react";
  
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  import Header from "../AppHeader";
  import axios from "axios";
  import { Card } from "react-native-paper";
  import moment from "moment";
import BaseUrl from "../api/BaseUrl";
  
  const PlantHealthClick = () => {
    const [accessToken, setAccessToken] = useState("");
  
    const [planthealthtaskId, setPlanthealthtaskId] = useState("");
    const [techId, setTechId] = useState("");
    const [spunImageName,setSpunImageName]=useState("")
  const [spunImagePath,setSpunImagePath]=useState("")
  const [tdsImagePath,setTdsImagePath]=useState("")
  const [plantImagePath,setPlantImagePath]=useState("")
  const [logImagePath,setLogImagePath]=useState("")

    const [serviceDate, setServiceDate] = useState("");
    const [remark, setRemark] = useState("");
    const [plantClean, setPlantClean] = useState("Plant Clean");
    const [plantImage, setPlantImage] = useState("");
    const [spun, setSpun] = useState("");
    const [spunJumboWound, setSpunJumboWound] = useState("");
    const [spunJumboPlain, setSpunJumboPlain] = useState("");
    const [spunSlimWound, setSpunSlimWound] = useState("");
    const [spunSlimPlain, setSpunSlimPlain] = useState("");
    const [spunImage, setSpunImage] = useState("");
    const [logImage, setLogImage] = useState("");
    const [logEntry,setLogEntry] = useState("");
    const[status,setStatus] = useState("");
  
    
  
    const [insertedDate, setInsertedDate] = useState("");
  
    useEffect(() => {
      AsyncStorage.getItem("AccessToken").then((value) => {
        setAccessToken(JSON.parse(value));
      });
      AsyncStorage.getItem("id").then((value) => {
        setTechId(value);
      });
      AsyncStorage.getItem("planthealthtaskId").then((value) => {
        setPlanthealthtaskId(value);
        console.warn(value)
       
      });
      getPlanthealthtaskId();
      getServicePlantTask();
    }, [accessToken, techId, planthealthtaskId]);
  
    const getPlanthealthtaskId = () => {
      axios({
        method: "GET",
        url: `${BaseUrl}/planthealthtask/v1/getAllPlantHealthTasksByPagination/{pageNumber}/{pageSize}/{technicianId}?pageNumber=0&pageSize=5&technicianId=${techId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {});
    };
    const getServicePlantTask = () => {
      axios({
        method: "GET",
        url: `${BaseUrl}/planthealthtask/v1/getPlantHealthTaskLogByPlanthealthtaskId/{planthealthtaskId}?planthealthtaskId=${planthealthtaskId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {
        console.warn(result)
        var taskPlantData = result.data;
       
        setServiceDate(moment(taskPlantData.serviceDate).format("LL"))
        setRemark(taskPlantData.remark)
        setSpun(taskPlantData.spun)
        setSpunJumboWound(taskPlantData.spunJumboWound)
        setSpunJumboPlain(taskPlantData.spunJumboPlain)
        setSpunSlimWound(taskPlantData.spunSlimWound)
        setSpunSlimPlain(taskPlantData.spunSlimPlain)
        setLogEntry(taskPlantData.logEntry)
        setStatus(taskPlantData.status)
        setSpunImagePath(taskPlantData.spunImagePath)
        setPlantImagePath(taskPlantData.plantImagePath)
        setLogImagePath(taskPlantData.logImagePath)
        setPlantClean(taskPlantData.plantClean)
        setTdsImagePath(taskPlantData.tdsImagePath)

        setInsertedDate(moment(taskPlantData.insertedDate).format("LL"))
      
      });
     
    };
    const imageUrl =
    "https://wallkinrowaterplant.cloudjiffy.net/rsenterprisestechnician/file/downloadFile/?filePath=";
    return (
      <View>
        <Header />
        <ScrollView style={{zIndex:-1}}>
        <Card style={{padding:10, margin:10,}}>
        <Text style={{ fontSize: 30, marginBottom: 10, zIndex: -1 }}>PlantHealth Tasks</Text>
        <View >
        <Text style={Styles.text}>Date: {serviceDate}</Text>
        <Text style={Styles.text} >Remark: {remark}</Text>
        <Text style={Styles.text} >Plant Clean: {plantClean}</Text>
        <Text style={Styles.text} >spun: {spun}</Text>
        <Text style={Styles.text} >spunJumboWound: {spunJumboWound}</Text>
        <Text style={Styles.text} >spunJumboPlain: {spunJumboPlain}</Text>
        <Text style={Styles.text} >spunSlimWound: {spunSlimWound}</Text>
        <Text style={Styles.text} >spunSlimPlain : {spunSlimPlain}</Text>
        <Text style={Styles.text} >logEntry: {logEntry}</Text>
        <Text style={Styles.text} >status: {status}</Text>
       
        <View>
          <Text style={Styles.text}>spunImage : </Text>
          <View>
                {/* <Image  /> */}
                {spunImagePath === null ? (
                  <Image
                    style={{
                      width: 130,
                      height: 130,
                      borderWidth: 2,
                      borderColor: "black",
                    }}
                    source={require("../../assets/noImage.jpg")}
                  />
                ) : (
                  <Image
                    style={{
                      width: 130,
                      height: 130,
                      borderWidth: 2,
                      borderColor: "black",
                    }}
                    source={{uri:imageUrl+spunImagePath}}
                    
                  />
                )}
              </View>
        </View>
        <View>
          <Text style={Styles.text}>Plant Image : </Text>
          <View>
                {/* <Image  /> */}
                {plantImagePath === null ? (
                  <Image
                    style={{
                      width: 130,
                      height: 130,
                      borderWidth: 2,
                      borderColor: "black",
                    }}
                    source={require("../../assets/noImage.jpg")}
                  />
                ) : (
                  <Image
                    style={{
                      width: 130,
                      height: 130,
                      borderWidth: 2,
                      borderColor: "black",
                    }}
                    source={{uri:imageUrl+plantImagePath}}
                    
                  />
                )}
              </View>
        </View>
        <View>
          <Text style={Styles.text}>log Image : </Text>
          <View>
                {/* <Image  /> */}
                {logImagePath === null ? (
                  <Image
                    style={{
                      width: 130,
                      height: 130,
                      borderWidth: 2,
                      borderColor: "black",
                    }}
                    source={require("../../assets/noImage.jpg")}
                  />
                ) : (
                  <Image
                    style={{
                      width: 130,
                      height: 130,
                      borderWidth: 2,
                      borderColor: "black",
                    }}
                    source={{uri:imageUrl+logImagePath}}
                    
                  />
                )}
              </View>
        </View>
        <View>
          <Text style={Styles.text}>tdsImage : </Text>
          <View>
                {/* <Image  /> */}
                {tdsImagePath === null ? (
                  <Image
                    style={{
                      width: 130,
                      height: 130,
                      borderWidth: 2,
                      borderColor: "black",
                    }}
                    source={require("../../assets/noImage.jpg")}
                  />
                ) : (
                  <Image
                    style={{
                      width: 130,
                      height: 130,
                      borderWidth: 2,
                      borderColor: "black",
                    }}
                    source={{uri:imageUrl+tdsImagePath}}
                    
                  />
                )}
              </View>
        </View>
        <Text></Text>
       
        <Text style={Styles.text}>InsertedDate: {moment(insertedDate).format("LL")}</Text>
        
        </View>
        </Card>
        </ScrollView>
      </View>
    );
  };
  
  export default PlantHealthClick;
  const { width } = Dimensions.get("window");
  const Styles = StyleSheet.create({
    text:{
      fontSize:20,
      margin:10
    }
  });
  