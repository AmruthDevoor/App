import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import Header from "../AppHeader";
import { Card, Headline, Paragraph } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Footer from "./Footer";
const { width, height} = Dimensions.get("screen");
const Notifications = () => {
  return (
    <View style={Styles.container}>
      <Header />

      <View>
        <Card style={Styles.Card}>
          <Card.Content>
            <Headline>Notification 1</Headline>
          </Card.Content>
          <Card.Content>
            <Paragraph>this is a notification</Paragraph>
          </Card.Content>
        </Card>
      </View>
      <View>
        <Card style={Styles.Card}>
          <Card.Content>
            <Headline>Notification 2</Headline>
          </Card.Content>
          <Card.Content>
            <Paragraph>this is a notification</Paragraph>
          </Card.Content>
        </Card>
      </View>
      <View>
        <Card style={Styles.Card}>
          <Card.Content>
            <Headline>Notification 3</Headline>
          </Card.Content>
          <Card.Content>
            <Paragraph>this is a notification</Paragraph>
          </Card.Content>
        </Card>
      </View>
      <View>
        <Card style={Styles.Card}>
          <Card.Content>
            <Headline>Notification 4</Headline>
          </Card.Content>
          <Card.Content>
            <Paragraph>this is a notification</Paragraph>
          </Card.Content>
        </Card>
      </View>
      <View style={Styles.Footer}>    
          <Footer/>
          </View>

    </View>
  );
};

export default Notifications;
const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f9ff",
    height:height,
    width:width,
   

  },
  Footer:{
marginTop:width-580
  },
  Card: {
    alignContent: "center",
    margin: 10,
    marginLeft:10,
    height: height*0.115,
    width: width-30,
    zIndex: -1,
   
    borderWidth: 1,
    borderRadius: 10,
    
    borderColor: '#0073A9',
    borderBottomWidth: 5,
    shadowColor: '#0073A9',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 100,
    shadowRadius: 2,
    elevation: 1,
   
  },
});
