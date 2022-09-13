import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const {width, height} = Dimensions.get("window");
const CreateCard = () => {
	const navigation = useNavigation();
	const onCollection = () => {
		navigation.navigate("Collection");
	  };
  return (
    <Card style={Styles.container} >
      <Card.Content >
        <TouchableOpacity onPress={onCollection}>
          <View style={Styles.noti}>
            <MaterialIcons name="featured-play-list" size={40} color="#0073A9" />
            <Text style={Styles.text} >Collection</Text>
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

const Styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 38,
    height: 100,
    width: width-240,
    paddingRight:width-250,
    backgroundColor: "white",
  },
  noti: {
    height: 60,
    width: 150,
    paddingRight: 12,
  },
  text: {
    color: "black",
    marginTop: 10,
    marginLeft:-6,
	fontWeight: "bold",
	fontSize: 20
  },
  text1: {
	color: "#0073A9",
    marginTop: -80,
    marginLeft:75,
	fontWeight: "bold",
	fontSize: 40
  },
});
