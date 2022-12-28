import { View, Text , StyleSheet, ScrollView, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../AppHeader'
import Footer from './Footer'
import { Card, DataTable } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import BaseUrl from '../api/BaseUrl'

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
          url: `${BaseUrl}/technicianmaterialstock/v1/getTechnicianMaterialStock/%7BtechnicianId%7D?technicianId=${techId}`,
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
        <Text style={styles.head}>material Stock</Text>  
    <DataTable style={styles.container}>
    <DataTable.Header style={styles.tableHeader}>
    <DataTable.Title >Material</DataTable.Title>
        <DataTable.Title  numeric><Text>Total Quantity</Text></DataTable.Title>
        <DataTable.Title  numeric>Current Quantity</DataTable.Title>
    </DataTable.Header>

    {material.length <= 0 ? <Text>No Data Found</Text> : material.map((mat)=>{
       return(

    <DataTable.Row>
    <DataTable.Cell textStyle={{width:170}}>{mat.materialDto.materialName}</DataTable.Cell>
        <DataTable.Cell style={{marginLeft:-10}} numeric>{mat.totalQuantity}</DataTable.Cell>
        <DataTable.Cell style={{marginRight:50}} numeric>{mat.currentQuantity}</DataTable.Cell>
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
  marginTop: -460,
  zIndex:-1,
},
head:{
  fontSize: 25,

  paddingLeft:17,
  paddingTop:10
  },
container: {
    padding: 0,
  },
  tableHeader: {
    backgroundColor: 'skyblue',
    width:"100%",
    color:"white"
  },
  
  title1:{
width:400,
backgroundColor:"red"
  },
  card:{
    height:height/1.1,
    zIndex:-1,
    
  }
})