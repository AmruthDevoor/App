import React from "react";
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
const CreateCard = () => {
  const navigation = useNavigation();
  const onTasks = () => {
    navigation.navigate("Leave");
  };
  return (
    <Card style={Styles.container}>
      <Card.Content>
        <TouchableOpacity >
          <View style={Styles.noti}>
            <MaterialIcons
              name="cancel-presentation"
              size={40}
              color="#0073A9"
            />
            <Text style={Styles.text}>Leave</Text>
            <Text style={Styles.text1}>0</Text>
          </View>
        </TouchableOpacity>
      </Card.Content>

      {/* <Card.Actions>
		<Button>some button</Button>
		</Card.Actions> */}
    </Card>
  );
};
export default CreateCard;
const { width, height } = Dimensions.get("window");
//How to add dimensions in react
const Styles = StyleSheet.create({
  container: {
    alignContent: "center",
    marginTop: -5,
    marginRight: 50,
    height: height * 0.123,
    width: width * 0.39,
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
	marginTop: height*0.01,
	marginLeft:width*0.007,
	fontWeight: "bold",
	fontSize: height*0.022	  },
  text1: {
	color: "#0073A9",
	marginTop: height*-0.08,
	marginLeft:75,
	fontWeight: "bold",
	fontSize: 40
  },
});
