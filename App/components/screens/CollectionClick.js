import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Platform,
  Pressable,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../AppHeader";
import axios from "axios";
import { Card } from "react-native-paper";
import moment from "moment";

const CollectionClick = () => {
  const [accessToken, setAccessToken] = useState("");

  const [collectiontaskId, setCollectiontaskId] = useState();
  const [techId, setTechId] = useState();

  const [serviceDate, setServiceDate] = useState("");
  const [remark, setRemark] = useState("");
  const [previousVolumeReading, setPreviousVolumeReading] = useState();
  const [currentVolumeReading, setCurrentVolumeReading] = useState();
  const [previousRechargeReading, setPreviousRechargeReading] = useState();
  const [currentRechargeReading, setCurrentRechargeReading] = useState();
  const [previousCoinReading, setPreviousCoinReading] = useState();
  const [currentCoinReading, setCurrentCoinReading] = useState();
  const [previousBalance, setPreviousBalance] = useState();
  const [newBalance, setNewBalance] = useState();
  const [waterManSalary, setWaterManSalary] = useState();
  const [cashInHand, setCashInHand] = useState();
  const [photo, setPhoto] = useState("");
  const [status, setStatus] = useState("");
  const [filePath, setFilePath] = useState("");
  const [insertedDate, setInsertedDate] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });
    AsyncStorage.getItem("collectiontaskId").then((value) => {
      setCollectiontaskId(value);
    });
    getCollectiontaskId();
    getServicePlantTask();
  }, [accessToken, techId, collectiontaskId]);

  const getCollectiontaskId = () => {
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/planthealthtask/v1/getAllPlantHealthTasksByPagination/{pageNumber}/{pageSize}/{technicianId}?pageNumber=0&pageSize=5&technicianId=${techId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      console.warn(collectiontaskId);
    });
  };
  const getServicePlantTask = () => {
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/collectiontask/v1/getTechnicianCollectionTaskByCollectiontaskId/{collectiontaskId}?collectiontaskId=${collectiontaskId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      console.warn(result.data);
      var taskCollectionData = result.data;

      setServiceDate(moment(taskCollectionData.serviceDate).format("L"));
      setPreviousVolumeReading(taskCollectionData.previousVolumeReading);
      setCurrentVolumeReading(taskCollectionData.currentVolumeReading);
      setPreviousRechargeReading(taskCollectionData.previousRechargeReading);
      setCurrentRechargeReading(taskCollectionData.currentRechargeReading);
      setPreviousCoinReading(taskCollectionData.previousCoinReading);
      setCurrentCoinReading(taskCollectionData.currentCoinReading);

      setPreviousBalance(taskCollectionData.previousBalance);
      setNewBalance(taskCollectionData.newBalance);
      setWaterManSalary(taskCollectionData.waterManSalary);
      setCashInHand(taskCollectionData.cashInHand);
      setPhoto(taskCollectionData.photo);
      setStatus(taskCollectionData.status);
      setRemark(taskCollectionData.remark);
      setInsertedDate(moment(taskCollectionData.insertedDate).format("L"));
      setFilePath(taskCollectionData.readingPhotoPath);
    });
  };

  const imageUrl =
    "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/file/downloadFile/?filePath=";
  console.warn(filePath);
  return (
    <View>
      <Header />
      <ScrollView style={{ zIndex: -1 }}>
        <Card style={{ padding: 10, margin: 10 }}>
          <Text style={{ fontSize: 30, marginBottom: 10, zIndex: -1 }}>
            Collection Tasks
          </Text>
          <View>
            <Text style={Styles.text}>Date: {serviceDate}</Text>
            <Text style={Styles.text}>
              previousVolumeReading: {previousVolumeReading}
            </Text>
            <Text style={Styles.text}>
              currentVolumeReading: {currentVolumeReading}
            </Text>
            <Text style={Styles.text}>
              previousRechargeReading: {previousRechargeReading}
            </Text>
            <Text style={Styles.text}>
              currentRechargeReading: {currentRechargeReading}
            </Text>
            <Text style={Styles.text}>
              previousCoinReading: {previousCoinReading}
            </Text>
            <Text style={Styles.text}>
              currentCoinReading: {currentCoinReading}
            </Text>
            <Text style={Styles.text}>previousBalance: {previousBalance}</Text>
            <Text style={Styles.text}>newBalance: {newBalance}</Text>
            <Text style={Styles.text}>waterManSalary: {waterManSalary}</Text>
            <Text style={Styles.text}>cashInHand: {cashInHand}</Text>
            <Text style={Styles.text}>Status: {status}</Text>
            <Text style={Styles.text}>Remark: {remark}</Text>

            <View>
              <Text style={Styles.text}>Reading Image : </Text>
              <View>
                {/* <Image  /> */}
                {filePath === null ? (
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
                    source={{uri:imageUrl+filePath}}
                    
                  />
                )}
              </View>
            </View>
            <Text></Text>

            <Text style={Styles.text}>InsertedDate: {insertedDate}</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default CollectionClick;
const { width } = Dimensions.get("window");
const Styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 10,
  },
});
