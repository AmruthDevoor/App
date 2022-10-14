import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CreateCard5 = ({no}) => {
  const [accessToken, setAccessToken] = useState("");
const[noTasks,setNoTasks]=useState("");

  const navigation = useNavigation();
  const onTasks = () => {
    navigation.navigate("Tasks");
  };
 

  return (
    <Card style={Styles.container}>
      <Card.Content>
        <TouchableOpacity onPress={onTasks}>
          <View style={Styles.noti}>
            <MaterialIcons name="work" size={40} color="#0073A9" />
            <Text style={Styles.text}>Task</Text>
            <Text style={Styles.text1}>{no}</Text>
          </View>
        </TouchableOpacity>
      </Card.Content>

      {/* <Card.Actions>
		<Button>some button</Button>
		</Card.Actions> */}
    </Card>
  );
};
export default CreateCard5;
const { width, height } = Dimensions.get("window");

const Styles = StyleSheet.create({
  container: {
    marginTop: 32,
    alignContent: "center",
    marginLeft: 26,
    height: height * 0.12,
    width: width * 0.875,
    paddingRight: width * 0.1,
    backgroundColor: "white",
  },
  noti: {
    height: 60,
    width: 150,
    paddingRight: 12,
  },
  text: {
    color: "black",
    marginTop: height * 0.01,
    marginLeft: width * 0.009,
    fontWeight: "bold",
    fontSize: height * 0.022,
  },
  text1: {
    color: "#0073A9",
    marginTop: height * -0.08,
    marginLeft: 75,
    fontWeight: "bold",
    fontSize: 40,
  },
});
