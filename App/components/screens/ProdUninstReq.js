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
  import DateTimePicker from "@react-native-community/datetimepicker";
  import { useNavigation } from "@react-navigation/native";
  import SelectList from "react-native-dropdown-select-list";
  import { MaterialIcons } from "@expo/vector-icons";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  import Header from "../AppHeader";
  import axios from "axios";
  import { useRef } from "react";
  
  const ProdUninstReq = () => {
    const [value, setValue] = useState();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
   
    const [showw, setShoww] = useState(false);
    const [selected, setSelected] = React.useState("");
    const [proSelected, setProSelected] = React.useState();

    const [productSelected, setProductSelected] = React.useState("");
  
  
    const [isFocus, setIsFocus] = useState(false);
  
    const [accessToken, setAccessToken] = useState("");
  
    const [plant, setPlant] = useState([]);
    const [product, setProduct] = useState([]);
    const [productName, setProductName] = useState("");
    const [totQuan, setQuantity] = useState();
    const [productSerialNo,setProductSerialNo] = useState("");
   const[plantId,setPlantId]= useState("")

   const[uninstallationDate,setUninstallationDate]= useState("")
    const [remark, setRemark] = useState("");
    const [techId, setTechId] = useState("");
  
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
      setUninstallationDate(fDate);
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
      getInstalledProduct();

    }, [accessToken]);
  
    const AllPlants = plant.map((p) => {
      return { key: p.plantId, value: p.plantName };
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
      });
    };
   
    const getInstalledProduct = () => {
      axios({
        method: "GET",
        url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/productlog/v1/getInstalledProductByPlantId/{plantId}?plantId=${proSelected}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {
        
       console.warn(plantId)
        setProductSerialNo(result.data.productSerialNo);
      setProductName(result.data.productName)
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
  if(productName===""){
    Alert.alert("please enter the product name")
  }
  else if(productSerialNo===""){
    Alert.alert("please enter serial number")
  }
  else if(totQuan===""){
    Alert.alert("please enter the quantity")
  }
  else if(remark===""){
    Alert.alert("please enter the remark")
  }else{
      e.preventDefault();
     
  
      let data ={
       
        "plantDto": {
          "plantId": proSelected
        },
        "productName": productName,
        "productSerialNo": productSerialNo,
        "quantity": totQuan,
        "remark": remark,
        "technicianDto": {
          "technicianId": techId
        },
        "uninstallationDate": uninstallationDate
      }
      
      axios({
          method:"POST",
          url:"https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/productlog/v1/uninstallProduct",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            data:data,
      }).then((res)=>{console.warn(res)});
      
    };}
    return (
      <View>
        <Header />
        <Text style={{fontSize:35 , marginBottom:20,zIndex:-1}} >Uninstall a Product</Text>
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
        
            setSelected={setProSelected}
            data={AllPlants}
            onSelect={() =>getInstalledProduct(proSelected)}
            placeholder="Select A Plant"
          />
          
          <TextInput
            placeholder="Product Name"
          
            value={productName}
           
            onChangeText={(prodName) => {
              setProductName(prodName);
            }}
            style={Styles.inp}
          />
           <TextInput
            placeholder="serial no"
            value={productSerialNo}
            keyboardType="numeric"
            
            style={Styles.inp2}
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
        <View>
            <Text style={{ fontSize: 15 ,paddingTop:10}}>Uninstallation Date: {uninstallationDate}</Text>
            <View>
              <TouchableOpacity>
              <Text style={{backgroundColor:"#0073A9",color:"white",width:350,height:30,textAlign:"center",paddingTop:7 }}  onPress={() => showMode("date")} >
              Uninstallation Date
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
            <Pressable onPress={(e)=>{requestProduct(e)}}  style={Styles.submit}>
              <Text style={Styles.btnText}>Submit</Text>
            </Pressable>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default ProdUninstReq;
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
  