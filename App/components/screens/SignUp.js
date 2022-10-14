import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { navigateToForgetPassword, navigateToLogin, navigateToSignUp } from "../../utils/Helper";

import { user_Registration } from "../api/user_api1";
import AppInput from "../AppInput";
import { Eye, EyeActive } from "../assets";
import FormContainer from "../FormContainer";
import FormNavigator from "../FormNavigator";

const SignUp = ({ navigation }) => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);

  const [mobileNumber, setMobileNumber] = useState("");
  const [mailId, setMailId] = useState("");
  const [otp, setotp] = useState("");
  const [checkValiduserName, setCheckValiduserName] = useState(false);

  const handleCheckuserName = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setuserName(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValiduserName(false);
    } else {
      setCheckValiduserName(true);
    }
  };

  const checkPasswordValidity = (value) => {
    // const isNonWhiteSpace = /^\S*$/;
    // if (!isNonWhiteSpace.test(value)) {
    //   return 'Password must not contain Whitespaces.';
    // }

    // const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    // if (!isContainsUppercase.test(value)) {
    //   return 'Password must have at least one Uppercase Character.';
    // }

    // const isContainsLowercase = /^(?=.*[a-z]).*$/;
    // if (!isContainsLowercase.test(value)) {
    //   return 'Password must have at least one Lowercase Character.';
    // }

    // const isContainsNumber = /^(?=.*[0-9]).*$/;
    // if (!isContainsNumber.test(value)) {
    //   return 'Password must contain at least one Digit.';
    // }

    // const isValidLength = /^.{8,16}$/;
    // if (!isValidLength.test(value)) {
    //   return 'Password must be 8-16 Characters Long.';
    // }

    // const isContainsSymbol =
    //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    // if (!isContainsSymbol.test(value)) {
    //   return 'Password must contain at least one Special Symbol.';
    // }

    return null;
  };

  const handleReg = () => {
    const checkPassowrd = checkPasswordValidity(password);
    if (!checkPassowrd) {
      user_Registration({
        userName: userName,
        password: password,

        otp: otp,
        mailId: mailId,
        mobileNumber: mobileNumber,
      })
        .then((result) => {
        
          if (result.status == 200) {
            AsyncStorage.setItem("AccessToken", result.data.accessToken);
            navigation.replace("Login");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert(checkPassowrd);
    }
  };

  return (
    <FormContainer>
      
        
          <AppInput
            placeholder="userName"
            value={userName}
            onChangeText={(text) => handleCheckuserName(text)}
          />
       
       
        <View>
          <AppInput
            placeholder="Password"
            value={password}
            secureTextEntry={seePassword}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.wrapperIcon}
            onPress={() => setSeePassword(!seePassword)}
          >
            <Image source={seePassword ? Eye : EyeActive} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View>
          <AppInput
            placeholder="mailId"
            value={mailId}
            onChangeText={(text) => setMailId(text)}
          />
        </View>
        <View>
          <AppInput
            placeholder="mobile number"
            value={mobileNumber}
            onChangeText={(text) => setMobileNumber(text)}
          />
        </View>
        <View>
          <AppInput
            placeholder="otp"
            value={otp}
            onChangeText={(text) => setotp(text)}
          />
        </View>

        {userName == "" || password == "" || checkValiduserName == true ? (
          <TouchableOpacity
            disabled
            style={styles.buttonDisable}
            onPress={handleReg}
          >
            <Text style={styles.text}>SignUp</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleReg}>
            <Text style={styles.text}>SignUp</Text>
          </TouchableOpacity>
        )}
       <FormNavigator
          onLeftLinkPress={navigateToLogin(navigation)}
          leftLinkText="Login"
      
        />
    </FormContainer>
  );
};
export default SignUp;
const { height,width } = Dimensions.get("window");
const styles = StyleSheet.create({

  wrapperIcon: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
  icon: {
    width: width*0.06,
    height: height*0.023,
  },
  button: {
    padding: 10,
    height: height*0.06,
    width: width*0.91,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0073A9",
    borderRadius: 5,
    marginTop: 25,
  },
  buttonDisable: {
    padding: 10,
    height: height*0.06,
    width: width*0.91,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0073A9",
    borderRadius: 5,
    marginTop: 25,
  },
  text: {
    color: "white",
    fontWeight: "700",
  },
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
  },
});
