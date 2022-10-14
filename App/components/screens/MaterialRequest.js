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

const MaterialRequest = () => {
  const navigation = useNavigation();
    const onAdd = () => {
        navigation.navigate("MatReqAdd");
      };
  const [techId, setTechId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [MaterialRequest, setMaterialRequest] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
   
      setTechId(value);
    });

    AsyncStorage.getItem("AccessToken").then((value) => {

      setAccessToken(JSON.parse(value));
    });

    getMaterialRequest();
  }, [accessToken]);

  const getMaterialRequest = () => {
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/materialrequest/v1/getRequestedMaterialsByPagination/{pageNumber}/{pageSize}/{technicianId}?pageNumber=${pageNumber}&pageSize=${pageSize}&technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      console.warn(result.data.content);
    
      setMaterialRequest(result.data.content);
    });
  };

  return (
    <View style={styles.container}>
      
      <Header />
      <ScrollView style={styles.main1}>
        <View style={{ zIndex: -1 }}>
          <Text style={styles.head}>Requested Material</Text>
          <Pressable onPress={onAdd} style={styles.submit}>
      <Text style={styles.btnText}>Request</Text>
    </Pressable>
          
          {MaterialRequest.map((matReq) => {
            return (
              <ScrollView>
              <Card style={styles.card}>
                <Card.Content style={{ flexDirection: "row" }}>
                  <Text style={styles.content}>
                    {matReq.materialDto===null ? "No NAme":matReq.materialDto.materialName}
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
                    Quantity: {matReq.quantity}
                  </Text>
                </Card.Content>
                <Card.Content style={styles.remark} >
                  <Text style={styles.content5}>
                    Remark :{"\n"}
                     <Text>{matReq.remark}</Text>
                  </Text>
                 
                </Card.Content>
              </Card>
              </ScrollView>
            );
          })}
         
        </View>
      </ScrollView>
     <View style={{zIndex:-1}}>
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

export default MaterialRequest;

const styles = StyleSheet.create({
  main1: {
    backgroundColor: "#f6f9ff",
    zIndex: -1,

  },
  remark:{

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
  content5: {
    paddingBottom: 10,
   
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
