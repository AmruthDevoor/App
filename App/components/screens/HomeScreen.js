import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../AppHeader";
import CreateCard from "../Cards/CreateCard";
import CreateCard1 from "../Cards/CreateCard1";
import CreateCard2 from "../Cards/CreateCard2";
import CreateCard3 from "../Cards/CreateCard3";
import Footer from "./Footer";
import CreateCard4 from "../Cards/CreateCard4";
import CreateCard5 from "../Cards/CreateCard5";
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const onAbout = () => {
    navigation.navigate("About");
  };
  const onSettingScreen = () => {
    navigation.navigate("SettingScreen");
  };
  return (

    <View style={styles.container}>
        
      <Header />

      <View style={{ zIndex: -1 }}>
        {/* <Button style={styles.button} title="about" onPress={onAbout} />
    <Button style={styles.button} title="SettingScreen" onPress={onSettingScreen} /> */}
        <View style={styles.card}>
          <CreateCard />
          <CreateCard1 />
        </View>

        <View style={styles.card1}>
          <CreateCard2 />
          <CreateCard3 />
        </View>

        <View>
          <CreateCard4 />
          <CreateCard5 />
        </View>
        <View style={styles.footer}>
          <Footer />
        </View>
      </View>
      
    </View>
    
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 100,
    height: height*1.045,
    width: width ,
   
    
  },
  button: {
    backgroundColor: "black",
    paddingRight: 20,
    width: width
  },
  card: {
    flexDirection: "row",
    marginLeft: -10,
    width: width
  },
  card1: {
    flexDirection: "row",
    marginLeft: -10,
    width: width-200,
    
  },
  footer: {
    top: -250,
    paddingTop:height*-3,
    
  },
});
