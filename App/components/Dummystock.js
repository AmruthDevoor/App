import { View, Text , StyleSheet, ScrollView, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../AppHeader'
import Footer from './Footer'
import { Card, DataTable } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import BaseUrl from '../api/BaseUrl'

const ProductStock = () => {
    const[techId,setTechId]=useState("")
    const[accessToken,setAccessToken]=useState("")
    const[product,setProduct]=useState([])
      
    useEffect(() => {
    
        AsyncStorage.getItem("id").then((value) => {
          setTechId(value);
         });
         
        AsyncStorage.getItem("AccessToken").then((value) => {
      
          setAccessToken(JSON.parse(value));
        });
        
        getProductData();
      },[accessToken]);
      

      const getProductData = () => {
        axios({
          method: "GET",
          url: `${BaseUrl}/technicianstack/v1/getTechnicianProductStock/{technicianId}?technicianId=${techId}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken},
        }).then((result) => {

          setProduct(result.data);
    
        });
      };




  return (
    <View style={{ flex: 1,}}>
      <Header/>
 
   
         <View>    
      <Card style={styles.card}>
        <Text style={styles.head}>Product Stock</Text>      
      <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title style={styles.title1}>Product</DataTable.Title>
        <DataTable.Title style={styles.title} numeric>t</DataTable.Title>
        <DataTable.Title style={styles.title} numeric>c</DataTable.Title>
      </DataTable.Header>
     
          
                     {product.length <= 0 ? <Text>No Data Found</Text> : product.map((pro)=>{
            return(
             <DataTable.Row  >
        <DataTable.Cell style={{backgroundColor:"red",paddingRight}}>{pro.productDto.productName}</DataTable.Cell>
        <DataTable.Cell style={{backgroundColor:"blue",marginLeft:100}} numeric>{pro.totalQuantity}</DataTable.Cell>
        <DataTable.Cell numeric>{pro.currentQuantity}</DataTable.Cell>
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

export default ProductStock
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
    padding: 15,
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