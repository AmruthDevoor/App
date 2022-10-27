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
  import DateTimePicker from "@react-native-community/datetimepicker";
  import SelectList from "react-native-dropdown-select-list";
  import * as ImagePicker from 'expo-image-picker';
  import { MaterialIcons } from "@expo/vector-icons";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
  import Header from "../AppHeader";
  import axios from "axios";
  import { useRef } from "react";
import { Button } from "react-native-paper";
import { Image } from "react-native";

  
  const ProdInstReq = () => {
    const options = {
      title:'Select Image',
      type:'library',
      options:{
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
    
      },
    }
    
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
   
    const [showw, setShoww] = useState(false);
    const [value, setValue] = useState();
    const [image, setImage] = useState(null);
    const [selected, setSelected] = React.useState("");
    const [proSelected, setProSelected] = React.useState("");

    const [productSelected, setProductSelected] = React.useState("");
  
  
    const [isFocus, setIsFocus] = useState(false);
  
    const [accessToken, setAccessToken] = useState("");
  
    const [plant, setPlant] = useState([]);
    const [product, setProduct] = useState([]);
  
    const [totQuan, setQuantity] = useState();
    const [productSerialNo,setProductSerialNo] = useState();
   const[plantId,setPlantId]= useState("")
   const[productHandoverId,setProductHandoverId]= useState("")
   const[show,setShow] = useState("")
const[productName,setProductName]=useState("")
const[installationDate,setInstallationDate]=useState("")
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
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
     // console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
    
    useEffect(() => {
      AsyncStorage.getItem("AccessToken").then((value) => {
        setAccessToken(JSON.parse(value));
      });
      AsyncStorage.getItem("id").then((value) => {

        setTechId(value);
      });
      getAllPlants();
      getAssignedProduct();

    }, [accessToken,techId,show]);
  
    const AllPlants = plant.map((p) => {
      return { key: p.plantId, value: p.plantName };
    });
    const AssignedProduct = product.map((ap) => {
      return { key: ap.productHandoverId, value: (ap.productName===null)? "no name":ap.productName ,ser:ap.productSerialNo, };
      
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
      setProductName(result.data.productName)
      });
    };
    const getAssignedProduct = () => {
      axios({
        method: "GET",
        url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/productassign/v1/getAllAssignedProducts/{technicianId}?technicianId=${techId}`,
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
            Product Handover Id
          </Text>
        );
      }
      return null;
    };
  
    const requestProduct = (e) => {
 
   if(totQuan===""){
  Alert.alert("Please enter the quantity")}
else if(totQuan==0){
    Alert.alert("Quantity cannot be 0")
  }
  else if(remark==="")
  Alert.alert("Please enter the remark")
  else{
      e.preventDefault();
     
  
      let data ={
        "plantDto": {
          "plantId": selected
        },
        "productHandoverDto": {
          "productHandoverId": proSelected
        },
        "productName":productName,
        "productSerialNo": productSerialNo,
        "quantity": totQuan,
        "remark": remark,
        "installationDate":installationDate,
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
      }).then((res)=>{alert(res.data.message)}).then(()=>{navigation.navigate("ProductInstallation")});
    }
    };
    return (
      <View>
        <Header />
        <Text style={{fontSize:35 , marginBottom:20,zIndex:-1}} >Install a Product</Text>
        <View style={Styles.container}>
          {renderLabel()}
  
  <SafeAreaView>
  <SelectList
            setSelected={setProSelected}
            data={AssignedProduct}
            onSelect={() =>getByProductHandoverId(proSelected)}
           
            placeholder="Select A Product"
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
            style={Styles.quan}
          />
          
     
         <SelectList
        
            setSelected={setSelected}
            data={AllPlants}
            onSelect={() => alert(selected)}
            placeholder="Select A Plant"
          />
          <View>
            <Text style={{ fontSize: 15 ,paddingTop:10}}>Installation Date: {installationDate}</Text>
            <View>
              <TouchableOpacity>
              <Text style={{backgroundColor:"#0073A9",color:"white",width:350,height:30,textAlign:"center",paddingTop:7 }}  onPress={() => showMode("date")} >
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
      zIndex:-1
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
      marginTop: 20,
      marginBottom:20,
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
  