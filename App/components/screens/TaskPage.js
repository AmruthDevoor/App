import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  responsiveScreenHeight,
  useResponsiveHeight,
  useResponsiveWidth,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Header from "../AppHeader";

import Footer from "./Footer";
import { Card } from "react-native-paper";

import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const TaskPage = () => {
  
  const [techId, setTechId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(10);
  const [pageSize, setPageSize] = useState(5);
  const [TaskPage, setTaskPage] = useState([]);
  const navigation = useNavigation();
  const onTaskSide = (id) => {
    console.warn(id)
    navigation.navigate("taskSide");
    AsyncStorage.setItem ("serviceId",JSON.stringify(id));
  };
  
  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });

    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });


    getTaskPage();
  }, [accessToken,pageNumber]);

  const getTaskPage = () => {
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/task/v1/getAllTasksByPagination/{pageNumber}/{pageSize}/{technicianId}?pageNumber=${pageNumber}&pageSize=${pageSize}&technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      console.warn(result.data);
      setTotalPages(result.data.totalPages);

      setTaskPage(result.data.content);
    });
  };

  const handlePreviousPage = () => {
    console.warn("previous page clicked", pageNumber)
    // Do this so your page can't go negative
    setPageNumber(pageNumber-1)
}

const handleNextPage = () => {
    console.warn("next page clicked"+ " "+ (pageNumber+1))
    setPageNumber(pageNumber + 1)

    
}
const showAlert = (text) =>{
  Alert.alert(text)
}
const viewItem = ({item}) => {

  return (
    <Card style={styles.ccard} onPress={()=>{
      onTaskSide(item.taskId)
    }}>
    <View style={{flexDirection:"row" ,backgroundColor:"skyblue"}}>
    <Text style={styles.ttitle}>{item.taskName}</Text>
 <TouchableOpacity onPress = {()=>{showAlert(item.description)}}> 
  <Text  style={styles.ttitle}> <MaterialIcons
          name="error"
          size={20}
          color="#0073A9"
        /></Text>
         </TouchableOpacity>
        </View>
    <View
      style={{
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
    {/* <Card.Content style={styles.content0}>
      <Paragraph style={styles.paragraph}>
        {item.description}
      </Paragraph>
    </Card.Content> */}
    <Card.Content style={{paddingTop:20}} >
      <Text>Ticket .No: {item.taskTicketNumber}</Text>
     </Card.Content>
     <Card.Content style={{flexDirection:"row",paddingTop:10}} > 
      <View >
      <Text >
        Assigned Date: {moment(item.assigningDate).format("L")}
      </Text  >
      </View>
      <View >
      <Text style={{paddingLeft:30}}>DeadLine: {moment(item.deadlineDate).format("L")}</Text>
      </View>
    </Card.Content>
  </Card>
  )
}

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.main1}>
        <View style={{ zIndex: -1 }}>
          <Text style={styles.head}>Completed Service Tasks</Text>
        

          {/* {TaskPage.map((LeaveReq) => {
            return (
              <ScrollView>
                <Card style={styles.card}>
                <Card.Content >
                    <Text style={styles.header}>
                        {LeaveReq.header}
                    </Text>
                    
                  </Card.Content>
                  <View style={{ flexDirection: "row" }}>                
                      <Card.Content style={{ flexDirection: "row" }}>
                    <Text style={styles.content}>
                      From Date {moment(LeaveReq.fromDate).format("L")}
                    </Text>
               
                  </Card.Content>
               
                  <Card.Content style={{ flexDirection: "row" }}>
                    <Text style={styles.content1}>
                      To Date: {moment(LeaveReq.toDate).format("L")}
                    </Text>
                  </Card.Content>
                  </View>
                  <Card.Content style={styles.remark}>
                    <Text style={styles.content5}>
                      Leave Days: {LeaveReq.leaveDays}
                    </Text>
                  </Card.Content>
                  <Card.Content style={styles.remark}>
                    <Text style={styles.content5}>
                      Status: {LeaveReq.status}
                    </Text>
                  </Card.Content>
                  <Card.Content style={styles.remark}>
                    <Text style={styles.content5}>
                      Description:{"\n"}{LeaveReq.description}
                    </Text>
                  </Card.Content>
                </Card>
              </ScrollView>
            );
          })} */}
           <SafeAreaView>
          <FlatList
              data={TaskPage}
              renderItem={viewItem}
              // ListHeaderComponent={ListHeader}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
          />
      </SafeAreaView> 
        </View>
      </ScrollView>
      <View style={{ zIndex: -1 }}>
        <Card>
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
        <Card>
          <Text></Text>
        </Card>
        <Card>
          <Text></Text>
        </Card>
        <Card>
          <Text></Text>
        </Card>
        <Card>
          <Text></Text>
        </Card>
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default TaskPage;

const styles = StyleSheet.create({
  main1: {
    backgroundColor: "#f6f9ff",
    zIndex: -1,
  },
  remark: {},
  submit: {
    height: 40,
    width: width - 300,
    backgroundColor: "#0073A9",
    borderRadius: 8,
    marginLeft: 280,
    justifyContent: "center",
    alignItems: "center",
  },
  ccard: {
    // height: responsiveScreenHeight(20),
    marginTop: responsiveHeight(0) + 20,
    marginLeft: responsiveWidth(0)+8,
    zIndex: -1,
    backgroundColor:"white",
    width: responsiveScreenWidth(95)
  },
  ttitle:{
    backgroundColor:"skyblue",
    fontSize:23,
    paddingBottom:13,
    paddingTop:10,
  },
  btnText: {
    fontSize: 16,
    color: "white",
  },
  page: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: Dimensions.get("screen").width / 2.6,
  },

  container: {
    position: "relative",
    display: "flex",
    height: Dimensions.get("screen").height + 430,
    width: Dimensions.get("screen").width,
  },

  card: {
    marginLeft: -10,
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  content: {
    paddingBottom: 10,
    fontSize: 17,
    
   
  },
  header: {
    width:370,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
   

  },
  content5: {
    paddingBottom: 10,
    fontSize:17
  },
  
  page1: {
    paddingBottom: 5,
    fontSize: 17,
  },
  content1: {
    paddingBottom: 10,

    fontSize: 17,
  },

  content2: {
    paddingTop: -20,
    fontSize: 17,
  },
  head: {
    fontSize: 30,
  },

  footer: {
    position: "relative",
    top: -465,
    paddingTop: height * -3,
  },
});




























