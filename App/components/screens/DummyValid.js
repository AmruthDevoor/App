import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import SelectList from "react-native-dropdown-select-list";
  import { MaterialIcons } from "@expo/vector-icons";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  import Header from "../AppHeader";
  import axios from "axios";
  import { useRef } from "react";
import { Navigation } from "react-native-navigation";
  
  const ProReqAdd = () => {
    const navigation = useNavigation();
    const [value, setValue] = useState();
  
    const [selected, setSelected] = React.useState("");
  
    const [isFocus, setIsFocus] = useState(false);
  
    const [accessToken, setAccessToken] = useState("");
  
    const [product, setProduct] = useState([]);
  
    const [totQuan, setQuantity] = useState("");
    const [remark, setRemark] = useState("");
    const [techId, setTechId] = useState("");
   const[show,setShow] = useState("")
    
    useEffect(() => {
      AsyncStorage.getItem("AccessToken").then((value) => {
        setAccessToken(JSON.parse(value));
      });
      AsyncStorage.getItem("id").then((value) => {

        setTechId(value);
      });
      getReqAdd();
    }, [accessToken,techId,show]);
  
    const allProducts = product.map((p) => {
      return { key: p.productId, value: p.productName };
    });
  
    const getReqAdd = () => {
      axios({
        method: "GET",
        url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/product/v1/getAllProducts`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {
        setProduct(result.data);
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
  
      e.preventDefault();
    //  console.warn(totQuan);
  
      let data ={
        "productDto": {
          "productId": selected                          // dropdown from get all products
        },
        "quantity": totQuan,
        "remark": remark,
        "technicianDto": {
          "technicianId": techId
        }
      }
      // console.warn(data);
      axios({
          method:"POST",
          url:"https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/productrequest/v1/requestProduct",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            data:data,

      }).then((res)=>{alert(res.data.message)}).then(()=>{navigation.navigate("ProdReq")});
      
      
    };
    return (
      <View>
        <Header />
        <Text style={{fontSize:35 , marginBottom:20,zIndex:-1}} >Request a Product</Text>
        <View style={Styles.container}>
          {renderLabel()}
  
  <SafeAreaView>
          <SelectList
            setSelected={setSelected}
            data={allProducts}
            onSelect={() => alert(selected)}
            placeholder="Select A Product"
          />
          <TextInput
            placeholder="Quantity"
          
            value={totQuan}
            keyboardType="numeric"
            onChangeText={(text) => {
              setQuantity(text);
            }}
            style={Styles.inp}
          />
          
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
            <Pressable onPress={(e)=>{requestProduct(e)}} style={Styles.submit}>
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
      zIndex:-1
    },
    inp: {
      height: 50,
      borderWidth: 0.19,
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
  