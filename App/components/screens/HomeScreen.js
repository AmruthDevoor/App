import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../AppHeader";
import CreateCard from "../Cards/ProductCard";
import CreateCard1 from "../Cards/MaterialCard";
import CreateCard2 from "../Cards/RequestCard";
import CreateCard3 from "../Cards/LeaveCard";
import Footer from "./Footer";
import { Card } from "react-native-paper";

import CreateCard4 from "../Cards/CollectionCard";
import CreateCard5 from "../Cards/TaskCard";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import PlantHealthCard from "../Cards/PlantHealthCard";
import BaseUrl from "../api/BaseUrl";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [userName, setuserName] = useState("");
  const[update,setUpdate] = useState(false)
  const [noTotalService, setNoTotalService] = useState("");
  const [noTotalCollection,setNoTotalCollection] = useState("");
  const [noTotlaPlantHealth,setNoTotalPlantHealth] = useState("");
  const [noTasks, setNoTasks] = useState("");
  const [noCollection, setNoCollection] = useState("");
  const [noPlantHealth,setNoPlantHealth] = useState("")
  const [techId, setTechId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const navigation = useNavigation();
  const onAbout = () => {
    navigation.navigate("About");
  };
  const onSettingScreen = () => {
    navigation.navigate("SettingScreen");
  };
  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });
    AsyncStorage.getItem("user").then((value) => {
      setuserName(JSON.parse(value));
    });
    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });
    setTimeout(() => {
    setUpdate(!update)
   }, 5000);

    totalCount();
    noOfTasksAndCollection();
  }, [accessToken,update]);
  const noOfTasksAndCollection = () => {
    axios({
      method: "GET", 
      url: `${BaseUrl}/dashboard/v1/technicianDashboardPendingCount/{technicianId}?technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setNoCollection(result.data.pendingCollectionCount);
      setNoTasks(result.data.pendingTaskCount);
      setNoPlantHealth(result.data.pendingPlantHealthCount);
   

    });
  };
  

  const totalCount = () => {
    axios({
      method: "GET",
      url: `${BaseUrl}/dashboard/v1/technicianDashboardCount/{technicianId}?technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setNoTotalService(result.data.totalTaskCount);
      setNoTotalCollection(result.data.totalCollectionTaskCount);
      setNoTotalPlantHealth(result.data.totalPlantHealthTaskCount);
   

    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.main1}>
        <View style={{ zIndex: -1 }}>
          {/* <Button style={styles.button} title="about" onPress={onAbout} />
    <Button style={styles.button} title="SettingScreen" onPress={onSettingScreen} /> */}
          <View style={styles.card}>
            <CreateCard no={noTotalService} />
            <CreateCard1  no={noTotalCollection}/>
          </View>

          <View style={styles.card1}>
            <CreateCard2 no={noTotlaPlantHealth} />
            <CreateCard3 />
          </View>

          <View>
            <CreateCard4  no={noCollection} />
            <CreateCard5 no={noTasks} />
            <Text></Text>
            <Text></Text>
            <PlantHealthCard no={noPlantHealth} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main1: {
    backgroundColor: "#f6f9ff",
    zIndex: -1,
  },

  container: {
    position: "relative",
    display: "flex",
    height: Dimensions.get("screen").height + 430,
    width: Dimensions.get("screen").width,
  },
  button: {
    display: "flex",
    position: "absolute",
    backgroundColor: "black",
    paddingRight: 20,
    width: width,
  },
  card: {
    flexDirection: "row",
    marginLeft: -10,
  },
  card1: {
    flexDirection: "row",
    marginLeft: -10,
  },
  footer: {
    position: "relative",
    top: -475,
    paddingTop: height * -3,
  },
});
