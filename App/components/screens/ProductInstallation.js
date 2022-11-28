



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
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";

import Header from "../AppHeader";

import Footer from "./Footer";
import { Card } from "react-native-paper";

import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import MyTabs from "./BottomTab";
const { width, height } = Dimensions.get("window");

const ProductInstallation = () => {
  const navigation = useNavigation();
  const onReq = () => {
    // AsyncStorage.setItem ("productId",JSON.stringify(onP));
    navigation.navigate("ProdInstReq");
  };

  const [techId, setTechId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(10);
  const [pageSize, setPageSize] = useState(5);
  const [ProductInstall, setProductInstall] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });

    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });

    getProductInstall();
  }, [accessToken,pageNumber,ProductInstall]);

  const getProductInstall = () => {
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/productlog/v1/getProductInstallationsByPagination/{pageNumber}/{pageSize}/{technicianId}?pageNumber=${pageNumber}&pageSize=${pageSize}&technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
  
      setTotalPages(result.data.totalPages);

      setProductInstall(result.data.content);
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
const imageUrl =
"https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/file/downloadFile/?filePath=";
  
const viewItem = ({item}) => {
  return (
      <View >
     <Card style={styles.card}>
      {/* <Card.Content >   
     <Text style={styles.header}>{item.productHandoverDto.productName}</Text>
     </Card.Content> */}
    
     {/* <Card.Content style={styles.remark}>   
     <Text style={styles.content5}>Serial No : {item.productHandoverDto.productSerialNo}</Text>
     </Card.Content> */}
     <Card.Content >   
     <Text style={styles.header}>{item.productName}</Text>
     </Card.Content>
     <Card.Content style={styles.remark}>   
     <Text style={styles.content5}>Serial No : {item.productSerialNo}</Text>
     </Card.Content>
     <Card.Content style={styles.remark}>   
     <Text style={styles.content5}>Quantity : {item.quantity}</Text>
     </Card.Content>
     <Card.Content >   
     <Text style={styles.content5}>Plant Name : {item.plantDto===null ? "No material name":item.plantDto.plantName}</Text>
     </Card.Content>
     <Card.Content style={styles.remark}>   
     <Text style={styles.content5}>Installation Date : {moment(item.installationDate).format("L")}</Text>
     </Card.Content>
     <Card.Content style={styles.remark}>   
     <Text style={styles.content5}>Remark :{"\n"} {item.remark}</Text>
     </Card.Content>
     <Card.Content style={styles.remark}>   
     <Text style={styles.content5}>Inserted Date : {moment(item.insertedDate).format("L")}</Text>
     </Card.Content>
     <View style={{flexDirection:"row", marginLeft:220,marginTop:-130,marginBottom:10}}>
                                   <Card.Content >
                                   <View>
                {/* <Image  /> */}
                {item.picPath === null ? (
                  <Image
                    style={{
                      width: 130,
                      height: 130,
                      borderWidth: 2,
                      borderColor: "black",
                    }}
                    source={require("../../assets/noImage.jpg")}
                  />
                ) : (
                  <Image
                    style={{
                      width: 130,
                      height: 130,
                      borderWidth: 2,
                      borderColor: "black",
                    }}
                    source={{uri:imageUrl+item.picPath}}
                    
                  />
                )}
              </View>
                 </Card.Content>
                </View>
     
     </Card>

      </View>
  )
}

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.main1}>
        <View style={{ zIndex: -1 }}>
          <Text style={styles.head}>Product Installation</Text>
          <Pressable onPress={onReq} style={styles.submit}>
            <Text style={styles.btnText}>Install</Text>
          </Pressable>

          {/* {ProductInstall.map((LeaveReq) => {
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
              data={ProductInstall}
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

export default ProductInstallation;

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
    top: -475,
    paddingTop: height * -3,
  },
});






























































