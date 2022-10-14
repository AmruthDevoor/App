import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import FormContainer from "../FormContainer";
import AppInput from "../AppInput";
import SubmitButton from "../SubmitButton";
import FormNavigator from "../FormNavigator";
import { useNavigation } from "@react-navigation/native";
import { navigateToLogin, navigateToSignUp } from "../../utils/Helper";
import { user_generateotp } from "../api/User_generateotp";

const ForgetPassword = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("123456");
  const navigation = useNavigation();
  const sendotp = () => {
    user_generateotp({
      mobileNumber: mobileNumber,
      otp: otp,
    })
      .then((result) => {
     
        navigation.replace("newPasswordScreen");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <FormContainer>
      <AppInput
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
      />
      <SubmitButton title="Send OTP" onPress={sendotp} />
      <FormNavigator
        onLeftLinkPress={navigateToLogin(navigation)}
        leftLinkText="LogIn"
        onRightLinkPress={navigateToSignUp(navigation)}
        rightLinkText="Sign Up"
      />
    </FormContainer>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default ForgetPassword;
