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
} from "react-native";

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SelectList from "react-native-dropdown-select-list";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../AppHeader";
import axios from "axios";
import { useRef } from "react";
import BaseUrl from "../api/BaseUrl";

const MatReqAdd = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState();

  const [selected, setSelected] = React.useState("");

  const [remark, setRemark] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [defaultMaterial, setDefaultMaterial] = useState({
    key: 0,
    value: "select",
  });

  const [accessToken, setAccessToken] = useState("");

  const [material, setMaterial] = useState([]);
const[materialName,setMaterialName] = useState("");
  const [totQuan, setQuantity] = useState("");
  const [show, setShow] = useState("");
  const [techId, setTechId] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });
    getReqAdd();
  }, [accessToken, techId, show]);

  const materialArray = [{ id: 0, name: "nothing to select" }];
  const allMaterials =
    material.length <= 0
      ? materialArray.map((m) => {
          return { key: m.id, value: m.name };
        })
      : material.map((m) => {
          return { key: m.materialId, value: m.materialName };
        });
  // const allMaterials = material.map((m) => {
  //   return { key: m.materialId, value: m.materialName };
  // });

  const getReqAdd = () => {
    axios({
      method: "GET",
      url: `${BaseUrl}/material/v1/getAllMaterials`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setMaterial(result.data);
      console.warn(result.data);
    });
  };
  const getAMaterial = (id) => {
    axios({
      method: "GET",
      url: ` ${BaseUrl}/material/v1/getMaterialByMaterialId/{materialId}?materialId=${id}`,
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
          Material ID
        </Text>
      );
    }
    return null;
  };

  const requestmaterial = (e) => {
    if (materialName === "") {
      Alert.alert("Please select the material");
    }
    else if (totQuan === "") {
      Alert.alert("Please enter the quantity");
    } else if (totQuan == 0) {
      Alert.alert("Quantity cannot be 0");
    } else if (remark === "") Alert.alert("Please enter the remark");
    else {
      e.preventDefault();

      let data = {
        materialDto: {
          materialId: selected,
        },

        quantity: totQuan,
        remark: remark,
        technicianDto: {
          technicianId: techId,
        },
      };

      axios({
        method: "POST",
        url: `${BaseUrl}/materialrequest/v1/requestMaterial`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        data: data,
      })
        .then((res) => {
          if(res.data.responseCode===201){
            alert(res.data.message)}else if(res.data.responseCode===400){
              alert(res.data.errorMessage)}
        })
        .then(() => {
          navigation.navigate("MaterialRequest");
        });
    }
  };
  return (
    <View>
      <Header />
      <Text style={{ fontSize: 35, marginBottom: 20, zIndex: -1 }}>
        Request a Material
      </Text>
      <View style={Styles.container}>
        {renderLabel()}

        <SafeAreaView>
          <SelectList
            defaultOptions={defaultMaterial}
            setSelected={setSelected}
            data={allMaterials}
            onSelect={() => getAMaterial(selected)}
            placeholder="Select A Material"
          />
          <Text>MaterialName: {materialName}</Text>
          <Text style={{ marginTop: 20 }}>Quantity : </Text>
          <TextInput
            placeholder="Quantity"
            value={totQuan}
            keyboardType="numeric"
            onChangeText={(text) => {
              setQuantity(text);
            }}
            style={Styles.inp}
          />
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
              requestmaterial(e);
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

export default MatReqAdd;
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
  quan: {
    color: "red",
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
