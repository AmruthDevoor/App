import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { launchImageLibrary } from "react-native-image-picker";

import Header from "../AppHeader";
import axios from "axios";
import { useRef } from "react";
import { Button } from "react-native-paper";
import { Image } from "react-native";
const options = {
  title: "Select Image",
  type: "library",
  options: {
    selectionLimit: 1,
    mediaType: "photo",
    includeBase64: false,
  },
};

const MatInstReq = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [image, setImage] = useState(null);
  const [showw, setShoww] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const [value, setValue] = useState();
  const[display,setDisplay]=useState()

  const [fileData, setFileData] = useState();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selected, setSelected] = React.useState({});
  const [proSelected, setProSelected] = React.useState({});

  const [productSelected, setProductSelected] = React.useState("");

  const [isFocus, setIsFocus] = useState(false);

  const [accessToken, setAccessToken] = useState("");

  const [plant, setPlant] = useState([]);
  const [material, setMaterial] = useState([]);
  const [materialId, setMaterialId] = useState();
const[defaultMaterial,setDefaultMaterial]=useState({key:0, value:"select"})
  const [totQuan, setQuantity] = useState();
  const [productSerialNo, setProductSerialNo] = useState();
  const [plantId, setPlantId] = useState("");
  const [productHandoverId, setProductHandoverId] = useState("");
  const [show, setShow] = useState("");
  const [filename, setFilename] = useState();
  const [materialName, setMaterialName] = useState("");
  const [installationDate, setInstallationDate] = useState("");
  const [remark, setRemark] = useState("");
  const [techId, setTechId] = useState();
  const onFromChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShoww(Platform.OS === "android");
    setShoww(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();
    setInstallationDate(fDate);
  };
  const showMode = (currentMode) => {
    setShoww(true);
    setMode(currentMode);
  };
  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    console.log(images.assets[0].name);

    const formdata = new FormData();
    formdata.append("file", {
      uri: images.assets[0].uri,
      type: images.assets[0].type,
      name: images.assets[0].fileName,
    });

    console.log("reached here" + JSON.stringify(formdata));
    let res = await fetch(
      "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/file/uploadFile",
      {
        method: "post",
        body: formdata,
        headers: {
          "Content-Type": "multipart/form-data; ",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    let responseJson = await res.json();
    console.log("The output is" + JSON.stringify(responseJson));
  };

  useEffect(() => {
    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });
    getAllPlants();
    getAllMaterials();
  }, [accessToken, techId, show]);
const plantArray=[{id:0,name:"nothing to select"}]
  const AllPlants =plant.length <= 0 ?plantArray.map((p) =>{ return { key: p.id, value: p.name }}) : plant.map((p) => {
    return { key: p.plantId, value: p.plantName };
  });
  const materialArray=[{id:0,name:"Nothing to select"}]
  const AssignedMaterial =material.length <=0 ? materialArray.map((ap) =>{ return { key: ap.id, value: ap.name }}) : material.map((ap) => {
    return {
      key: ap.materialId,
      value: ap.materialName === null ? "no name" : ap.materialName,
    };
  });
  const getAllPlants = () => {
    axios({
      method: "GET",
      url: ` https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/plant/v1/getAllPlants`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setPlant(result.data);
      setPlantId(result.data);
    });
  };

  const getAllMaterials = () => {
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/material/v1/getAllMaterials`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setMaterial(result.data);
    });
  };
  const getByProductHandoverId = () => {
    axios({
      method: "GET",
      url: ` https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/material/v1/getMaterialByMaterialId/{materialId}?materialId=${proSelected}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setMaterialName(result.data.materialName);
    });
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[Styles.label, isFocus && { color: "blue" }]}>
          Product Handover Id
        </Text>
      );
    }
    return null;
  };

  const requestProduct = (e) => {
    if (totQuan === "") {
      Alert.alert("Please enter the quantity");
    } else if (totQuan == 0) {
      Alert.alert("Quantity cannot be 0");
    } else if (remark === "") Alert.alert("Please enter the remark");
    else if (display != "201") {
      Alert.alert("Please select pic");
    
    }
    else {
      e.preventDefault();

      let data = {
        installationDate: installationDate,
        materialDto: {
          materialId: proSelected,
        },

        plantDto: {
          plantId: selected,
        },
        quantity: totQuan,
        remark: remark,
        picName: filename,
        technicianDto: {
          technicianId: techId,
        },
      };

      axios({
        method: "POST",
        url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/materiallog/v1/installMaterial",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        data: data,
      })
        .then((res) => {
          alert(res.data.message);
        })
        .then(() => {
          navigation.navigate("MaterialInstallation");
        });
    }
  };
  // const uploadImage = (e) => {
  //   e.preventDefault();
  //   console.warn("a image")
  //   console.warn(selectedPhoto)

  //   const data = new FormData();

  //   data.append("file", selectedPhoto);

  //   axios({
  //     mode: "no-cors",
  //     method: "post",
  //     url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/file/uploadFile`,
  //     headers: {
  //       "content-type": "multipart/form-data",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //      data

  //   })
  //     .then(function (res) {
  //       console.warn("hi"+res)
  //       setPhotoName(res.data.fileName);
  //     })
  //     .catch(function (error) {
  //       console.warn(error);
  //     });
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
        Alert.alert("Image Uploaded Successfully")
      });
    } catch (error) {
      console.warn(error.message);
    }
  };
  return (
    <ScrollView>
      <Header />
      <Text style={{ fontSize: 35, marginBottom: 20, zIndex: -1 }}>
        Install a Material
      </Text>

      <View style={Styles.container}>
        {renderLabel()}

        <SafeAreaView>
          <SelectList
          defaultOptions={defaultMaterial}
            setSelected={setProSelected}
            data={AssignedMaterial}
            onSelect={() => alert(proSelected)}
            placeholder="Select A Material"
          />
<Text style={{marginTop:10}}>Quantity : </Text>
          <TextInput
            placeholder="Quantity"
            value={totQuan}
            keyboardType="numeric"
            onChangeText={(text) => {
              setQuantity(text);
            }}
            style={Styles.quan}
          />

          <View>
            <Text style={{ fontSize: 15, paddingTop: 10,marginBottom:10,marginTop:-10 }}>
              Installation Date: {installationDate}
            </Text>
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    backgroundColor: "#0073A9",
                    color: "white",
                    width: 350,
                    height: 30,
                    textAlign: "center",
                    paddingTop: 7,
                    marginBottom: 20,
                  }}
                  onPress={() => showMode("date")}
                >
                  Installation Date
                </Text>
                <SelectList
                  setSelected={setSelected}
                  data={AllPlants}
                  onSelect={() => alert(selected)}
                  placeholder="Select A Plant"
                  style={{ marginTop: 10 }}
                />
              </TouchableOpacity>
            </View>
            {showw && (
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
          

          <Text style={{marginTop:15}}>FileName : </Text>
          <View style={{ flexDirection: "row" }}>
          <Text
             
             style={{ borderWidth: 0.5,borderRadius:5, padding: 10 ,width:330}}>
               
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
          <Text style={{marginTop:20}}>Remark : </Text>
          <TextInput
            placeholder="Remark (max 150 Characters)"
            value={remark}
            onChangeText={(remk) => {
              setRemark(remk);
            }}
            style={Styles.inp1}
          />
        </SafeAreaView>
        <TouchableOpacity>
          <Pressable
            onPress={(e) => {
              requestProduct(e);
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

export default MatInstReq;
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
  submit1: {
    height: 50,
    width: width - 215,
    backgroundColor: "#0073A9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,
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
  inp: {
    height: 50,
    borderWidth: 0.19,
    borderRadius: 3,
    marginTop: 20,
    paddingLeft: 10,
  },
  quan: {
    height: 50,
    borderWidth: 0.19,
    borderRadius: 3,
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  inp2: {
    height: 50,
    borderWidth: 0.19,
    borderRadius: 3,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
  },
  inp1: {
    height: 100,
    borderWidth: 0.19,
    borderRadius: 3,
    marginTop: 5,
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
