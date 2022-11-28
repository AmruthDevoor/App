import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const SideBar = () => {
  const [on,seton]=useState(false);
  const [off,setoff]=useState(false);
  const navigation = useNavigation();
  const onDashboard = () => {
    navigation.navigate("HomeScreen");
  };
  const onCollection = () => {
    navigation.navigate("collectionSide");
  };
  const onTasks = () => {
    navigation.navigate("taskPage");
  };
  const onStock = () => {
    navigation.navigate("Stock");
  };
  const onProductRequest = () => {
    navigation.navigate("ProductRequest");
  };
  const onMaterial = () => {
    navigation.navigate("Material");
  };
  const onAttendance = () => {
    navigation.navigate("Attendance");
  };
  const onLeave = () => {
    navigation.navigate("Leave");
  };
  const onSettings = () => {
    navigation.navigate("SettingScreen");
  };
  const onLogout = () => {
    navigation.navigate("Login");
  };
  const onPlantHealth = () => {
    navigation.navigate("PlantHealthSide");
  };
 
  return (
    <Card style={Styles.container}>
    <ScrollView>
      <Card   style={Styles.container1 } >

      </Card>
     <View>
      <Card.Content>
        <TouchableOpacity onPress={onDashboard} style={Styles.content}>
          <MaterialIcons
            style={Styles.icon}
            name="dashboard"
            size={25}
            color="#0073A9"
          />
          <Text style={Styles.text}>Dashboard </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCollection} style={Styles.content}>
          <MaterialIcons
            style={Styles.icon}
            name="featured-play-list"
            size={25}
            color="#0073A9"
          />
          <Text style={Styles.text}>Collection </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onTasks} style={Styles.content}>
          <MaterialIcons
            style={Styles.icon}
            name="work"
            size={25}
            color="#0073A9"
          />
             <Text style={Styles.text}>Tasks </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlantHealth} style={Styles.content}>
          <MaterialIcons
            style={Styles.icon}
            name="inventory"
            size={25}
            color="#0073A9"
          />
          <Text style={Styles.text}>Plant Health </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onStock} style={Styles.content}>
          <MaterialIcons
            style={Styles.icon}
            name="inventory"
            size={25}
            color="#0073A9"
          />
          <Text style={Styles.text}>Stock </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onProductRequest} style={Styles.content}>
          <MaterialIcons
            style={Styles.icon}
            name="shopping-cart"
            size={25}
            color="#0073A9"
          />
          <Text style={Styles.text}>Product </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onMaterial} style={Styles.content}>
          <MaterialIcons
            style={Styles.icon}
            name="add-shopping-cart"
            size={25}
            color="#0073A9"
          />
          <Text style={Styles.text}>Material </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAttendance} style={Styles.content}>
          <MaterialIcons
            style={Styles.icon}
            name="group"
            size={25}
            color="#0073A9"
          />
          <Text style={Styles.text}>Attendance </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLeave} style={Styles.content}>
          <MaterialIcons
            style={Styles.icon}
            name="cancel-presentation"
            size={25}
            color="#0073A9"
          />
          <Text style={Styles.text}>Leave </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSettings} style={Styles.content}>
          <MaterialIcons
            style={Styles.icon}
            name="settings"
            size={25}
            color="#0073A9"
          />
          <Text style={Styles.text}>Settings </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogout} style={Styles.content}>
          <MaterialIcons
            style={Styles.icon}
            name="logout"
            size={25}
            color="#0073A9"
          />
          <Text style={Styles.text}>Logout </Text>
        </TouchableOpacity>

       
      </Card.Content>
      </View>
     
      </ScrollView>
      </Card>
  );
};
export default SideBar;

const Styles = StyleSheet.create({
  container: {
    alignContents: "center",
    margin: 37,

    height: 800,
    width: 225,
    paddingRight: 20,
    backgroundColor: "white",
    zIndex: 1,
    position: "absolute",
    top: 43,
    left: -35,
  },
  container1:{
    alignContents: "center",
    margin: 37,

    height: 800,
    width: 170,
   paddingLeft:10,
    backgroundColor: "white",
    zIndex: 1,
    position: "absolute",
    top: -38,
    opacity: 0.2,
    left: 187,

  },
  content: {
    height:65,
    width: 226,

    paddingLeft: -30,
    borderColor: "white",

    shadowColor: "#0073A9",

    paddingTop: 8,
    marginLeft: -30,
  },
  text: {
    fontSize: 17,
    paddingLeft: 50,
    paddingTop: 9,

    color: "black",
  },
  icon: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: -34,
  },
});


//how to pick image in react native?



