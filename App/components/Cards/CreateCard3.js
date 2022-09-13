import React from "react";
import { Text ,View, StyleSheet, TouchableOpacity } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const CreateCard = () => {
	const navigation = useNavigation();
	const onTasks = () => {
		navigation.navigate("Tasks");
	  };
	return(
		
		<Card style={Styles.container}>
		<Card.Content>
		<TouchableOpacity onPress={onTasks}>
       <View style={Styles.noti}>
       <MaterialIcons name="work" size={40} color="#0073A9"/>
	   <Text  style={Styles.text}>Task</Text>
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
export default CreateCard;

const Styles = StyleSheet.create({
	container :{
		alignContent:'center',
		marginTop :-5,
		marginRight:50,
        height:100,
        width:150,
        paddingRight:40,
		backgroundColor:"white"

	},
    noti:{
    height:60,
    width:150,
    paddingRight:12,
	
	
    
    },
	text1: {
		color: "#0073A9",
		marginTop: -80,
		marginLeft:75,
		fontWeight: "bold",
		fontSize: 40
	  },
	text:{
		color:"black",
		marginTop:15,
		marginLeft:3,
		fontSize:20,
		fontWeight:"bold",
		
	},
})
