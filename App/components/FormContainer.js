import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { Card } from "react-native-paper";

const FormContainer = ({ children }) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
       <Image style={styles.logo} source={require("../assets/logo.png")} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={styles.Card}>
       <View>
         {children}
         </View>
         </Card>  
      </ScrollView>
     
    </KeyboardAvoidingView>
  );
};
const { height,width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderStyle:"solid",
    borderColor: "black",
    
  },
  logo: {
    height: height*0.19,
    width: width*0.5,
    marginBottom: height*0.01,
    marginLeft:width*0.07,
    marginTop: height * 0.15,
    alignSelf: "center",
    
  },
  Card:{
    marginTop: height*0.07,
    paddingTop:height*0.04,
    padding:width*0.04,
   
  }
});
export default FormContainer;
