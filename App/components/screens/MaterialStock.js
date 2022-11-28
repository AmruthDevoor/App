import { View, Text , StyleSheet, ScrollView, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../AppHeader'
import Footer from './Footer'
import { Card, DataTable } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const MaterialStock = () => {
    const[techId,setTechId]=useState("")
    const[accessToken,setAccessToken]=useState("")
    const[material,setMaterial]=useState([])
      
    useEffect(() => {
    
        AsyncStorage.getItem("id").then((value) => {
          setTechId(value);
         });
         
        AsyncStorage.getItem("AccessToken").then((value) => {
  
          setAccessToken(JSON.parse(value));
        });
        
        getMaterialData();
      },[accessToken]);
      

      const getMaterialData = () => {
        axios({
          method: "GET",
          url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/technicianmaterialstock/v1/getTechnicianMaterialStock/%7BtechnicianId%7D?technicianId=${techId}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken},
        }).then((result) => {
  
          setMaterial(result.data);
    
        });
      };




  return (
    <View style={{ flex: 1,}}>
      <Header/>
 
   
         <View>    
      <Card style={styles.card}>  
    <Text style={styles.head}>Material Stock</Text>    
      <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title style={styles.title}>Material</DataTable.Title>
        <DataTable.Title style={styles.title}>Total Quantity</DataTable.Title>
        <DataTable.Title style={styles.title}>Current Quantity</DataTable.Title>
      </DataTable.Header>
     
          
                     {material.length <= 0 ? <Text>No Data Found</Text> : material.map((mat)=>{
            return(
             <DataTable.Row  >
        <DataTable.Cell>{mat.materialDto.materialName
        }</DataTable.Cell>
        <DataTable.Cell style={styles.Row}>{mat.totalQuantity}</DataTable.Cell>
        <DataTable.Cell>{mat.currentQuantity}</DataTable.Cell>
      </DataTable.Row>
                )
        })}
           
            
     
  
    </DataTable>
    </Card>
    </View>

    <View style={styles.footer}><Footer/></View>
    </View>
  )
}

export default MaterialStock
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
footer:{
  marginTop: -450,
  zIndex:-1,
},
head:{
fontSize: 25,

paddingLeft:17,
paddingTop:10
},
container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#0073A9',
    color:"white"
  },
  Row:{
paddingLeft: 40
  },
  title:{
color:"white",fontSize:30,
  },
  card:{
    height:height/1.1,
    zIndex:-1,
  
    
  }
})