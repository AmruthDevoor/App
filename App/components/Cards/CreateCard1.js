import React from "react";
import { Text ,View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const {width, height} = Dimensions.get("window");

const CreateCard1 = () => {
	const navigation = useNavigation();
	const onTasks = () => {
		navigation.navigate("Tasks");
	  };
	return(
		
		<Card style={Styles.container}>
		<Card.Content>
		<TouchableOpacity onPress={onTasks}>
       <View style={Styles.noti}>
       <MaterialIcons name="work" size={37} color="#0073A9"/>
	   <Text style={Styles.text}>Task</Text>
	   <Text style={Styles.text1}>0</Text>
       </View>
          </TouchableOpacity>
		</Card.Content>
		
	
		{/* <Card.Actions>
		<Button>some button</Button>
		</Card.Actions> */}
	</Card>
		
	)
}
export default CreateCard1;

const Styles = StyleSheet.create({
	container :{
		alignContent:'center',
		margin: -5,
		marginTop: 37,
        height:100,
        width:width-240,
        paddingRight:20,
		backgroundColor:"white",
		

	},
    noti:{
    height:60,
    width:130,
    paddingRight:12,
	
	
    
    },
	text: {
		color: "black",
		marginTop: 10,
		marginLeft:-4,
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


})
