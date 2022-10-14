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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SelectList from "react-native-dropdown-select-list";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../AppHeader";
import axios from "axios";
import { useRef } from "react";

const MatReqAdd = () => {
  const [selected, setSelected] = React.useState("");
  const [date, setDate] = useState(new Date());
  const [fromMode, setFromMode] = useState("date");
  const [toMode, setToMode] = useState("date");
  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [isFocus, setIsFocus] = useState(false);

  const [accessToken, setAccessToken] = useState("");

  const [Leave, setLeave] = useState([]);

  const [techId, setTechId] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [header, setHeader] = useState("");
  const [leaveDays, setLeaveDays] = useState("");
  const [toDate, setToDate] = useState("");
  const onFromChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setFromShow(Platform.OS === "android");
    setFromShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      
      tempDate.getFullYear()
       +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();
    setFromDate(fDate);
  };
  const showFromMode = (currentMode) => {
    setFromShow(true);
    setFromMode(currentMode);
  };

  const onToChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setToShow(Platform.OS === "android");
    setToShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let tDate =
    tempDate.getFullYear()
    +
   "-" +
   (tempDate.getMonth() + 1) +
   "-" +
   tempDate.getDate();
    setToDate(tDate);
  };
  const showToMode = (currentMode) => {
    setToShow(true);
    setToMode(currentMode);
  };

  useEffect(() => {
    AsyncStorage.getItem("AccessToken").then((value) => {
      setAccessToken(JSON.parse(value));
    });
    AsyncStorage.getItem("id").then((value) => {
      setTechId(value);
    });
    getLeaveAdd();
  }, [accessToken]);

  const getLeaveAdd = () => {
    axios({
      method: "GET",
      url: `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/leave/v1/requestLeave`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((result) => {
      setLeave(result.data);
    });
  };

  const requestLeave = (e) => {
    console.warn(fromDate);
    e.preventDefault();

    let data = {
        "description": description,
       
        "fromDate": fromDate,
        "header": header,
      
        "leaveDays": Number(leaveDays),
        
      
        "technicianDto": {
       
          "technicianId": techId
        },
       
        "toDate": toDate
      }
    console.warn(data);
    axios({
      method: "POST",
      url: "https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/leave/v1/requestLeave",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      data: data,
    }).then((res) => {
      console.warn(res);
    });
  };
  return (
    <View>
      <Header />
      <Text style={{ fontSize: 35, marginBottom: 20, zIndex: -1 }}>
        Request a Leave
      </Text>
      <View style={Styles.container}>
        <SafeAreaView>
        <TextInput
            placeholder="Header"
            value={header}
            onChangeText={(text) => {
              setHeader(text);
            }}
            style={Styles.inp}
          />
          <Text></Text>
          <View>
            <Text style={{  fontSize: 15 }}>
              From Date: {fromDate}
            </Text>
            <View>
              <Button title="From Date" onPress={() => showFromMode("date")} />
            </View>
            {fromShow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={fromMode}
                is24Hour={true}
                display="default"
                onChange={onFromChange}
              />
            )}
          </View>
          <Text></Text>
          <View>
            <Text style={{fontSize: 15}}>
              To Date: {toDate}
            </Text>
            <View>
              <Button title="To Date" onPress={() => showToMode("date")} />
            </View>
            {toShow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={toMode}
                is24Hour={true}
                display="default"
                onChange={onToChange}
              />
            )}
          </View>
          

          
          
          <TextInput
            placeholder="No of Leave Days"
            value={leaveDays}
            onChangeText={(text) => {
              setLeaveDays(text);
            }}
            style={Styles.inp}
          />
          <TextInput
            placeholder="description"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
            style={Styles.inp2}
          />
        </SafeAreaView>
        <TouchableOpacity>
          <Pressable
            onPress={(e) => {
              requestLeave(e);
            }}
            style={Styles.submit}
          >
            <Text style={Styles.btnText}>Submit</Text>
          </Pressable>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatReqAdd;
const { width } = Dimensions.get("window");
const Styles = StyleSheet.create({
  submit: {
    height: 50,
    width: width - 40,
    backgroundColor: "#0073A9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    fontSize: 16,
    color: "white",
  },
  container: {
    backgroundColor: "white",
    padding: 17,
    zIndex: -1,
  },
  inp: {
    height: 50,
    borderWidth: 0.19,
    borderRadius: 3,
    marginTop: 20,
    paddingLeft: 10,
  },
  inp2: {
    height: 100,
    borderWidth: 0.19,
    paddingBottom: 55,
    borderRadius: 3,
    marginTop: 20,
    paddingLeft: 10,
  },
  inp1: {
    height: 100,
    borderWidth: 0.19,
    borderRadius: 3,
    marginTop: 20,
    paddingLeft: 10,
    paddingBottom: 50,
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 7,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
