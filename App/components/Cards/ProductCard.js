import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CreateCard = ({no}) => {
	const navigation = useNavigation();
	const onProduct = () => {
		navigation.navigate("Stock");
	  };
  return (
    <Card style={Styles.container} >
      <Card.Content >
        <TouchableOpacity >
        
          <View style={Styles.noti}>
            <MaterialIcons name="inventory" size={40} color="#0073A9" />
            <Text style={Styles.text} >Total Service</Text>
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
export default CreateCard;

const { height,width } = Dimensions.get("window");

const Styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 38,
    height: height*0.123,
    width: width*0.39,
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
