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

const ProductRequest = () => {
  const navigation = useNavigation();
  const onProductAssign = () => {
    navigation.navigate("ProductAssign");
  };
  const onProductReturn = () => {
    navigation.navigate("ProductReturn");
  };
  const onProductReq = () => {
    navigation.navigate("ProdReq");
  };
  const onProductInstall= () => {
    navigation.navigate("ProductInstallation");
  };
  const onProductUninstall= () => {
    navigation.navigate("ProductUninstall");
  };
 
 
 
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Text style={styles.head} >Product</Text>
  <View style={{zIndex:-1}}>  
        <ScrollView style={styles.main1}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button} onPress={onProductAssign}>
            <Text style={styles.text}>Assigned Products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onProductReturn}>
            <Text style={styles.text}>Returned Products</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button}  onPress={onProductInstall}>
            <Text style={styles.text}>Installation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onProductUninstall} >
            <Text style={styles.text}>Uninstall</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button} onPress={onProductReq} >
            <Text style={styles.text}>Product Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <Text style={styles.text}>Exchange</Text>
          </TouchableOpacity>
     
        </View>
      </ScrollView>
      </View>

      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default ProductRequest;
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  footer: {
    marginTop: -62,
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
