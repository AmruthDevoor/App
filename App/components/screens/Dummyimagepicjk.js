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
  import DateTimePicker from "@react-native-community/datetimepicker";
  import React, { useEffect, useState } from "react";
  import * as ImagePicker from "expo-image-picker";
  import {Picker} from '@react-native-picker/picker';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import DocumentPicker from "react-native-document-picker";
  import Header from "../AppHeader";
  import axios from "axios";
import { Navigation } from "react-native-navigation";
import { useNavigation } from "@react-navigation/native";
  
  const CollectionForm = () => {
    const [profileImage, setProfileImage] = useState('');
  const [progress, setProgress] = useState(0);
  
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const[filename,setFilename]= useState();
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
    const [photo, setPhoto] = useState("");
    const [status, setStatus] = useState("");
    const [remark, setRemark] = useState("");
    const navigation = useNavigation();

    const[plantName,setPlantName] = useState("")
  
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
      AsyncStorage.getItem("collectiontaskId").then((value) => {
        setCollectiontaskId(value);
      });
      getCollectiontaskId();

      getCollectionByCollectionId();

    }, [accessToken,techId,collectiontaskId]);
  console.warn(collectiontaskId + "hi") ;

    const getCollectiontaskId = () => {
      console.warn("hey"+collectiontaskId)
      axios({
        method: "GET",
        url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/collectiontask/v1/getCollectionTasksByTechnicianId/{technicianId}?technicianId=${techId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {
        console.warn(result.data);

      });
    };
    
    const getCollectionByCollectionId =() =>{
      axios({
        method: "GET",
        url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/collectiontask/v1/getCollectionTaskByCollectiontaskId/{collectiontaskId}?collectiontaskId=${collectiontaskId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {
        console.warn(result.data.plantReadingDto)
        setPreviousBalance(String(result.data.plantReadingDto.previousBalance));
        setPreviousCoinReading(String(result.data.plantReadingDto.previousCoinReading))
        setPreviousVolumeReading(String(result.data.plantReadingDto.previousVolumeReading))
        setPreviousRechargeReading(String(result.data.plantReadingDto.previousRechargeReading))
        setPlantName(result.data.plantReadingDto.plantName)
       });
    };
    console.warn(previousBalance)
  
    const requestTask = (e) => {
      if(previousVolumeReading==="")
      {
        Alert.alert("Please Enter previous Volume Reading")
      }else if(currentVolumeReading===""){
        Alert.alert("Please Enter Current Volume Reading")
      }
      else if(previousRechargeReading===""){
        Alert.alert("Please Enter Previous Recharge Reading")
      }
      else if(currentRechargeReading===""){
        Alert.alert("Please Enter Current Recharge Reading")
      }
      else if(previousCoinReading===""){
        Alert.alert("Please Enter previous Coin Reading")
      }
      else if(currentCoinReading===""){
        Alert.alert("Please Enter Current Coin Reading")
      }
      else if(previousBalance===""){
        Alert.alert("Please Enter previous Balance")
      }
      else if(newBalance===""){
        Alert.alert("Please Enter new Balance")
      }
      else if(waterManSalary===""){
        Alert.alert("Please Enter water Man Salary")
      }
      else if(cashInHand===""){
        Alert.alert("Please Enter cash In hand")
      }
      else if(remark===""){
        Alert.alert("Please Enter remark")
      }
      else if(status===""){
        Alert.alert("please enter status")
      }
      else
      {
      e.preventDefault();
  
      let data = {
        cashInHand: cashInHand,
        collectionTaskDto: {
          collectiontaskId: collectiontaskId
        },
        currentCoinReading: currentCoinReading,
        currentRechargeReading: currentRechargeReading,
        currentVolumeReading: currentVolumeReading,
        newBalance: newBalance,
        previousBalance: Number(previousBalance),
        previousCoinReading: Number(previousCoinReading),
        previousRechargeReading: Number(previousRechargeReading),
        previousVolumeReading: Number(previousVolumeReading),
        readingPhotoName: photo,
        remark: remark,
        serviceDate: serviceDate,
        status: status,
        technicianDto: {
          technicianId: techId
        },
        waterManSalary: waterManSalary
      }
      console.warn(data);
      axios({
        method: "POST",
        url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/collectiontask/v1/postTechnicianCollectionTask",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        data: data,
      }).then((res) => {
        alert(res.data.message)
        navigation.navigate("Collection")
      });
     
    };
  }
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      var fn = response.uri.substring(response.uri.lastIndexOf('/') + 1, response.uri.length);
      console.warn(fn);
      setFilename(fn);
      

      if (!response.cancelled) {
        setProfileImage(response.uri);
        console.warn(response.uri)
        console.warn(response)
      }
      
    
    }
  };
  const uploadImage = async () => {
    console.warn({
      name: filename,
      uri: profileImage,
      type: 'image/jpg',
    })
    
    const formData = new FormData();
    formData.append('file', {
      name: filename,
      uri: profileImage,
      type: 'image/jpg',
    });
    try{
      axios({
              method: "POST",
               url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/file/uploadFile",
               data:formData,
               headers: {
                 "Content-Type": "multipart/form-data; ",
                 Authorization: "Bearer " + accessToken,
               },
               
             }).then((res) => {
                  console.warn(res);
                   });
    }
    catch (error) {
      console.warn(error.message);
    }}
    
    return (
        <ScrollView>
      <View>
        <Header />
        <Text style={{ fontSize: 35, marginBottom: 20, zIndex: -1 }}>Collection Tasks</Text>
        
        <View style={Styles.container}>
          <SafeAreaView>
            <View>
              <Text style={{fontSize:20,marginBottom: 10,}}>PlantName: {plantName}</Text>
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
           
            
        
            <TextInput
              placeholder="previous Volume Reading"
              value={previousVolumeReading}
              keyboardType="numeric"
            
              style={Styles.inp3}
            />
            <TextInput
              placeholder="current Volume Reading"
              keyboardType="numeric"
              value={currentVolumeReading}
              onChangeText={(currentVolumeReading) => {
                setCurrentVolumeReading(currentVolumeReading);
              }}
              style={Styles.inp3}
            />
            <TextInput
              placeholder="Previous Recharge Reading"
              keyboardType="numeric"
              value={previousRechargeReading}
              onChangeText={(previousRechargeReading) => {
                setPreviousRechargeReading(previousRechargeReading);
              }}
              style={Styles.inp3}
            />
            <TextInput
              placeholder="Current Recharge Reading"
              keyboardType="numeric"
              value={currentRechargeReading}
              onChangeText={(currentRechargeReading) => {
                setCurrentRechargeReading(currentRechargeReading);
              }}
              style={Styles.inp3}
            />
            <TextInput
              placeholder="Previous Coin Reading"
              keyboardType="numeric"
              value={previousCoinReading}
              onChangeText={(previousCoinReading) => {
                setPreviousCoinReading(previousCoinReading);
              }}
              style={Styles.inp3}
            />
            <TextInput
              placeholder="Current Coin Reading"
              keyboardType="numeric"
              value={currentCoinReading}
              onChangeText={(currentCoinReading) => {
                setCurrentCoinReading(currentCoinReading);
              }}
              style={Styles.inp3}
            />
            <TextInput
              placeholder="Previous Balance"
              keyboardType="numeric"
              value={previousBalance}
              onChangeText={(previousBalance) => {
                setPreviousBalance(previousBalance);
              }}
              style={Styles.inp3}
            />
            <TextInput
              placeholder="New Balance"
              keyboardType="numeric"
              value={newBalance}
              onChangeText={(newBalance) => {
                setNewBalance(newBalance);
              }}
              style={Styles.inp3}
            />
            <TextInput
              placeholder="Waterman Salary"
              keyboardType="numeric"
              value={waterManSalary}
              onChangeText={(waterManSalary) => {
                setWaterManSalary(waterManSalary);
              }}
              style={Styles.inp3}
            />
            <TextInput
              placeholder="Cash In Hand"
              keyboardType="numeric"
              value={cashInHand}
              onChangeText={(cashInHand) => {
                setCashInHand(cashInHand);
              }}
              style={Styles.inp3}
            />
            <Text style={{borderWidth:1,padding:10}}>Reading Image</Text>
  <View style={{flexDirection:"row"}}>
            <TouchableOpacity
          style={Styles.buttonStyle}
          activeOpacity={0.5}
          >
          <Text style={Styles.buttonTextStyle} onPress={pickImage}  >Select Reading Image</Text>
          </TouchableOpacity>
          
         
          <TouchableOpacity
          style={Styles.buttonStyle}
          activeOpacity={0.5}
         >
          <Text style={Styles.buttonTextStyle} onPress={uploadImage}>Upload Reading Image</Text>
        </TouchableOpacity>
       
      </View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <TextInput
              placeholder="Reamrk"
              value={remark}
              onChangeText={(text) => {
                setRemark(text);
              }}
              style={Styles.inp2}
            />
             <TextInput
              placeholder="status"
              value={status}
              onChangeText={(text) => {
                setStatus(text);
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
      marginTop: 10,
      marginBottom:10,
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