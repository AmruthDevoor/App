import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ViewComponent } from "react-native";
import Alert from "../components/screens/Alert";
import About from "../components/screens/About";
import SettingScreen from "../components/screens/SettingScreen";
import ForgetPassword from "../components/screens/ForgetPassword";
import HomeScreen from "../components/screens/HomeScreen";

import Login from "../components/screens/Login";
import Notifications from "../components/screens/Notifications";
import SignUp from "../components/screens/SignUp";
import SideBar from "../components/SideBar";
import ProfileScreen from "../components/screens/ProfileScreen";
import Collection from "../components/screens/Collection";
import Tasks from "../components/screens/Tasks";

import Stock from "../components/screens/Stock";
import ProductRequest from "../components/screens/ProductRequest";
import Attendance from "../components/screens/Attendance";
import Leave from "../components/screens/Leave";
import Material from "../components/screens/Material";
import newPasswordScreen from "../components/screens/NewPasswordScreen";
import NewPasswordScreen from "../components/screens/NewPasswordScreen";
import MaterialStock from "../components/screens/MaterialStock";
import ProductStock from "../components/screens/ProductStock";
import MaterialAssign from "../components/screens/MaterialAssign";
import MaterialReturn from "../components/screens/MaterialReturn";
import ProductReturn from "../components/screens/ProductReturn";
import ProductAssign from "../components/screens/ProductAssign";
import MaterialRequest from "../components/screens/MaterialRequest";
import MatReqAdd from "../components/screens/MatReqAdd";
import ProductReqAdd from "../components/screens/ProductReqAdd";
import ProductReq from "../components/screens/ProductReq";
import LeaveReqAdd from "../components/screens/LeaveReqAdd";
import PlantHealthTask from "../components/screens/PlantHealth";
import ProductInstallation from "../components/screens/ProductInstallation";
import ProdInstReq from "../components/screens/ProdInstReq";
import MaterialInstallation from "../components/screens/MaterialInstallation";
import MatInstReq from "../components/screens/MatInstReq";
import ProductUninstall from "../components/screens/ProductUninstall";
import ProdUninstReq from "../components/screens/ProdUninstReq";
import MaterialUninstall from "../components/screens/MaterialUninstall";
import MatUninstReq from "../components/screens/MatUninstReq";
import TaskPage from "../components/screens/TaskPage";
import TaskForm from "../components/screens/TaskForm";
import TaskSideClick from "../components/screens/TaskSideClick";
import PlantHealthForm from "../components/screens/PlantHealthForm";
import PlantHealthSide from "../components/screens/PlantHealthSide";
import PlantHealthClick from "../components/screens/PlanthHealthClick";
import CollectionForm from "../components/screens/CollectionForm";
import CollectionSide from "../components/screens/CollectionSide";
import CollectionClick from "../components/screens/CollectionClick";
import Alerts from "../components/screens/Alert";
const sampleTabNavigation = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <sampleTabNavigation.Navigator screenOptions={{ headerShown: false }}>
      <sampleTabNavigation.Screen name="Login" component={Login} />
      <sampleTabNavigation.Screen name="SignUp" component={SignUp} />
      <sampleTabNavigation.Screen
        name="ForgetPassword"
        component={ForgetPassword}
      />
      <sampleTabNavigation.Screen name="HomeScreen" component={HomeScreen} />
      <sampleTabNavigation.Screen name="About" component={About} />
      <sampleTabNavigation.Screen
        name="Notifications"
        component={Notifications}
      />
      <sampleTabNavigation.Screen
        name="SettingScreen"
        component={SettingScreen}
      />
      <sampleTabNavigation.Screen name="Tasks" component={Tasks} />
      <sampleTabNavigation.Screen name="Collection" component={Collection} />
      <sampleTabNavigation.Screen name="Stock" component={Stock} />
      <sampleTabNavigation.Screen name="Alerts" component={Alerts} />
      <sampleTabNavigation.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <sampleTabNavigation.Screen
        name="ProductRequest"
        component={ProductRequest}
      />
      <sampleTabNavigation.Screen name="Material" component={Material} />
      <sampleTabNavigation.Screen
        name="MaterialStock"
        component={MaterialStock}
      />
      <sampleTabNavigation.Screen
        name="ProductStock"
        component={ProductStock}
      />
      <sampleTabNavigation.Screen
        name="MaterialAssign"
        component={MaterialAssign}
      />
      <sampleTabNavigation.Screen name="Attendance" component={Attendance} />
      <sampleTabNavigation.Screen
        name="ProductAssign"
        component={ProductAssign}
      />
      <sampleTabNavigation.Screen name="Leave" component={Leave} />
      <sampleTabNavigation.Screen
        name="MaterialReturn"
        component={MaterialReturn}
      />
      <sampleTabNavigation.Screen
        name="MaterialRequest"
        component={MaterialRequest}
      />
      <sampleTabNavigation.Screen
        name="ProductReturn"
        component={ProductReturn}
      />
      <sampleTabNavigation.Screen
        name="newPasswordScreen"
        component={NewPasswordScreen}
      />
      <sampleTabNavigation.Screen name="MatReqAdd" component={MatReqAdd} />

      <sampleTabNavigation.Screen name="ProdReqAdd" component={ProductReqAdd} />
      <sampleTabNavigation.Screen name="ProdReq" component={ProductReq} />
      <sampleTabNavigation.Screen
        name="PlantTask"
        component={PlantHealthTask}
      />
      <sampleTabNavigation.Screen name="ProdInstReq" component={ProdInstReq} />
      <sampleTabNavigation.Screen
        name="ProductInstallation"
        component={ProductInstallation}
      />
      <sampleTabNavigation.Screen name="LeaveReqAdd" component={LeaveReqAdd} />
      <sampleTabNavigation.Screen
        name="MaterialInstallation"
        component={MaterialInstallation}
      />
      <sampleTabNavigation.Screen name="MatInstReq" component={MatInstReq} />
      <sampleTabNavigation.Screen
        name="ProductUninstall"
        component={ProductUninstall}
      />
      <sampleTabNavigation.Screen
        name="ProdUninstReq"
        component={ProdUninstReq}
      />
      <sampleTabNavigation.Screen
        name="MaterialUninstall"
        component={MaterialUninstall}
      />
      <sampleTabNavigation.Screen
        name="MatUninstReq"
        component={MatUninstReq}
      />
      <sampleTabNavigation.Screen name="taskPage" component={TaskPage} />
      <sampleTabNavigation.Screen name="PlantHealthForm" component={PlantHealthForm} />
      <sampleTabNavigation.Screen name="taskForm" component={TaskForm} />
      <sampleTabNavigation.Screen name="taskSide" component={TaskSideClick} />
      <sampleTabNavigation.Screen name="PlantHealthSide" component={PlantHealthSide} />
      <sampleTabNavigation.Screen name="PlantHealthClick" component={PlantHealthClick} />
      <sampleTabNavigation.Screen name="collectionForm" component={CollectionForm} />
      <sampleTabNavigation.Screen name="collectionSide" component={CollectionSide} />
      <sampleTabNavigation.Screen name="collectionClick" component={CollectionClick} />
    </sampleTabNavigation.Navigator>
  );
};

export default AuthNavigator;
