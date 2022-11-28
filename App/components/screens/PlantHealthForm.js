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
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentPicker from "react-native-document-picker";
import Header from "../AppHeader";
import axios from "axios";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const PlantHealthForm = () => {
  const [profileImage, setProfileImage] = useState("");
  const [profileImage1, setProfileImage1] = useState("");
  const [profileImage2, setProfileImage2] = useState("");
  const [filename, setFilename] = useState();
  const [filename1, setFilename1] = useState();
  const [filename2, setFilename2] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const[display,setDisplay]=useState()
  const[display1,setDisplay1]=useState()

  const[display2,setDisplay2]=useState()
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
  const [logEntry, setLogEntry] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
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
        url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/file/uploadFile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data; ",
          Authorization: "Bearer " + accessToken,
        },
      }).then((res) => {
        setDisplay(res.data.responseCode)
        Alert.alert("Plant Image Uploaded Successfully")
      });
    } catch (error) {
      console.warn(error.message);
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
        url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/file/uploadFile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data; ",
          Authorization: "Bearer " + accessToken,
        },
      }).then((res) => {
        setDisplay1(res.data.responseCode)
        Alert.alert("Spun Image Uploaded Successfully")
      });
    } catch (error) {
      console.warn(error.message);
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
        url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/file/uploadFile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data; ",
          Authorization: "Bearer " + accessToken,
        },
      }).then((res) => {
        setDisplay2(res.data.responseCode)
        Alert.alert("Log Image Uploaded Successfully")
      });
    } catch (error) {
      console.warn(error.message);
    }
  };
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
  }, [accessToken, techId, planthealthtaskId]);

  const getPlanthealthtaskId = () => {
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/planthealthtask/v1/getPlantHealthTasksByTechnicianId/{technicianId}?technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {});
  };

  const requestTask = (e) => {
    if (spunJumboWound === "") {
      Alert.alert("Please enter spun jumbo wound quantity");
    } else if (spunJumboPlain === "") {
      Alert.alert("Please enter spun jumbo plain quantity");
    } else if (spunSlimPlain === "") {
      Alert.alert("Please enter spun slim plain quantity");
    } else if (spunJumboWound === "") {
      Alert.alert("Please enter spun jumbo wound quantity");
    } else if (spunSlimWound === "") {
      Alert.alert("Please enter spun slim wound quantity");
    } else if (remark === "") {
      Alert.alert("Please enter the remark");
    }
    else if (display != "201") {
      Alert.alert("Please select Plant pic");
    
    }
    else if (display1 != "201") {
      Alert.alert("Please select Spun pic");
    
    }
    else if (display2 != "201") {
      Alert.alert("Please select Log pic");
    
    } else {
      e.preventDefault();

      let data = {
        logEntry: logEntry,
        logImageName: filename2,
        plantClean: plantClean,
        plantHealthTaskDto: {
          planthealthtaskId: planthealthtaskId,
        },
        plantImageName: filename,
        remark: remark,
        serviceDate: serviceDate,
        spun: spun,
        spunImageName: filename1,
        spunJumboPlain: spunJumboPlain,
        spunJumboWound: spunJumboWound,
        spunSlimPlain: spunSlimPlain,
        spunSlimWound: spunSlimWound,
        status: status,
        technicianDto: {
          technicianId: techId,
        },
      };

      axios({
        method: "POST",
        url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/planthealthtask/v1/postPlantHealthTask",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        data: data,
      }).then((res) => {
        alert(res.data.message);
        navigation.navigate("PlantTask");
      });
    }
  };

  return (
    <ScrollView>
      <View>
        <Header />
        <Text style={{ fontSize: 35, marginBottom: 20, zIndex: -1 }}>
          Plant Health Tasks
        </Text>

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
            <View style={{ flexDirection: "row" }}>
              <Text style={{fontWeight:"bold",fontSize:15}}>Plant Clean : </Text>
             
              
              <Picker
                style={{
                  
                  width: 100,
                  height: 20,
                  borderWidth: 1,
                  marginLeft:50,
                  paddingBottom: 20,
                  marginTop: -18,
                }}
                selectedValue={plantClean}
                onValueChange={(itemValue) => setPlantClean(itemValue)}
              >
                <Picker.Item label="yes" value="yes" />
                <Picker.Item label="no" value="no" />
              </Picker>
            </View>
            <Text>Plant Image Name : </Text>
            <View style={{ flexDirection: "row" }}>
            <Text style={{ borderWidth: 1, padding: 5, marginTop: 5,width:330 }}> {filename}
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
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={{fontWeight:"bold",fontSize:15}}>Spun : </Text>
              <Picker
                style={{
                  width: 100,
                  height: 20,
                  borderWidth: 1,
                  paddingBottom: 20,
                  marginLeft:80,
                  marginTop: -18,
                }}
                selectedValue={spun}
                onValueChange={(itemValue) => setSpun(itemValue)}
              >
                <Picker.Item label="washed" value="washed" />
                <Picker.Item label="not Washed" value="not Washed" />
              </Picker>
            </View>
            <Text>Spun Jumbo Wound : </Text>
            <TextInput
              placeholder="Spun Jumbo Wound"
              keyboardType="numeric"
              value={spunJumboWound}
              onChangeText={(spunJumboWound) => {
                setSpunJumboWound(spunJumboWound);
              }}
              style={Styles.inp3}
            />
            <Text>Spun Jumbo Plain : </Text>
            <TextInput
              placeholder="Spun jumbo plain"
              keyboardType="numeric"
              value={spunJumboPlain}
              onChangeText={(spunJumboPlain) => {
                setSpunJumboPlain(spunJumboPlain);
              }}
              style={Styles.inp3}
            />
            <Text>Spun Slim Wound : </Text>
            <TextInput
              placeholder="Spun slim wound"
              keyboardType="numeric"
              value={spunSlimWound}
              onChangeText={(spunSlimWound) => {
                setSpunSlimWound(spunSlimWound);
              }}
              style={Styles.inp3}
            />
            <Text>Spun Slim Plain : </Text>
            <TextInput
              placeholder="Spun slim plain"
              keyboardType="numeric"
              value={spunSlimPlain}
              onChangeText={(spunSlimPlain) => {
                setSpunSlimPlain(spunSlimPlain);
              }}
              style={Styles.inp3}
            />
            
            <Text>Spun Image Name : </Text>
            <View style={{ flexDirection: "row" }}>
            <Text style={{ borderWidth: 1, padding: 5, marginTop: 8,width:330 }}>{filename1}
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
            {image1 && (
              <Image
                source={{ uri: image1 }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{fontWeight:"bold",fontSize:15}}>Log Entry : </Text>
              <Picker
                style={{
                  width: 100,
                  height: 20,
                  borderWidth: 1,
                  marginLeft:80,
                  paddingBottom: 20,
                  marginTop: -18,
                }}
                selectedValue={logEntry}
                onValueChange={(itemValue) => setLogEntry(itemValue)}
              >
                <Picker.Item label="yes" value="yes" />
                <Picker.Item label="no" value="no" />
              </Picker>
            </View>
            <Text>Log Image Name : </Text>
            <View style={{ flexDirection: "row" }}>
            <Text style={{ borderWidth: 1, padding: 5, marginTop: 8,width:330 }}>{filename2}
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
            {image2 && (
              <Image
                source={{ uri: image2 }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <Text>Remark : </Text>
            <TextInput
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
    borderRadius: 30,
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
