import {
    View,
    StyleSheet,
    Text,
    Button,
    ScrollView,
    Dimensions,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import moment from "moment";
  
  import Header from "../AppHeader";
  
  import Footer from "./Footer";
  import { Card } from "react-native-paper";
  
  import axios from "axios";
  
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { MaterialIcons } from "@expo/vector-icons";
  // import MyTabs from "./BottomTab";
  const { width, height } = Dimensions.get("window");
  
  const ProductReturn = () => {
    const [techId, setTechId] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [productReturn, setProductReturn] = useState([]);
  
    useEffect(() => {
      AsyncStorage.getItem("id").then((value) => {
     
        setTechId(value);
      });
  
      AsyncStorage.getItem("AccessToken").then((value) => {
  
        setAccessToken(JSON.parse(value));
      });
  
      getProductReturn();
    }, [accessToken]);
  
    const getProductReturn = () => {
      axios({
        method: "GET",
        url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/productreturn/v1/getReturnedProductsByPagination/{pageNumber}/{pageSize}/{technicianId}?pageNumber=${pageNumber}&pageSize=${pageSize}&technicianId=${techId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {
      
        setProductReturn(result.data.content);
      });
    };
  
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.main1}>
          <View style={{ zIndex: -1 }}>
            <Text style={styles.head}>Returned Product</Text>
  
            {productReturn.map((proRet) => {
              return (
                <Card style={styles.card}>
                  <Card.Content style={{ flexDirection: "row" }}>
                    <Text style={styles.content5}>
                      {proRet.productName}{" "}
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.content2}>
                        {" "}
                        <MaterialIcons name="info" size={20} color="#0073A9" />
                      </Text>
                    </TouchableOpacity>
                  </Card.Content>
                  <Card.Content >
                   
                    <Text style={styles.content1}>
                      Serial No: {proRet.serialNumber}
                    </Text>
                    <Text style={styles.content1}>
                      Quantity: {proRet.receivedQuantity}
                    </Text>
                  </Card.Content>
                  <Card.Content>
                    <Text style={styles.content}>
                      Received by: {proRet.receivedBy}
                    </Text>
                    <Text style={styles.content}>
                      Date: {moment(proRet.insertedDate).format("L")}
                    </Text>
                  </Card.Content>
                </Card>
              );
            })}
            <Card>
              <Card.Content style={styles.page}>
                <TouchableOpacity>
                  <Text>
                    {" "}
                    <MaterialIcons
                      name="arrow-back-ios"
                      size={20}
                      color="#0073A9"
                    />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.page1}>{pageNumber} of 10</Text>
                <TouchableOpacity>
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
              <Text></Text>
           
            </Card>
          </View>
        </ScrollView>
  
        <View style={styles.footer}>
          <Footer />
        </View>
      </View>
    );
  };
  
  export default ProductReturn;
  
  const styles = StyleSheet.create({
    main1: {
      backgroundColor: "#f6f9ff",
      zIndex: -1,
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
      borderWidth:1,
      padding:10,
      margin:5,
    },
    content5: {
      paddingBottom: 10,
      fontSize: 20,
      fontWeight:"bold"
    },
    content: {
      paddingBottom: 10,
      fontSize: 15,
    },
    page1: {
      paddingBottom: 5,
      fontSize: 15,
    },
    content1: {
      paddingBottom: 10,
  
      fontSize: 15,
      
    },
    content2: {
      paddingTop: -20,
      fontSize: 15,
      
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
  