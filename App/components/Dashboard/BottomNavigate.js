// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import React, { useEffect, useState } from "react";
// import HomeScreen from "../screens/HomeScreen";
// import About from "../screens/About";
// import Login from '../screens/Login'
// import SignUp from '../screens/SignUp'
// import ForgetPassword from '../screens/ForgetPassword'
// import Notifications from "../screens/Notifications";
// import SettingScreen from "../screens/SettingScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import { AsyncStorage } from "react-native";
// import { Button } from "react-native-paper";

 
// const sampleTabNavigation = createBottomTabNavigator();
// const BottomNavigate = () => {
//     const [show,setShow] = useState(false)
//     useEffect(()=>{
//         var name= AsyncStorage.getItem("user");

//        })


//   return (
    
//       <sampleTabNavigation.Navigator
//         screenOptions={({ route }) => ({
//             headerShown:false,
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === "HomeScreen") {
//               iconName = "md-home-sharp";
            
//             } else if (route.name === "About") {
//               iconName = "md-reader-outline";
//             }
            
           

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: "red",
//           inactiveTintColor: "gray",
//         }}
//       >

//        {show ? <> <sampleTabNavigation.Screen name="SignUp" component={SignUp} />
//         <sampleTabNavigation.Screen name="ForgetPassword" component={ForgetPassword} />
//         </>:<>
//         <sampleTabNavigation.Screen name="HomeScreen" component={HomeScreen} />
//         <sampleTabNavigation.Screen name="About" component={About} />
//         <sampleTabNavigation.Screen name="Notifications" component={Notifications} />
//         <sampleTabNavigation.Screen name="SettingScreen" component={SettingScreen}  />
//         <sampleTabNavigation.Screen name="ProfileScreen" component={ProfileScreen} />
//         <sampleTabNavigation.Screen name="Login" component={Login}  />

     
// </>}
        
        
        
             
     
       
 
                

      
//       </sampleTabNavigation.Navigator>
    
//   );
// };

// export default BottomNavigate;
