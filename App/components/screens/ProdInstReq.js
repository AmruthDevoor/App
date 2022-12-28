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
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Header from "../AppHeader";
import axios from "axios";
import { useRef } from "react";
import { Button } from "react-native-paper";
import { Image } from "react-native";
import BaseUrl from "../api/BaseUrl";

const ProdInstReq = () => {
  const options = {
    title: "Select Image",
    type: "library",
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: false,
    },
  };

  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [profileImage, setProfileImage] = useState("");
  const [showw, setShoww] = useState(false);
  const [value, setValue] = useState();
  const [image, setImage] = useState(null);
  const [selected, setSelected] = React.useState({});
  const [proSelected, setProSelected] = React.useState({});
  const [display, setDisplay] = useState();
  const [productSelected, setProductSelected] = React.useState("");

  const [defaultMaterial, setDefaultMaterial] = useState({
    key: 0,
    value: "select",
  });
  const [defaultProduct, setDefaultProduct] = useState({
    key: 0,
    value: "select",
  });

  const [isFocus, setIsFocus] = useState(false);

  const [accessToken, setAccessToken] = useState("");
  const [plantName, setPlantName] = useState("");
  const [plant, setPlant] = useState([]);
  const [product, setProduct] = useState([]);

  const [totQuan, setQuantity] = useState("1");
  const [productSerialNo, setProductSerialNo] = useState("");

  const [show, setShow] = useState("");
  const [productName, setProductName] = useState("");
  const [installationDate, setInstallationDate] = useState("");
  const [remark, setRemark] = useState("");
  const [filename, setFilename] = useState();
  const [techId, setTechId] = useState();
  const onFromChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShoww(Platform.OS === "android");
    setShoww(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.toLocaleDateString();
    setInstallationDate(fDate);
  };
  const showMode = (currentMode) => {
    setShoww(true);
    setMode(currentMode);
  };

  useEffect(() => {
    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });
    getAllPlants();
    getAllProducts();
  }, [accessToken, techId, show]);

  const plantArray = [{ id: 0, name: "nothing to select" }];
  const AllPlants =
    plant.length <= 0
      ? plantArray.map((p) => {
          return { key: p.id, value: p.name };
        })
      : plant.map((p) => {
          return { key: p.plantId, value: p.plantName };
        });

  // const AllPlants = plant.map((p) => {
  //   return { key: p.plantId, value: p.plantName };
  // });
  const productArray = [{ id: 0, name: "Nothing to select" }];
  const AssignedProduct =
    product.length <= 0
      ? productArray.map((ap) => {
          return { key: ap.id, value: ap.name };
        })
      : product.map((ap) => {
          return {
            key: ap.productId,
            value: ap.productName === null ? "no name" : ap.productName,
            ser: ap.productSerialNo,
          };
        });
  // const AssignedProduct = product.map((ap) => {
  //   return { key: ap.productHandoverId, value: (ap.productName===null)? "no name":ap.productName ,ser:ap.productSerialNo, };

  // });

  const getAllPlants = () => {
    axios({
      method: "GET",
      url: ` ${BaseUrl}/plant/v1/getAllPlants`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setPlant(result.data);
    });
  };
  const getAllProducts = () => {
    axios({
      method: "GET",
      url: ` ${BaseUrl}/product/v1/getAllProducts`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setProduct(result.data);
      console.warn(result.data);

      // console.warn(result.data.productName)
    });
  };
  const getAProduct = (id) => {
    axios({
      method: "GET",
      url: `${BaseUrl}/product/v1/getProductByProductId/{productId}?productId=${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setProductName(result.data.productName);
      console.warn(result.data.productName);
    });
  };
  const getAPlant = (id) => {
    axios({
      method: "GET",
      url: ` ${BaseUrl}/plant/v1/getPlantByPlantId/{plantId}?plantId=${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setPlantName(result.data.plantName);
    });
  };
  // const getByProductHandoverId = (id) => {
  //   axios({
  //     method: "GET",
  //     url: ` ${BaseUrl}/productassign/v1/getAssignedProductById/{productHandoverId}?productHandoverId=${id}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   }).then((result) => {
  //     setProductSerialNo(result.data.productSerialNo);
  //     setProductName(result.data.productName);
  //   });
  // };
  // const getAssignedProduct = () => {
  //   axios({
  //     method: "GET",
  //     url: `${BaseUrl}/productassign/v1/getAllAssignedProducts/{technicianId}?technicianId=${techId}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   }).then((result) => {
  //     setProduct(result.data);
  //   });
  // };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[Styles.label, isFocus && { color: "blue" }]}>
          Product Id
        </Text>
      );
    }
    return null;
  };

  const requestProduct = (e) => {
    if (productName === "") {
      Alert.alert("please select A product");
    } else if (totQuan === "") {
      Alert.alert("Please enter the quantity");
    }  else if (plantName == 0) {
      Alert.alert("Select A Plant");
    } else if (productSerialNo === "") {
      Alert.alert("enter the SerialNumber");
    } 
    else if (plantName == 0) {
      Alert.alert("Select A Plant");
    } 
    else if (display != "201") {
      Alert.alert("Please select pic");
    } else if (installationDate === "") {
      Alert.alert("Please select the Date");
    } else if (remark === "") Alert.alert("Please enter the remark");
    else {
      e.preventDefault();

      let data = {
        plantDto: {
          plantId: selected,
        },
        productDto: {
          productId: proSelected,
        },
        productName: productName,
        productSerialNo: productSerialNo,
        quantity: totQuan,
        remark: remark,
        installationDate: installationDate,
        picName: filename,
        technicianDto: {
          technicianId: techId,
        },
      };

      axios({
        method: "POST",
        url: `${BaseUrl}/productlog/v1/installProduct`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        data: data,
      })
        .then((res) => {
          if (res.data.responseCode === 201) {
            alert(res.data.message);
          } else if (res.data.responseCode === 400) {
            alert(res.data.errorMessage);
          }
        })
        .then(() => {
          navigation.navigate("ProductInstallation");
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
        aspect:[4,3],
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
        url: `${BaseUrl}/file/uploadFile`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data; ",
          Authorization: "Bearer " + accessToken,
        },
      }).then((res) => {
        setDisplay(res.data.responseCode);
        Alert.alert("Image Uploaded Successfully");
      });
    } catch (error) {
      console.warn(error.message);
    }
  };
  return (
    <View>
      <ScrollView>
        <Header />
        <Text style={{ fontSize: 35, marginBottom: 20, zIndex: -1 }}>
          Install a Product
        </Text>

        <View style={Styles.container}>
          {renderLabel()}

          <SafeAreaView>
            <SelectList
              defaultOptions={defaultMaterial}
              setSelected={setProSelected}
              data={AssignedProduct}
              onSelect={() => getAProduct(proSelected)}
              placeholder="Select A Product"
            />
            <Text style={{ marginTop: 20 }}>Product Name :</Text>
            <TextInput
              placeholder="Product Name"
              value={productName}
             
              style={Styles.name}
            />
            <Text style={{ marginTop: 20 }}>Serial No : </Text>
            <TextInput
              placeholder="Serial Number"
              value={productSerialNo}
              onChangeText={(serial) => {
                setProductSerialNo(serial);
              }}
              style={Styles.ser}
            />
            <Text style={{ marginTop: 20 }}>Quantity : </Text>
            <TextInput
              placeholder="Quantity"
              value={totQuan}
              keyboardType="numeric"
              style={Styles.quan}
            />

            <SelectList
              defaultOptions={defaultProduct}
              setSelected={setSelected}
              data={AllPlants}
              onSelect={() => getAPlant(selected)}
              placeholder="Select A Plant"
            />
            <Text>plantName: {plantName}</Text>
            <Text style={{ marginTop: 15 }}>FileName : </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  borderWidth: 0.5,
                  borderRadius: 5,
                  padding: 10,
                  width: 330,
                }}
              >
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
            <View>
              <Text style={{ fontSize: 15, paddingTop: 10, marginTop: 10 }}>
                Installation Date:{" "}
                {moment(installationDate).format("YYYY-MM-DD")}
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
                    }}
                    onPress={() => showMode("date")}
                  >
                    Installation Date
                  </Text>
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
            <Text style={{ marginTop: 20 }}>Remark : </Text>
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
    </View>
  );
};

export default ProdInstReq;
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
    marginTop: 5,
    paddingLeft: 10,
  },
  name: {
    height: 50,
    backgroundColor:"#BEBEBE",
    borderWidth: 0.19,
    borderRadius: 3,
    marginTop: 5,
    paddingLeft: 10,
  },
  quan: {
    height: 50,
    borderWidth: 0.19,
    backgroundColor:"#BEBEBE",
    borderRadius: 3,
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 10,
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
  inp2: {
    height: 50,
    borderWidth: 0.19,
    borderRadius: 3,
    marginTop: 5,
    marginBottom: 3,
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
  ser: {
    height: 50,
    borderWidth: 0.19,
    borderRadius: 3,
    marginTop: 5,
    paddingLeft: 10,
    paddingBottom: 0,
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
