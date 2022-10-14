import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const PlantHealthCard = ({no}) => {
	const navigation = useNavigation();
	const onCollection = () => {
		navigation.navigate("PlantTask");
	  };
  return (
    <Card style={Styles.container} >
      <Card.Content >
        <TouchableOpacity onPress={onCollection}>
          <View style={Styles.noti}>
            <MaterialIcons name="featured-play-list" size={40} color="#0073A9" />
            <Text style={Styles.text} >Plant Health</Text>
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
export default PlantHealthCard;
const { width, height } = Dimensions.get("window");

const Styles = StyleSheet.create({
  container: {
    alignContent: "center",
    marginLeft: 26,
    height: height*0.13,
    width:width*0.875,
    paddingRight: width*0.1,
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
		marginLeft:-4,
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
