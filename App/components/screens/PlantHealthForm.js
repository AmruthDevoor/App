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
  } from "react-native";
  import DateTimePicker from "@react-native-community/datetimepicker";
  import React, { useEffect, useState } from "react";
  import * as ImagePicker from "expo-image-picker";
  import {Picker} from '@react-native-picker/picker';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import DocumentPicker from "react-native-document-picker";
  import Header from "../AppHeader";
  import axios from "axios";
  
  const PlantHealthForm = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
   
    const [show, setShow] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [planthealthtaskId, setPlanthealthtaskId] = useState("");
    const [techId, setTechId] = useState("");
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
      AsyncStorage.getItem("planthealthtaskId").then((value) => {
        setPlanthealthtaskId(value);
      });
      getPlanthealthtaskId();
    }, [accessToken,techId,planthealthtaskId]);
 console.warn(planthealthtaskId)
    const getPlanthealthtaskId = () => {
      axios({
        method: "GET",
        url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/planthealthtask/v1/getPlantHealthTasksByTechnicianId/{technicianId}?technicianId=${techId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {
       console.warn(result.data);
      });
    };
  
    const requestTask = (e) => {
      if(spunJumboWound===""){
        Alert.alert("Please enter spun jumbo wound quantity")
 }
 else if(spunJumboPlain===""){
  Alert.alert("Please enter spun jumbo plain quantity")
 }
 else if(spunSlimPlain===""){
  Alert.alert("Please enter spun slim plain quantity")
 }
 else if(spunJumboWound===""){
  Alert.alert("Please enter spun jumbo wound quantity")
 }
 else if(spunSlimWound===""){
  Alert.alert("Please enter spun slim wound quantity")
 }
 else if(remark===""){
  Alert.alert("Please enter the remark")
 }
      else{
      e.preventDefault();
  
      let data = {
        logEntry: logEntry,
        logImageName: logImage,
        plantClean: plantClean,
        plantHealthTaskDto :{
          planthealthtaskId: planthealthtaskId,
        },
        plantImageName: plantImage,
        remark: remark,
        serviceDate: serviceDate,
        spun: spun,
        spunImageName: spunImage,
        spunJumboPlain:spunJumboPlain,
        spunJumboWound: spunJumboWound,
        spunSlimPlain:spunSlimPlain,
        spunSlimWound: spunSlimWound,
        status: status,
        technicianDto: {
          technicianId: techId
        }
      }
     // console.warn(data);
      axios({
        method: "POST",
        url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/planthealthtask/v1/postPlantHealthTask",
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
        <ScrollView>
      <View>
        <Header />
        <Text style={{ fontSize: 35, marginBottom: 20, zIndex: -1 }}>Plant Health Tasks</Text>
        
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
            <View style={{flexDirection:"row"}}>
            <Text>Plant Clean:                    </Text>
            <Picker style={{width:100,height:20,borderWidth:1,paddingBottom:20,marginTop:-18}} selectedValue={plantClean} onValueChange={(itemValue)=>setPlantClean(itemValue)} >
                <Picker.Item label="yes" value="yes" />
                <Picker.Item label="no" value="no" />
            </Picker>
            </View>
            <Text style={{borderWidth:1,padding:10}}>plant Image</Text>
  <View style={{flexDirection:"row"}}>
            <TouchableOpacity
          style={Styles.buttonStyle}
          activeOpacity={0.5}
          >
          <Text style={Styles.buttonTextStyle}>Select Plant Image</Text>
          </TouchableOpacity>
          
         
          <TouchableOpacity
          style={Styles.buttonStyle}
          activeOpacity={0.5}
         >
          <Text style={Styles.buttonTextStyle}>Upload Plant Image</Text>
        </TouchableOpacity>
      
        </View>
        <View style={{flexDirection:"row", marginTop:10}}>
            <Text>Spun:                      </Text>
            <Picker style={{width:100,height:20,borderWidth:1,paddingBottom:20,marginTop:-18}} selectedValue={spun} onValueChange={(itemValue)=>setSpun(itemValue)} >
                <Picker.Item label="washed" value="washed" />
                <Picker.Item label="not Washed" value="not Washed" />
            </Picker>
            </View>
            <TextInput
              placeholder="Spun Jumbo Wound"
              value={spunJumboWound}
              onChangeText={(spunJumboWound) => {
                setSpunJumboWound(spunJumboWound);
              }}
              style={Styles.inp3}
            />
            <TextInput
              placeholder="Spun jumbo plain"
              value={spunJumboPlain}
              onChangeText={(spunJumboPlain) => {
                setSpunJumboPlain(spunJumboPlain);
              }}
              style={Styles.inp3}
            />
            <TextInput
              placeholder="Spun slim wound"
              value={spunSlimWound}
              onChangeText={(spunSlimWound) => {
                setSpunSlimWound(spunSlimWound);
              }}
              style={Styles.inp3}
            />
            <TextInput
              placeholder="Spun slim plain"
              value={spunSlimPlain}
              onChangeText={(spunSlimPlain) => {
                setSpunSlimPlain(spunSlimPlain);
              }}
              style={Styles.inp3}
            />
        <Text style={{borderWidth:1,padding:10,marginTop:0}}>spun Image</Text>
        <View style={{flexDirection:"row"}}>
            <TouchableOpacity
          style={Styles.buttonStyle}
          activeOpacity={0.5}
          >
          <Text style={Styles.buttonTextStyle}>Select spun Image</Text>
          </TouchableOpacity>
          
         
          <TouchableOpacity
          style={Styles.buttonStyle}
          activeOpacity={0.5}
         >
          <Text style={Styles.buttonTextStyle}>Upload spun Image</Text>
        </TouchableOpacity>
        
        </View>
        <View style={{flexDirection:"row", marginTop:10}}>
            <Text>Log Entry:                      </Text>
            <Picker style={{width:100,height:20,borderWidth:1,paddingBottom:20,marginTop:-18}} selectedValue={logEntry} onValueChange={(itemValue)=>setLogEntry(itemValue)} >
                <Picker.Item label="yes" value="yes" />
                <Picker.Item label="no" value="no" />
            </Picker>
            </View>
            <Text style={{borderWidth:1,padding:10,marginTop:0}}>Log Image</Text>
        <View style={{flexDirection:"row"}}>
            <TouchableOpacity
          style={Styles.buttonStyle}
          activeOpacity={0.5}
          >
          <Text style={Styles.buttonTextStyle}>Select Log Image</Text>
          </TouchableOpacity>
          
         
          <TouchableOpacity
          style={Styles.buttonStyle}
          activeOpacity={0.5}
         >
          <Text style={Styles.buttonTextStyle}>Upload Log Image</Text>
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
      </ScrollView>
    );
  };
  
  export default PlantHealthForm;
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