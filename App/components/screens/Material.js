import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../AppHeader";
import Footer from "./Footer";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Material = () => {
  const navigation = useNavigation();
  const onMaterialAssign = () => {
    navigation.navigate("MaterialAssign");
  };
  const onMaterialRequest = () => {
    navigation.navigate("MaterialRequest");
  };
  const onMaterialReturn = () => {
    navigation.navigate("MaterialReturn");
  };
  const onMaterialInstall = () => {
    navigation.navigate("MaterialInstallation");
  };
  const onMaterialUninstall = () => {
    navigation.navigate("MaterialUninstall");
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Text style={styles.head} >Material</Text>
  <View>  
        <ScrollView style={styles.main1}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button}  onPress={onMaterialAssign}>
            <Text style={styles.text}>Assigned Materials</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  onPress={onMaterialReturn}>
            <Text style={styles.text}>Returned Materials</Text>
          </TouchableOpacity>
          
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button} onPress={onMaterialInstall} >
            <Text style={styles.text}>Installation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  onPress={onMaterialUninstall}>
            <Text style={styles.text}>Exchange</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button} onPress={onMaterialRequest} >
            <Text style={styles.text}>Material Request</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} >
            <Text style={styles.text}>Shifting</Text>
          </TouchableOpacity> */}
         
        </View>
      </ScrollView>
      </View>

      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default Material;
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  footer: {
    marginTop: -55,
  },
  button: {
    backgroundColor: "#0073A9",
    width: width / 2.2,
    height: height / 15,
    marginLeft: 10,
    marginTop: height * 0.03,
    zIndex: -1,
    color: "white",
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
  },
  text: {
    color: "white",
  },
  head:{
    fontSize: 25,
    zIndex:-1,
    paddingLeft:17,
    paddingTop:10
    },
  main1: {
    zIndex: -1,
    height:300
  },
});
