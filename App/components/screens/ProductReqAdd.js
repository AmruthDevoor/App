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
import { useValidation } from "react-native-form-validator";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SelectList from "react-native-dropdown-select-list";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../AppHeader";
import axios from "axios";
import { useRef } from "react";
import { Navigation } from "react-native-navigation";
import BaseUrl from "../api/BaseUrl";

const ProReqAdd = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState();
  const [defaultMaterial, setDefaultMaterial] = useState({
    key: 0,
    value: "select",
  });

  const [selected, setSelected] = React.useState({});

  const [isFocus, setIsFocus] = useState(false);

  const [accessToken, setAccessToken] = useState("");

  const [product, setProduct] = useState([]);
  const [productName, setProductName] = useState("");
  const [totQuan, setQuantity] = useState("");
  const [remark, setRemark] = useState("");
  const [techId, setTechId] = useState("");
  const [show, setShow] = useState("");
  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { totQuan, remark },
    });

  useEffect(() => {
    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });
    getReqAdd();
  }, [accessToken, techId, show]);
  const productArray = [{ id: 0, name: "nothing to select" }];
  const allProducts =
    product.length <= 0
      ? productArray.map((p) => {
          return { key: p.id, value: p.name };
        })
      : product.map((p) => {
          return { key: p.productId, value: p.productName };
        });
  // const allProducts = product.map((p) => {
  //   return { key: p.productId, value: p.productName };
  // });

  const getReqAdd = () => {
    axios({
      method: "GET",
      url: `${BaseUrl}/product/v1/getAllProducts`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setProduct(result.data);
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
    
    });
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[Styles.label, isFocus && { color: "blue" }]}>
          Product ID
        </Text>
      );
    }
    return null;
  };

  const requestProduct = (e) => {
    if (productName === "") {
      Alert.alert("Please select the product");
    }
    else if (totQuan === "") {
      Alert.alert("Please enter the quantity");
    } else if (totQuan == 0) {
      Alert.alert("Quantity cannot be 0");
    } else if (remark === "") {
      Alert.alert("Please enter the remark");
    } else {
      e.preventDefault();
      //  console.warn(totQuan);

      let data = {
        productDto: {
          productId: selected, // dropdown from get all products
        },
        quantity: totQuan,
        remark: remark,
        technicianDto: {
          technicianId: techId,
        },
      };
      // console.warn(data);
      axios({
        method: "POST",
        url: `${BaseUrl}/productrequest/v1/requestProduct`,
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
          navigation.navigate("ProdReq");
        });
    }
  };
  return (
    <View>
      <Header />
      <Text style={{ fontSize: 35, marginBottom: 20, zIndex: -1 }}>
        Request a Product
      </Text>
      <View style={Styles.container}>
        {renderLabel()}

        <SafeAreaView>
          <SelectList
            defaultOptions={defaultMaterial}
            setSelected={setSelected}
            data={allProducts}
            onSelect={() => getAProduct(selected)}
            placeholder="Select A Product"
          />
          <Text>ProductName: {productName}</Text>
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
              requestProduct(e);
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

export default ProReqAdd;
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
