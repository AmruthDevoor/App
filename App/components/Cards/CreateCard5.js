import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const CreateCard5 = () => {
	const navigation = useNavigation();
	const onTasks = () => {
		navigation.navigate("Tasks");
	  };
  return (
    <Card style={Styles.container} >
      <Card.Content >
        <TouchableOpacity onPress={onTasks}>
          <View style={Styles.noti}>
            <MaterialIcons name="work" size={40} color="#0073A9" />
            <Text style={Styles.text} >Task</Text>
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
export default CreateCard5;

const Styles = StyleSheet.create({
  container: {
    marginTop: 32,
    alignContent: "center",
    marginLeft: 26,
    height: 100,
    width: 337,
    paddingRight: 0,
    backgroundColor: "white",
  },
  noti: {
    height: 60,
    width: 150,
    paddingRight: 12,
  },
  text: {
    color: "black",
    marginTop: 5,
    marginLeft:-2,
	fontWeight: "bold",
	fontSize: 20
  },
  text1: {
	color: "#0073A9",
    marginTop: -70,
    marginLeft:100,
	fontWeight: "bold",
	fontSize: 40
  },
});
