import React from "react";
import { Text ,View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const {width, height} = Dimensions.get("window");

const CreateCard = ({no}) => {
	
	const navigation = useNavigation();
	const onCollection = ({no}) => {
		navigation.navigate("ProductRequest");
	  };
	
	return(
		
		<Card style={Styles.container}>
		<Card.Content>
		<TouchableOpacity >
       <View style={Styles.noti}>
       <MaterialIcons name="shopping-cart" size={40} color="#0073A9"/>
	   <Text  style={Styles.text}>Total Plant Health</Text>
	   <Text style={Styles.text1}>{no}</Text>
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
		margin:37,
		marginTop:-5,
		height: height*0.123,
		width: width*0.39,
        paddingRight:20,
		backgroundColor:"white"

	},
    noti:{
    height:60,
    width:150,
    paddingRight:12,
	
	
    
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

})
