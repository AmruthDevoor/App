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
    Image,
    ScrollView,
  } from "react-native";
  import moment from "moment";
  import DateTimePicker from "@react-native-community/datetimepicker";
  import React, { useEffect, useState } from "react";
  import * as ImagePicker from "expo-image-picker";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import DocumentPicker from "react-native-document-picker";
  import Header from "../AppHeader";
  import axios from "axios";
  import { useNavigation } from "@react-navigation/native";
  import { MaterialIcons } from "@expo/vector-icons";
  import BaseUrl from "../api/BaseUrl";
  const TaskForm = () => {
    const [profileImage, setProfileImage] = useState("");
    const [profileImage1, setProfileImage1] = useState("");
    const [progress, setProgress] = useState(0);
    const [filename, setFilename] = useState();
    const [filename1, setFilename1] = useState();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [display, setDisplay] = useState();
    const [display1, setDisplay1] = useState();
    const [show, setShow] = useState(false);
    const [showw, setShoww] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [taskId, setTaskId] = useState("");
    const [techId, setTechId] = useState("");
    const [serviceDate, setServiceDate] = useState("");
    const [remark, setRemark] = useState("");
    const [status, setStatus] = useState("");
    const [taskComplaint, setTaskComplaint] = useState("");
    const [image, setImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const [complaintName, setComplaintName] = useState("");
    const [complaintId, setComplaintId] = useState("");
    const [complaintNo, setComplaintNo] = useState("");
    const [plantCode, setPlantCode] = useState("");
    const [plantName, setPlantName] = useState("");
    const [address, setAddress] = useState("");
    const [waterManName, setWAterManName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [description, setDescription] = useState("");
    const [remark1, setRemark1] = useState("");
  
    const navigation = useNavigation();
    const onFromChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
  
      setShow(Platform.OS === "android");
      setShow(false);
      setDate(currentDate);
      let tempDate = new Date(currentDate);
      let fDate = tempDate.toLocaleDateString();
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
      getTaskComplaint();
    }, [accessToken, techId, taskId, taskComplaint]);
  
    const getTaskId = () => {
      axios({
        method: "GET",
        url: `${BaseUrl}/task/v1/getTasksByTechnicianId/{technicianId}?technicianId=${techId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {});
    };
    const getTaskComplaint = () => {
      axios({
        method: "GET",
        url: `${BaseUrl}/task/v1/getTaskComplaintByTaskId/{taskId}?taskId=${taskId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {
        setTaskComplaint(result.data);
  
        setComplaintName(result.data.compliantName);
        setComplaintId(result.data.compliantId);
        setComplaintNo(result.data.compliantNo);
        setPlantName(result.data.plantName);
        setPlantCode(result.data.plantCode);
        setAddress(result.data.address);
        setWAterManName(result.data.waterManName);
        setMobileNumber(result.data.mobileNumber);
        setDescription(result.data.description);
        setRemark1(result.data.remark);
      });
    };
  
    const requestTask = (e) => {
      if (remark === "") {
        Alert.alert("Please enter te remark");
      } else if (display != "201") {
        Alert.alert("Please select old pic");
      } else if (display1 != "201") {
        Alert.alert("Please select new pic");
      } else {
        e.preventDefault();
  
        let data = {
          oldpicName: filename,
          newpicName: filename1,
  
          remark: remark,
          status: status,
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
          url: ` ${BaseUrl}/task/v1/postServiceTask`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          data: data,
        }).then((res) => {
          if (res.data.responseCode === 201) {
            alert(res.data.message);
          } else if (res.data.responseCode === 400) {
            alert(res.data.errorMessage);
          }
          navigation.navigate("Tasks");
        });
      }
    };
  
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
          setDisplay(res.data.responseCode);
          Alert.alert("Old Image Updated Successfully");
        });
      } catch (error) {
        console.warn(error.message);
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
          setDisplay1(res.data.responseCode);
          Alert.alert("New Image Updated Successfully");
        });
      } catch (error) {
        console.warn(error.message);
      }
    };
    // const uploadImage1 = async () => {
    //   console.warn({
    //     name: filename1,
    //     uri: profileImage1,
    //     type: 'image/jpg',
    //   })
  
    //   const formData = new FormData();
    //   formData.append('file', {
    //     name: filename1,
    //     uri: profileImage1,
    //     type: 'image/jpg',
    //   });
    //   try{
    //     axios({
    //             method: "POST",
    //              url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/file/uploadFile",
    //              data:formData,
    //              headers: {
    //                "Content-Type": "multipart/form-data; ",
    //                Authorization: "Bearer " + accessToken,
    //              },
  
    //            }).then((res) => {
    //                 console.warn(res);
    //                  });
    //   }
    //   catch (error) {
    //     console.warn(error.message);
    //   }}
    const showAlert = (text) => {
      Alert.alert(text);
    };
    return (
      <ScrollView>
        <Header />
        {/* <View style={{flexDirection:"row"}}> */}
        <Text style={{ fontSize: 35, marginBottom: 20, zIndex: -1 }}>Tasks</Text>
        {/* <TouchableOpacity onPress={} > 
              <Text  style={Styles.title}> <MaterialIcons
                      name="error"
                      size={20}
                      color="#0073A9"
                    /></Text>
                     </TouchableOpacity>
                     </View> */}
        <View style={Styles.container}>
          <SafeAreaView>
            <View>
              {/* <Text>compliantID: {complaintId}</Text>
              <Text>compliantName: {complaintName}</Text>
              <Text>compliantNo: {complaintNo}</Text>
              <Text>Address: {address}</Text>
              <Text>plantName: {plantName}</Text>
              <Text>plantCode: {plantCode}</Text>
              <Text>waterManName: {waterManName}</Text>
              <Text>mobileNumber: {mobileNumber}</Text>
              <Text>description: {description}</Text>
              <Text>remark: {remark1}</Text> */}
  
              <Text style={{ fontSize: 15 }}>
                Service Date: {moment(serviceDate).format("YYYY-MM-DD")}
              </Text>
  
              <View style={{ marginBottom: 10 }}>
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
  
            <Text>Old File Name : </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ borderWidth: 1, padding: 5, width: 330 }}>
                {filename}
              </Text>
              {display == "201" ? (
                <Text>
                  <MaterialIcons
                    style={Styles.icon}
                    name="done"
                    size={30}
                    color="green"
                  />
                </Text>
              ) : (
                ""
              )}
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
            {image1 && (
              <Image
                source={{ uri: image1 }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <Text style={{ marginTop: 10 }}>New File Name :</Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ borderWidth: 1, padding: 5, marginTop: 1, width: 330 }}
              >
                {filename1}
              </Text>
              {display1 == "201" ? (
                <Text>
                  <MaterialIcons
                    style={Styles.icon}
                    name="done"
                    size={30}
                    color="green"
                  />
                </Text>
              ) : (
                ""
              )}
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
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <Text style={{ marginTop: 20 }}>Remark : </Text>
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
      </ScrollView>
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
      marginTop: 15,
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
    title: {
      fontSize: 23,
      paddingBottom: 13,
      paddingTop: 10,
    },
    inp2: {
      height: 100,
      borderWidth: 0.19,
      paddingBottom: 55,
      borderRadius: 3,
      marginTop: 5,
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
  