// import { View, Text, StyleSheet, TextInput } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native';
// import { Dropdown } from 'react-native-element-dropdown';
// import { MaterialIcons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import Header from '../AppHeader';
// import axios from 'axios';
// const data = [
//     { label: 'Item 1', value: '1' },
//     { label: 'Item 2', value: '2' },
//     { label: 'Item 3', value: '3' },
//     { label: 'Item 4', value: '4' },
//     { label: 'Item 5', value: '5' },
//     { label: 'Item 6', value: '6' },
//     { label: 'Item 7', value: '7' },
//     { label: 'Item 8', value: '8' },
//   ];
//   const matReqAdd = () => {
//     const [value, setValue] = useState(null);
//     const [isFocus, setIsFocus] = useState(false);

//     const [accessToken, setAccessToken] = useState("");
   
//     const[material,setMaterial] = useState([])


//     useEffect(() => {
       
    
//         AsyncStorage.getItem("AccessToken").then((value) => {
    
//           setAccessToken(JSON.parse(value));
//         });
    
//         getReqAdd();
//       }, [accessToken]);
//       const AllMat = material.map((m)=>{
//         m.materialName;
//       })
//       console.warn(AllMat)
//       const getReqAdd = () => {
//         axios({
//           method: "GET",
//           url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/material/v1/getAllMaterials`,
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + accessToken,
//           },
//         }).then((result) => {
//         console.warn(result.data)
//           setMaterial(result.data);
//         });
//       };


//     const renderLabel = () => { 
//       if (value || isFocus) {
//         return (
//           <Text style={[Styles.label, isFocus && { color: 'blue' }]}>
//             Material ID
//           </Text>
//         );
//       }
//       return null;
//     };
//     return (
//         <View>  
//                      <Header/>     
//              <View style={Styles.container}>
   
//           {renderLabel()}
//           <Dropdown
//             style={[Styles.dropdown, isFocus && { borderColor: 'blue' }]}
//             placeholderStyle={Styles.placeholderStyle}
//             selectedTextStyle={Styles.selectedTextStyle}
//             inputSearchStyle={Styles.inputSearchStyle}
//             iconStyle={Styles.iconStyle}
//             data={AllMat}
//             search
//             maxHeight={300}
//             marginTop
//             labelField="label"
//             valueField="value"
//             placeholder={!isFocus ? 'Select item' : '...'}
//             searchPlaceholder="Search..."
//             value={value}
//             onFocus={() => setIsFocus(true)}
//             onBlur={() => setIsFocus(false)}
//             onChange={item => {
//               setValue(item.value);
//               setIsFocus(false);
//             }}
//             renderLeftIcon={() => (
//               <MaterialIcons
//                 style={Styles.icon}
//                 color={isFocus ? 'blue' : 'black'}
//                 name="star"
//                 size={20}
//               />
//             )}
//           />
//         <TextInput placeholder='Quantity' style={Styles.inp}>
           
//         </TextInput>
//         <TextInput placeholder='Remark (max 150 Characters)' style={Styles.inp1}>
           
//         </TextInput>
//         </View>
//         </View>

//       );
    
// }

// export default matReqAdd
// const Styles = StyleSheet.create({
//     container: {
//       backgroundColor: 'white',
//       padding: 17,
//     },
//     inp:{
// height:50,
// borderWidth:0.19,
// borderRadius:3,
// marginTop:20,
// paddingLeft:10,

//     },
//     inp1:{
//         height:100,
//         borderWidth:0.19,
//         borderRadius:3,
//         marginTop:20,
//         paddingLeft:10,
//         paddingBottom:50
        
//             },

//     dropdown: {
//       height: 50,
//       borderColor: 'gray',
//       borderWidth: 0.5,
//       borderRadius: 8,
//       paddingHorizontal: 8,
//     },
//     icon: {
//       marginRight: 5,
//     },
//     label: {
//       position: 'absolute',
//       backgroundColor: 'white',
//       left: 22,
//       top: 7,
//       zIndex: 999,
//       paddingHorizontal: 8,
//       fontSize: 14,
//     },
//     placeholderStyle: {
//       fontSize: 16,
//     },
//     selectedTextStyle: {
//       fontSize: 16,
//     },
//     iconStyle: {
//       width: 20,
//       height: 20,
//     },
//     inputSearchStyle: {
//       height: 40,
//       fontSize: 16,
//     },
//   });










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
  
  const MatReqAdd = () => {
    const [value, setValue] = useState();
  
    const [selected, setSelected] = React.useState("");
  
    const [remark, setRemark] = useState("");
    const [isFocus, setIsFocus] = useState(false);
  
    const [accessToken, setAccessToken] = useState("");
  
    const [material, setMaterial] = useState([]);
  
    const [totQuan, setQuantity] = useState("");
  
    const [techId, setTechId] = useState("");
    const [dataa, setDataa] = React.useState({
      quantity: "",
      remark: "",
      check_textInputChange: false,
      isValidQuantity: true,
      isValidRemark: true,
    });
  
    useEffect(() => {
      AsyncStorage.getItem("AccessToken").then((value) => {
        setAccessToken(JSON.parse(value));
      });
      AsyncStorage.getItem("id").then((value) => {
        setTechId(value);
      });
      getReqAdd();
    }, [accessToken]);
  
    const allMaterials = material.map((m) => {
      return { key: m.materialId, value: m.materialName };
    });
  
    const getReqAdd = () => {
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
    const handleValidQuantity = (text) => {
      if (text == 0) {
        setDataa({
          ...dataa,
          isValidQuantity: false,
        });
      } else {
        setDataa({
          ...dataa,
  
          isValidQuantity: true,
        });
      }
    };
    const handleValidRemark = (remk) => {
      if (remk == "" || remk == null) {
        setDataa({
          ...dataa,
          
          isValidRemark: false,
        });
      } else {
        setDataa({
          ...dataa,
          check_textInputChange:true,
          isValidRemark: true,
        });
      }
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
      if (handleValidQuantity==true || handleValidRemark==true) {
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
      console.warn(data);
      axios({
        method: "POST",
        url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/materialrequest/v1/requestMaterial",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        data: data,
      }).then((res) => {
        console.warn(res);
      });
    }
    else{
      alert(
        "Check the values"
      )
    }
      }
      
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
              setSelected={setSelected}
              data={allMaterials}
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
              onEndEditing={(e) => handleValidQuantity(e.nativeEvent.text)}
              style={Styles.inp}
            />
            {dataa.isValidQuantity ? null : (
              <Text style={Styles.quan}>Quantity cannnot be empty</Text>
            )}
            <TextInput
              placeholder="Remark (max 150 Characters)"
              value={remark}
              onChangeText={(remk) => {
                setRemark(remk);
              }}
              onEndEditing={(e) => handleValidRemark(e.nativeEvent.text)}
              style={Styles.inp1}
            />
            {dataa.isValidRemark ? null : (
              <Text style={Styles.quan}>Remark cannot be empty</Text>
            )}
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
  