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

const TaskSideClick = () => {
  const [accessToken, setAccessToken] = useState("");

  const [taskId, setTaskId] = useState("");
  const [techId, setTechId] = useState("");

  const [serviceDate, setServiceDate] = useState("");
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");
  const [oldpicPath, setOldpicPath] = useState("");
  const [newpicPath, setNewpicPath] = useState("");
  const [insertedDate, setInsertedDate] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });
    AsyncStorage.getItem("serviceId").then((value) => {
      setTaskId(value);
      console.warn("hi"+value)
     
    });
    getTaskId();
    getServiceTask();
  }, [accessToken, techId, taskId]);

  const getTaskId = () => {
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/task/v1/getAllTasksByPagination/{pageNumber}/{pageSize}/{technicianId}?pageNumber=0&pageSize=5&technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {});
    console.warn(techId)
  };
  const getServiceTask = () => {
    
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/task/v1/getServiceTaskByTaskId/{taskId}?taskId=${taskId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
        
      },
    }).then((result) => {
      console.warn(result)
      var taskData = result.data;

      setServiceDate(moment(taskData.serviceDate).format("L"))
      setRemark(taskData.remark)
      setStatus(taskData.status)
      setOldpicPath(taskData.oldpicPath)
      setNewpicPath(taskData.newpicPath)
      setInsertedDate(moment(taskData.insertedDate).format("L"))
    
    });
  };
  
  const imageUrl =
    "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/file/downloadFile/?filePath=";
  return (
    <View>
       <Header />
      <ScrollView style={{zIndex:-1}}>
      <Card style={{padding:10, margin:10,marginTop:30}}>
      <Text style={{ fontSize: 30, marginBottom: 10, zIndex: -1 }}>Service Tasks</Text>
      <View >
      <Text style={Styles.text}>Date: {serviceDate}</Text>
      <Text style={Styles.text} >Remark: {remark}</Text>
      
      <View>
        <Text style={Styles.text}>Old Image : </Text>
        <View>
                {/* <Image  /> */}
                {oldpicPath === null ? (
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
                    source={{uri:imageUrl+oldpicPath}}
                    
                  />
                )}
              </View>
      </View>
      <Text></Text>
      <View>
        <Text style={Styles.text}>New Image : </Text>
      <View>
                {/* <Image  /> */}
                {newpicPath === null ? (
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
                    source={{uri:imageUrl+newpicPath}}
                    
                  />
                )}
              </View>
      </View>
      <Text style={Styles.text}>InsertedDate: {insertedDate}</Text>
      <Text style={Styles.text}>status: {status}</Text>
      
      </View>
      </Card>
      </ScrollView>
    </View>
  );
};

export default TaskSideClick;
const { width } = Dimensions.get("window");
const Styles = StyleSheet.create({
  text:{
    fontSize:20,
    margin:10
  }
});
