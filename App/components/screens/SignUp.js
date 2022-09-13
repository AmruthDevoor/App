import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FormContainer from "../FormContainer";
import AppInput from "../AppInput";
import SubmitButton from "../SubmitButton";
import FormNavigator from "../FormNavigator";
import { useNavigation } from "@react-navigation/native";
import { navigateToForgetPassword, navigateToLogin } from "../../utils/Helper";

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <FormContainer style={styles.container}>
        
      <AppInput placeholder="UserName" />
      <AppInput placeholder="Email" />
      <AppInput placeholder="Password" />
      <AppInput placeholder="MobileNumber" />
      <AppInput placeholder="Otp" />
      <SubmitButton title="SignUP" />
      <FormNavigator
        onLeftLinkPress={navigateToLogin(navigation)}
        leftLinkText="Login"
        onRightLinkPress={navigateToForgetPassword(navigation)}
        rightLinkText="Forget Password?"
      />
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SignUp;
