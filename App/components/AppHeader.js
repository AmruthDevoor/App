import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Surface } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import colors from "./constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SideBar from "./SideBar";


const Header = ({
  menu,
  right,
  rightFunction,
  title,
  optionalIcon,
  optionalFunc,
}) => {
  const navigation = useNavigation()
  const onNoti = ()=>{
    navigation.navigate("Notifications")
  }
 const [on,seton]=useState(false);

  return (
    <Surface style={styles.header}>
      <View style={styles.view}>
     
          <TouchableOpacity>
       <View style={styles.noti}>
       <MaterialIcons name="menu" size={30} color="#0073A9" onPress={()=>{seton(!on)}} />
       </View>
          </TouchableOpacity>
        
      </View>
      
      <View style={[styles.view, styles.rightView]}>
       
          <TouchableOpacity>
             <MaterialIcons name="notifications" size={30} color="#0073A9"   />
          </TouchableOpacity>
       
        
          <TouchableOpacity>
            <View style={styles.more}>
          <MaterialIcons name="more-vert" size={30} color="#0073A9" />
          </View>
          </TouchableOpacity>
        
      </View>
      {on  ? <SideBar/> : ""}
    </Surface>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 80,
    elevation: 4,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    
    color:"white"
  },
  view: {
    flex: 1,
    paddingTop:27,
    margin: 11,
    alignItems: "center",
    flexDirection: "row",
    
  },
  rightView: {
    justifyContent: "flex-end",
    paddingRight: 7,
    paddingTop: 24,
  },
  noti:{
    paddingLeft: 7,
  },
  more:{
    paddingLeft:7,
    
    
  }
});
