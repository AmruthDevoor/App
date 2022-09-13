import { View, StyleSheet, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { Surface } from "react-native-paper";
import { TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");


const Footer = ({
  menu,
  right,
  rightFunction,
  title,
  optionalIcon,
  optionalFunc,
}) => {
  const navigation = useNavigation()
  const onHomeScreen = ()=>{
    navigation.navigate("HomeScreen")
  }
  const onStock = ()=>{
    navigation.navigate("Stock")
  }
  const onMaterial  = ()=>{
    navigation.navigate("Material")
  }
  const onProductRequest  = ()=>{
    navigation.navigate("ProductRequest")
  }
  const onProfile = ()=>{
    navigation.navigate("ProfileScreen")
  }
 

  return (
    <Surface style={styles.header}>
      <View style={styles.view}>
       
     
          <TouchableOpacity onPress={onHomeScreen}>
       <View style={styles.noti}>
       
       <MaterialIcons name="home" size={30} color="#0073A9"   />
       <Text style={styles.text}>Home</Text>
       </View>
          </TouchableOpacity>
        
      </View>
      
      <View style={[styles.rightView]}>
       
          <TouchableOpacity onPress={onStock} >
             <MaterialIcons name="inventory" size={30} color="#0073A9"  />
             <Text style={styles.text}>Stock</Text>
          </TouchableOpacity>
       
        
          {/* <TouchableOpacity>
            <View style={styles.more}>
          <MaterialIcons name="more-vert" size={30} color="#0073A9" />
          </View>
          </TouchableOpacity> */}
        
      </View>
      <TouchableOpacity  onPress={onMaterial}>
             <MaterialIcons style={styles.icon} name="add-circle" size={30} color="#0073A9"   />
             <Text style={styles.text1}>Material</Text>
          </TouchableOpacity>
          
          <TouchableOpacity  onPress={onProductRequest}>
             <MaterialIcons style={styles.icon2} name="check-box-outline-blank" size={30} color="#0073A9"   />
             <Text style={styles.text3}>Product</Text>
          </TouchableOpacity>
          
          <TouchableOpacity  onPress={onProfile}>
             <MaterialIcons style={styles.icon1} name="person" size={30} color="#0073A9"   />
             <Text style={styles.text2}>Profile</Text>
          </TouchableOpacity>
     
    </Surface>
  );
};

export default Footer;

const styles = StyleSheet.create({
  header: {
    height: height*.07,
    marginTop: 385,
    elevation: 6,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    zIndex: -1,
    color:"#0073A9",
  },
  view: {
    flex: 1,
    
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    
  },
  rightView: {
    justifyContent: "center",
    paddingRight: 50,
  },

  
  noti:{
    paddingLeft: 7,
  },
  
  text:{
    left:-4,
    fontSize: 15,
    color: "black",
  },
  text1:{
    paddingRight:10,
    color: "black",
    left:-9

  },
  text2:{
    paddingRight:10,
    color: "black",
    left: -3

  },
  text3:{
    paddingRight:10,
    color: "black",
    left: -5

  },
  icon:{
    paddingRight: 60,
  },
  icon1:{
    paddingRight: 20,
  },
  icon2:{
    paddingRight: 40,
  }
});
