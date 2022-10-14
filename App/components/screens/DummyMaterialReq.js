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