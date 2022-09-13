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
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderStyle:"solid",
    borderColor: "black",
  },
  logo: {
    height: 170,
    width: 170,
    marginBottom: 20,
    marginLeft:33,
    marginTop: height * 0.15,
    alignSelf: "center",
    
  },
  Card:{
    marginTop: 50,
    padding:10,
  }
});
export default FormContainer;
