import {
    View,
    StyleSheet,
    Text,
    Button,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Pressable,
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
  
  const ProductReq= () => {
    const navigation = useNavigation();
      const onAdd = () => {
          navigation.navigate("ProdReqAdd");
        };
    const [techId, setTechId] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [ProductRequest, setProductRequest] = useState([]);
  
    useEffect(() => {
      AsyncStorage.getItem("id").then((value) => {
     
        setTechId(value);
      });
  
      AsyncStorage.getItem("AccessToken").then((value) => {
  
        setAccessToken(JSON.parse(value));
      });
  
      getProductRequest();
    }, [accessToken]);
  
    const getProductRequest = () => {
      axios({
        method: "GET",
        url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/productrequest/v1/getRequestedProductsByPagination/{pageNumber}/{pageSize}/{technicianId}?pageNumber=${pageNumber}&pageSize=${pageSize}&technicianId=${techId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }).then((result) => {
        console.warn(result.data.content);
      
        setProductRequest(result.data.content);
      });
    };
  
    return (
      <View style={styles.container}>
        
        <Header />
        <ScrollView style={styles.main1}>
          <View style={{ zIndex: -1 }}>
            <Text style={styles.head}>Requested Product</Text>
                  <Pressable onPress={onAdd} style={styles.submit}>
      <Text style={styles.btnText}>Request</Text>
    </Pressable>
            {ProductRequest.map((proReq) => {
              return (
                <ScrollView>
                <Card style={styles.card}>
                  <Card.Content style={{ flexDirection: "row" }}>
                    <Text style={styles.content}>
                      {proReq.productDto===null ? "No Name":proReq.productDto.productName}
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
                      Quantity: {proReq.quantity}
                    </Text>
                  </Card.Content>
                  <Card.Content>
                    <Text style={styles.content5}>
                      Remark:{"\n"}
                      {proReq.remark}
                    </Text>
                   
                  </Card.Content>
                </Card>
                
                </ScrollView>
                
              );
            })}
           <Card>
                    <Text></Text>
                </Card>
                <Card>
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
  
  export default ProductReq;
  
  const styles = StyleSheet.create({
    main1: {
      backgroundColor: "#f6f9ff",
      zIndex: -1,
    },
    submit: {
      height: 40,
      width: width - 300,
      backgroundColor: "#0073A9",
      borderRadius: 8,
      marginLeft:280,
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
    content5:{
paddingBottom:10
    },
  
    card: {
      marginLeft: -10,
      borderWidth:1,
      padding:10,
      margin:5,
    },
    content: {
      paddingBottom: 10,
      fontSize: 20,
      fontWeight: "bold"
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
  