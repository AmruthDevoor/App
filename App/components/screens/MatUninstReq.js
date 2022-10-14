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
  
  const MatUninstReq = () => {
    const [value, setValue] = useState();
  
    const [selected, setSelected] = React.useState("");
    const [proSelected, setProSelected] = React.useState("");

    const [productSelected, setProductSelected] = React.useState("");
  
  
    const [isFocus, setIsFocus] = useState(false);
  
    const [accessToken, setAccessToken] = useState("");
  
    const [plant, setPlant] = useState([]);
    const [product, setProduct] = useState([]);
  
    const [totQuan, setQuantity] = useState("");
    const [productSerialNo,setProductSerialNo] = useState("");
   const[plantId,setPlantId]= useState("")
   const[productHandoverId,setProductHandoverId]= useState("")

    const [remark, setRemark] = useState("");
    const [techId, setTechId] = useState("");
  
    
    useEffect(() => {
      AsyncStorage.getItem("AccessToken").then((value) => {
        setAccessToken(JSON.parse(value));
      });
      AsyncStorage.getItem("id").then((value) => {

        setTechId(value);
      });
      getAllPlants();
      getAssignedProduct();

    }, [accessToken]);
  
    const AllPlants = plant.map((p) => {
      return { key: p.plantId, value: p.plantName };
    });
    const AssignedProduct = product.map((ap) => {
      return { key: ap.productHandoverId, value: (ap.productName===null)? "no name":ap.productName ,ser:ap.productSerialNo };
      
    });
    console.warn(AssignedProduct)
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
      });
    };
    const getByProductHandoverId = (id) => {
      axios({
        method: "GET",
        url: ` https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/productassign/v1/getAssignedProductById/{productHandoverId}?productHandoverId=${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {
      setProductSerialNo(result.data.productSerialNo);
      });
    };
    const getAssignedProduct = () => {
      axios({
        method: "GET",
        url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/productassign/v1/getAllAssignedProducts/{technicianId}?technicianId=3`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {
        
        setProduct(result.data);
        
      });
    };
    console.warn(product)
  
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
  
      e.preventDefault();
     
  
      let data ={
        "plantDto": {
          "plantId": selected
        },
        "productHandoverDto": {
          "productHandoverId": proSelected
        },
        "productSerialNo": productSerialNo,
        "quantity": totQuan,
        "remark": remark,
        "technicianDto": {
          "technicianId": techId
        }
      } 
      
      axios({
          method:"POST",
          url:"https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/productlog/v1/installProduct",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            data:data,
      }).then((res)=>{console.warn(res)});
      
    };
    return (
      <View>
        <Header />
        <Text style={{fontSize:35 , marginBottom:20,zIndex:-1}} >Uninstall a Material</Text>
        <View style={Styles.container}>
          {renderLabel()}
  
  <SafeAreaView>
  {/* <SelectList
            setSelected={setProSelected}
            data={AssignedProduct}
            onSelect={() =>getByProductHandoverId(proSelected)}
           
            placeholder="Select A Product"
          /> */}
           
           <SelectList
        
            setSelected={setSelected}
            data={AllPlants}
            onSelect={() => alert(selected)}
            placeholder="Select A Material"
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
            <Pressable   style={Styles.submit}>
              <Text style={Styles.btnText}>Submit</Text>
            </Pressable>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default MatUninstReq;
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
    inp2: {
      height: 50,
      borderWidth: 0.19,
      borderRadius: 3,
      marginTop: 20,
      marginBottom:20,
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
  