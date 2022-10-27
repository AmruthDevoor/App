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
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentPicker from "react-native-document-picker";
import Header from "../AppHeader";
import axios from "axios";

const TaskForm = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
 
  const [show, setShow] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [taskId, setTaskId] = useState("");
  const [techId, setTechId] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [remark, setRemark] = useState("");
  const [oldpicName, setOldpicName] = useState("");
  const [newpicName, setNewpicName] = useState("");
  const [image, setImage] = useState(null);
  const [singleFile, setSingleFile] = useState(null);
  const onFromChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === "android");
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();
    setServiceDate(fDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  useEffect(() => {
    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });
    AsyncStorage.getItem("taskId").then((value) => {
      setTaskId(value);
    });
    getTaskId();
  }, [accessToken,techId,taskId]);

  const getTaskId = () => {
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/task/v1/getTasksByTechnicianId/{technicianId}?technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      console.warn(result);
    });
  };

  const requestTask = (e) => {
    if(remark===""){
      Alert.alert("Please enter te remark")
}else{
    e.preventDefault();

    let data = {
      newpicName: newpicName,
      oldpicName: oldpicName,
      remark: remark,
      serviceDate: serviceDate,
      taskDto: {
        taskId: taskId,
      },
      technicianDto: {
        technicianId: techId,
      },
    };
    console.warn(data);
    axios({
      method: "POST",
      url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/task/v1/postServiceTask",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      data: data,
    }).then((res) => {
      console.warn(res);
    });
    alert("Sucessfully submitted");
  };}
  
   
  //   if (singleFile != null) {
     
  //     const fileToUpload = singleFile;
  //     let dataa = new FormData();
  //     dataa.append('name', 'Image Upload');
  //     dataa.append('file_attachment', fileToUpload);

  //     axios({
  //       method: "POST",
  //       url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/file/uploadFile",
  //       headers: {
  //         "Content-Type": "multipart/form-data; ",
  //         Authorization: "Bearer " + accessToken,
  //       },
  //       data: dataa,
  //     }).then((res) => {
  //       console.warn(res);
  //     });
  //   }
  // };
  
  return (
    <View>
      <Header />
      <Text style={{ fontSize: 35, marginBottom: 20, zIndex: -1 }}>Tasks</Text>
      <View style={Styles.container}>
        <SafeAreaView>
          <View>
            <Text style={{ fontSize: 15 }}>Service Date: {serviceDate}</Text>
            <View>
              <Button title="Service Date" onPress={() => showMode("date")} />
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onFromChange}
              />
            )}
          </View>
         
          <Text></Text>
          <Text style={{borderWidth:1,padding:10}}>old image name</Text>
<View style={{flexDirection:"row"}}>
          <TouchableOpacity
        style={Styles.buttonStyle}
        activeOpacity={0.5}
        >
        <Text style={Styles.buttonTextStyle}>Select Old Image</Text>
        </TouchableOpacity>
        
       
        <TouchableOpacity
        style={Styles.buttonStyle}
        activeOpacity={0.5}
       >
        <Text style={Styles.buttonTextStyle}>Upload old Image</Text>
      </TouchableOpacity>
    
      </View>
      <Text style={{borderWidth:1,padding:10,marginTop:10}}>New image name</Text>
      <View style={{flexDirection:"row"}}>
          <TouchableOpacity
        style={Styles.buttonStyle}
        activeOpacity={0.5}
        >
        <Text style={Styles.buttonTextStyle}>Select New Image</Text>
        </TouchableOpacity>
        
       
        <TouchableOpacity
        style={Styles.buttonStyle}
        activeOpacity={0.5}
       >
        <Text style={Styles.buttonTextStyle}>Upload New Image</Text>
      </TouchableOpacity>
    
      </View>
          <TextInput
            placeholder="Reamrk"
            value={remark}
            onChangeText={(text) => {
              setRemark(text);
            }}
            style={Styles.inp2}
          />
        </SafeAreaView>
        <TouchableOpacity>
          <Pressable
            onPress={(e) => {
              requestTask(e);
            }}
            style={Styles.submit}
          >
            <Text style={Styles.btnText}>Submit</Text>
          </Pressable>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskForm;
const { width } = Dimensions.get("window");
const Styles = StyleSheet.create({
  submit: {
    height: 50,
    width: width - 40,
    backgroundColor: "#0073A9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    width:150,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 8,
    marginRight: 30,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  btnText: {
    fontSize: 16,
    color: "white",
  },
  container: {
    backgroundColor: "white",
    padding: 17,
    zIndex: -1,
  },
  inp: {
    height: 50,
    borderWidth: 0.19,
    borderRadius: 3,
    marginTop: 20,
    paddingLeft: 10,
  },
  inp2: {
    height: 100,
    borderWidth: 0.19,
    paddingBottom: 55,
    borderRadius: 3,
    marginTop: 20,
    paddingLeft: 10,
  },
  inp1: {
    height: 100,
    borderWidth: 0.19,
    borderRadius: 3,
    marginTop: 20,
    paddingLeft: 10,
    paddingBottom: 50,
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 7,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});