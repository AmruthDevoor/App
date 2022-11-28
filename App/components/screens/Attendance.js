import { View, Text , StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../AppHeader'
import Footer from './Footer'
import { Card, DataTable } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { MaterialIcons } from '@expo/vector-icons'

const Attendance = () => {
    const[techId,setTechId]=useState("")
    const[accessToken,setAccessToken]=useState("")
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(10);
    const [pageSize, setPageSize] = useState(10);
    const[attendance,setAttendance]= useState([])
    useEffect(() => {
    
        AsyncStorage.getItem("id").then((value) => {
          setTechId(value);
         });
         
        AsyncStorage.getItem("AccessToken").then((value) => {
  
          setAccessToken(JSON.parse(value));
        });
        
        getAttendance();
      },[accessToken,pageNumber,attendance]);
      

      const getAttendance = () => {
        axios({
          method: "GET",
          url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/attendance/v1/getAllAttendanceByPaginationAndTechnicianId/{pageNumber}/{pageSize}/{technicianId}?pageNumber=${pageNumber}&pageSize=${pageSize}&technicianId=${techId}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken},
        }).then((result) => {
  
          setTotalPages(result.data.totalPages);

          setAttendance(result.data.content);
    
        });
      };
      const handlePreviousPage = () => {
        // console.warn("previous page clicked", pageNumber)
         // Do this so your page can't go negative
         setPageNumber(pageNumber-1)
     }
     
     const handleNextPage = () => {
         //console.warn("next page clicked"+ " "+ (pageNumber+1))
         setPageNumber(pageNumber + 1)
     
         
     }



  return (
    <View style={{ flex: 1, zIndex:-1}}>
      <Header/>
    <ScrollView style={{ zIndex:-1}}>  
 <Card style={{height:700,  backgroundColor:"#f6f9ff"}}>
 <Text style={styles.head}>Attendance</Text>    
 <DataTable style={styles.container}>
<DataTable.Header style={styles.tableHeader}>
  <DataTable.Title style={styles.title}>Attendance Date</DataTable.Title>
  <DataTable.Title style={styles.title}>Attendance</DataTable.Title>
 
</DataTable.Header>

    
               {attendance.length <= 0 ? <Text>No Data Found</Text> : attendance.map((att)=>{
      return(
       <DataTable.Row  >
  <DataTable.Cell>{att.attendanceDate
  }</DataTable.Cell>
  <DataTable.Cell style={styles.Row}>{att.attendance}</DataTable.Cell>

</DataTable.Row>
          )
  })}
     
      


</DataTable>

<Card style={{marginTop:0}}>
  <Card.Content style={styles.page}>
        <TouchableOpacity  onPress={() => handlePreviousPage()}>
      
          <Text>
            {" "}
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color="#0073A9"
            />
          </Text>
        </TouchableOpacity>
        <Text style={styles.page1}>{pageNumber} of {totalPages -1 }</Text>
        <TouchableOpacity onPress={() => handleNextPage()}>
          <Text>
            {" "}
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color="#0073A9"
            />
          </Text>
        </TouchableOpacity>
      </Card.Content>
  </Card>

 </Card>
 </ScrollView>
    <View style={styles.footer}><Footer/></View>
    </View>
  )
}

export default Attendance
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
footer:{
  marginTop: -410,
  marginBottom:30,
  zIndex:-1,
},
head:{
fontSize: 25,

paddingLeft:17,
paddingTop:10
},
page: {
  flexDirection: "row",
  alignItems: "center",
  textAlign: "center",
  paddingLeft: Dimensions.get("screen").width / 2.6,
},
page1: {
  paddingBottom: 5,
  fontSize: 17,
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