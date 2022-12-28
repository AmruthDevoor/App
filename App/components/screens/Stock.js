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

const Stock = () => {
  const navigation = useNavigation();
  const onMaterialStock = () => {
    navigation.navigate("MaterialStock");
  };
  const onProductStock = () => {
    navigation.navigate("ProductStock");
  };
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Text style={styles.head} >Stock</Text>
  <View>  
        <ScrollView style={styles.main1}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button} onPress={onMaterialStock}>
            <Text style={styles.text}>Material Stock</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onProductStock}>
            <Text style={styles.text}>Product Stock</Text>
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

export default Stock;
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  footer: {
    marginTop: -60,
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
