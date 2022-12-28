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
  ScrollView,
  Alert,
  Image,
} from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentPicker from "react-native-document-picker";
import Header from "../AppHeader";
import axios from "axios";
import { Navigation } from "react-native-navigation";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import BaseUrl from "../api/BaseUrl";

const CollectionForm = () => {
  const [profileImage, setProfileImage] = useState("");
  const [profileImage1, setProfileImage1] = useState("");
  const [profileImage2, setProfileImage2] = useState("");
  const [progress, setProgress] = useState(0);
const[display,setDisplay]=useState()
const[display1,setDisplay1]=useState()

const[display2,setDisplay2]=useState()
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [filename, setFilename] = useState();
  const [filename1, setFilename1] = useState();
  const [filename2, setFilename2] = useState();
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [collectiontaskId, setCollectiontaskId] = useState();
  const [techId, setTechId] = useState();
  const [serviceDate, setServiceDate] = useState("");
  const [previousVolumeReading, setPreviousVolumeReading] = useState();
  const [currentVolumeReading, setCurrentVolumeReading] = useState();
  const [previousRechargeReading, setPreviousRechargeReading] = useState();
  const [currentRechargeReading, setCurrentRechargeReading] = useState();
  const [previousCoinReading, setPreviousCoinReading] = useState();
  const [currentCoinReading, setCurrentCoinReading] = useState();
  const [previousBalance, setPreviousBalance] = useState();
  const [newBalance, setNewBalance] = useState();
  const [waterManSalary, setWaterManSalary] = useState();
  const [cashInHand, setCashInHand] = useState();

  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  const navigation = useNavigation();

  const [plantName, setPlantName] = useState("");

  const onFromChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === "android");
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      
    tempDate.toLocaleDateString();
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
    AsyncStorage.getItem("collectiontaskId").then((value) => {
      setCollectiontaskId(value);
      console.warn("Amruth" + value);
    });
    getCollectiontaskId();

    getCollectionByCollectionId();
  }, [accessToken, techId, collectiontaskId]);
  console.warn(collectiontaskId + "hi");

  const getCollectiontaskId = () => {
    console.warn("hey" + collectiontaskId);
    axios({
      method: "GET",
      url: `${BaseUrl}/collectiontask/v1/getCollectionTasksByTechnicianId/{technicianId}?technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      console.warn(result.data);
    });
  };

  const getCollectionByCollectionId = () => {
    axios({
      method: "GET",
      url: `${BaseUrl}/collectiontask/v1/getCollectionTaskByCollectiontaskId/{collectiontaskId}?collectiontaskId=${collectiontaskId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      console.warn(result.data.plantReadingDto);
      setPreviousBalance(String(result.data.plantReadingDto.previousBalance));
      setPreviousCoinReading(
        String(result.data.plantReadingDto.previousCoinReading)
      );
      setPreviousVolumeReading(
        String(result.data.plantReadingDto.previousVolumeReading)
      );
      setPreviousRechargeReading(
        String(result.data.plantReadingDto.previousRechargeReading)
      );
      setPlantName(result.data.plantReadingDto.plantName);
    });
  };
  console.warn(previousBalance);

  const requestTask = (e) => {
    if (serviceDate === "") {
      Alert.alert("Please Enter the service Date");
    }
    else if (currentVolumeReading === "") {
      Alert.alert("Please Enter Current Volume Reading");
    }  else if (currentRechargeReading === "") {
      Alert.alert("Please Enter Current Recharge Reading");
    }  else if (currentCoinReading === "" ) {
      Alert.alert("Please Enter Current Coin Reading");
    } else if (newBalance === "" ) {
      Alert.alert("Please Enter new Balance");
    } else if (waterManSalary === "" ) {
      Alert.alert("Please Enter water Man Salary");
    } else if (cashInHand === "") {
      Alert.alert("Please Enter cash In hand");
    }
    else if (display != "201") {
      Alert.alert("Please select volume reading pic");
    
    }
    else if (display1 != "201") {
      Alert.alert("Please select recharge reading pic");
    
    }
    else if (display2 != "201") {
      Alert.alert("Please select coin reading pic");
    
    } else if (remark === "") {
      Alert.alert("Please Enter remark");
    
    }
     else {
      e.preventDefault();

      let data = {
        cashInHand: cashInHand,
        coinReadingPhotoName: filename2,
        collectionTaskDto: {
          collectiontaskId: collectiontaskId,
        },
        currentCoinReading: currentCoinReading,
        currentRechargeReading: currentRechargeReading,
        currentVolumeReading: currentVolumeReading,
        newBalance: newBalance,
        previousBalance: Number(previousBalance),
        previousCoinReading: Number(previousCoinReading),
        previousRechargeReading: Number(previousRechargeReading),
        previousVolumeReading: Number(previousVolumeReading),
       
        rechargeReadingPhotoName: filename1,
     
        remark: remark,
        serviceDate: serviceDate,

        technicianDto: {
          technicianId: techId,
        },
        waterManSalary: Number(waterManSalary),
        volumeReadingPhotoName: filename,
      };

    
      console.warn(data);
      // var x={"cashInHand":cashhand}
      // data.push(x)
      axios({
        method: "POST",
        url: `${BaseUrl}/collectiontask/v1/postTechnicianCollectionTask`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        data: data,
      }).then((res) => {if(res.data.responseCode===201){
        alert(res.data.message)}else if(res.data.responseCode===400){
          alert(res.data.errorMessage)
        }
      
        navigation.navigate("Collection");
      });
    }
  };
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality:0.2,
      });
      var fn = response.uri.substring(
        response.uri.lastIndexOf("/") + 1,
        response.uri.length
      );
      console.warn(fn);
      setFilename(fn);

      if (!response.cancelled) {
        setProfileImage(response.uri);
        console.warn(response.uri);
        console.warn(response);
      }
    }
  };
  const pickCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,     
        quality:0.2,
      });
      var fn = response.uri.substring(
        response.uri.lastIndexOf("/") + 1,
        response.uri.length
      );
      console.warn(fn);
      setFilename(fn);

      if (!response.cancelled) {
        setProfileImage(response.uri);
        console.warn(response.uri);
        console.warn(response);
      }
    }
  };
  const uploadImage = async () => {
    console.warn({
      name: filename,
      uri: profileImage,
      type: "image/jpg",
    });

    const formData = new FormData();
    formData.append("file", {
      name: filename,
      uri: profileImage,
      type: "image/jpg",
    });
    try {
      axios({
        method: "POST",
        url: `${BaseUrl}/file/uploadFile`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data; ",
          Authorization: "Bearer " + accessToken,
        },
      }).then((res) => {
        setDisplay(res.data.responseCode)
        Alert.alert("Image Uploaded Successfully")
       
      
      });
    } catch (error) {
      Alert.alert(error.message);
    }
   
  };
  const pickImage1 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality:0.2,
      });
      var fn1 = response.uri.substring(
        response.uri.lastIndexOf("/") + 1,
        response.uri.length
      );
      console.warn(fn1);
      setFilename1(fn1);

      if (!response.cancelled) {
        setProfileImage1(response.uri);
        console.warn(response.uri);
        console.warn(response);
      }
    }
  };
  const pickCamera1 = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,     
        quality:0.2,
      });
      var fn1 = response.uri.substring(
        response.uri.lastIndexOf("/") + 1,
        response.uri.length
      );
      console.warn(fn1);
      setFilename1(fn1);

      if (!response.cancelled) {
        setProfileImage1(response.uri);
        console.warn(response.uri);
        console.warn(response);
      }
    }
  };
  const uploadImage1 = async () => {
    console.warn({
      name: filename1,
      uri: profileImage1,
      type: "image/jpg",
    });

    const formData = new FormData();
    formData.append("file", {
      name: filename1,
      uri: profileImage1,
      type: "image/jpg",
    });
    try {
      axios({
        method: "POST",
        url: `${BaseUrl}/file/uploadFile`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data; ",
          Authorization: "Bearer " + accessToken,
        },
      }).then((res) => {
        setDisplay1(res.data.responseCode)
        Alert.alert("Image Uploaded Successfully")
       
      
      });
    } catch (error) {
      Alert.alert(error.message);
    }
   
  };
  const pickImage2 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality:0.2,
      });
      var fn2 = response.uri.substring(
        response.uri.lastIndexOf("/") + 1,
        response.uri.length
      );
      console.warn(fn2);
      setFilename2(fn2);

      if (!response.cancelled) {
        setProfileImage2(response.uri);
        console.warn(response.uri);
        console.warn(response);
      }
    }
  };
  const pickCamera2 = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,     
        quality:0.2,
      });
      var fn2 = response.uri.substring(
        response.uri.lastIndexOf("/") + 1,
        response.uri.length
      );
      console.warn(fn2);
      setFilename2(fn2);

      if (!response.cancelled) {
        setProfileImage2(response.uri);
        console.warn(response.uri);
        console.warn(response);
      }
    }
  };
  const uploadImage2 = async () => {
    console.warn({
      name: filename2,
      uri: profileImage2,
      type: "image/jpg",
    });

    const formData = new FormData();
    formData.append("file", {
      name: filename2,
      uri: profileImage2,
      type: "image/jpg",
    });
    try {
      axios({
        method: "POST",
        url: `${BaseUrl}/file/uploadFile`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data; ",
          Authorization: "Bearer " + accessToken,
        },
      }).then((res) => {
        setDisplay2(res.data.responseCode)
        Alert.alert("Image Uploaded Successfully")
       
      
      });
    } catch (error) {
      Alert.alert(error.message);
    }
   
  };
let currentVolume=currentVolumeReading;
let previousVolume=previousVolumeReading;
let c=(currentVolume-previousVolume);
let resultVolumeReading=(c/20)*5;
let currentRecharge=currentRechargeReading;
let previousRecharge=previousRechargeReading;
let resultRecharge=(currentRecharge-previousRecharge);
let currentCoin=currentCoinReading;
let previousCoin=previousCoinReading;
let resultCoin=(currentCoin-previousCoin)
let prevBal=(previousBalance-0);
let cashhand=cashInHand;

let watSal=waterManSalary

var newBal=parseInt(resultRecharge)+parseInt(resultCoin)+parseInt(prevBal)-parseInt(watSal)-parseInt(cashhand)
function xyz(){setNewBalance(newBal)}
console.warn(cashhand)
  return (
    <ScrollView>
      <View>
        <Header />
        <Text style={{ fontSize: 35, marginBottom: 20, zIndex: -1 }}>
          Collection Tasks
        </Text>

        <View style={Styles.container}>
          <SafeAreaView>
            <View>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                PlantName: {plantName}
              </Text>
              <Text style={{ fontSize: 15 }}>Service Date: {moment(serviceDate).format("YYYY-MM-DD")}</Text>

              <View style={{marginBottom:10}}>
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
                <Text>Previous Volume Reading : </Text>
            <TextInput
              placeholder="previous Volume Reading"
              value={previousVolumeReading}
              keyboardType="numeric"
              style={Styles.pre}
            />
             <Text>Current Volume Reading : </Text>
            <TextInput
              placeholder="current Volume Reading"
              keyboardType="numeric"
              value={currentVolumeReading}
              onChangeText={(currentVolumeReading) => {
                setCurrentVolumeReading(currentVolumeReading);
              }}
              style={Styles.inp3}
            />
            <Text style={{marginBottom:10}}>Result Volume reading = {resultVolumeReading}</Text>
            <Text>Previous Recharge Reading : </Text>
            <TextInput
              placeholder="Previous Recharge Reading"
              keyboardType="numeric"
              value={previousRechargeReading}
              
              style={Styles.pre}
            />
            <Text>Current Recharge Reading : </Text>
            <TextInput
              placeholder="Current Recharge Reading"
              keyboardType="numeric"
              value={currentRechargeReading}
              onChangeText={(currentRechargeReading) => {
                setCurrentRechargeReading(currentRechargeReading);
              }}
              style={Styles.inp3}
            />
            <Text style={{marginBottom:20}}>Result Recharge Reading = {resultRecharge}</Text>
            <Text>Recharge Reading Image : </Text>
            
            <Text style={{color:"white"}}>{display1}</Text>
                        
                        <View style={{ flexDirection: "row" }}>
                        <Text
                         
                          style={{ borderWidth: 0.5,borderRadius:5, padding: 10,width:330,marginTop:-10 }}>
                            
                          {filename1}
                          
                          </Text>
                          {display1=="201"?
                          <Text>
                          <MaterialIcons
                              style={Styles.icon}
                              name="done"
                              size={30}
                              color="green"
                            />
                          </Text>: ""}
                          </View>
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={pickImage1}
                            style={Styles.buttonStyle}
                            activeOpacity={0.5}
                          >
                            <MaterialIcons
                              style={Styles.icon}
                              name="collections"
                              size={30}
                              color="white"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={pickCamera1}
                            style={Styles.buttonStyle}
                            activeOpacity={0.5}
                          >
                            <MaterialIcons
                              style={Styles.icon}
                              name="photo-camera"
                              size={30}
                              color="white"
                            />
                          </TouchableOpacity>
            
                          <TouchableOpacity
                            onPress={uploadImage1}
                            
                            style={Styles.buttonStyle}
                            activeOpacity={0.5}
                          >
                            <MaterialIcons
                              style={Styles.icon}
                              name="file-upload"
                              size={30}
                              color="white"
                            />
                          </TouchableOpacity>
                         
                        </View>
            <Text>Previous Coin Reading : </Text>
            <TextInput
              placeholder="Previous Coin Reading"
              keyboardType="numeric"
              value={previousCoinReading}
            
              style={Styles.pre}
            />
            <Text>Current Coin Reading : </Text>
            <TextInput
              placeholder="Current Coin Reading"
              keyboardType="numeric"
              value={currentCoinReading}
              onChangeText={(currentCoinReading) => {
                setCurrentCoinReading(currentCoinReading);
              }}
              style={Styles.inp3}
            />
            <Text style={{marginBottom:20}}>Result Coin Reading = {resultCoin}</Text>
            <Text>Result Coin Image : </Text>
            
            <Text style={{color:"white"}}>{display2}</Text>
                        
                        <View style={{ flexDirection: "row" }}>
                        <Text
                         
                          style={{ borderWidth: 0.5,borderRadius:5, padding: 10,width:330,marginTop:-10 }}>
                            
                          {filename2}
                          
                          </Text>
                          {display2=="201"?
                          <Text>
                          <MaterialIcons
                              style={Styles.icon}
                              name="done"
                              size={30}
                              color="green"
                            />
                          </Text>: ""}
                          </View>
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={pickImage2}
                            style={Styles.buttonStyle}
                            activeOpacity={0.5}
                          >
                            <MaterialIcons
                              style={Styles.icon}
                              name="collections"
                              size={30}
                              color="white"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={pickCamera2}
                            style={Styles.buttonStyle}
                            activeOpacity={0.5}
                          >
                            <MaterialIcons
                              style={Styles.icon}
                              name="photo-camera"
                              size={30}
                              color="white"
                            />
                          </TouchableOpacity>
            
                          <TouchableOpacity
                            onPress={uploadImage2}
                            
                            style={Styles.buttonStyle}
                            activeOpacity={0.5}
                          >
                            <MaterialIcons
                              style={Styles.icon}
                              name="file-upload"
                              size={30}
                              color="white"
                            />
                          </TouchableOpacity>
                         
                        </View>
            <Text>Previous Balance : </Text>
            <TextInput
              placeholder="Previous Balance"
              keyboardType="numeric"
              value={previousBalance}
             
              style={Styles.pre}
            />
            <Text style={{marginBottom:15}}>Total Collection = {resultRecharge+resultCoin+prevBal}</Text>
            
            
         
            
             <Text>Waterman Salary : </Text>
            <TextInput
           
              placeholder="Waterman Salary"
              keyboardType="numeric"
              value={waterManSalary}
              onChangeText={(waterManSalary) => {
                setWaterManSalary(waterManSalary);
              }}
              style={Styles.inp3}
            />
            <Text>Cash In Hand : </Text>
            <TextInput
              placeholder="Cash In Hand"
              keyboardType="numeric"
              value={cashhand}
              onChangeText={(cashInHand) => {
                setCashInHand(cashInHand);
              }}
              style={Styles.inp3}
            />
             <Text style={{marginBottom:20}}>New Balance : {newBal}</Text>
           
            <Text>Volume Reading Image : </Text>
            
<Text style={{color:"white"}}>{display}</Text>
            
            <View style={{ flexDirection: "row" }}>
            <Text
             
              style={{ borderWidth: 0.5,borderRadius:5, padding: 10,width:330,marginTop:-10 }}>
                
              {filename}
              
              </Text>
              {display=="201"?
              <Text>
              <MaterialIcons
                  style={Styles.icon}
                  name="done"
                  size={30}
                  color="green"
                />
              </Text>: ""}
              </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={pickImage}
                style={Styles.buttonStyle}
                activeOpacity={0.5}
              >
                <MaterialIcons
                  style={Styles.icon}
                  name="collections"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={pickCamera}
                style={Styles.buttonStyle}
                activeOpacity={0.5}
              >
                <MaterialIcons
                  style={Styles.icon}
                  name="photo-camera"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={uploadImage}
                
                style={Styles.buttonStyle}
                activeOpacity={0.5}
              >
                <MaterialIcons
                  style={Styles.icon}
                  name="file-upload"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
             
            </View>
           
            
             <Text>Remark </Text>
            <TextInput
             onPressIn={xyz}
              placeholder="Remark"
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
    </ScrollView>
  );
};

export default CollectionForm;
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
    backgroundColor: "#fff",
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "#307ecc",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#307ecc",
    height: 40,
    width: 100,
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 1,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
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
    marginTop: 0,
    paddingLeft: 10,
  },
  inp3: {
    height: 40,
    borderWidth: 0.19,

    borderRadius: 3,
    marginTop: 0,
    marginBottom: 20,
    paddingLeft: 10,
  },

  pre: {
    height: 40,
    borderWidth: 0.19,
    backgroundColor:"#BEBEBE",
    borderRadius: 3,
    marginTop: 0,
    marginBottom: 20,
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
    paddingTop: 5,
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
