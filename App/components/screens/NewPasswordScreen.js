import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import FormContainer from "../FormContainer";
import AppInput from "../AppInput";
import SubmitButton from "../SubmitButton";
import FormNavigator from "../FormNavigator";
import { useNavigation } from "@react-navigation/native";
import { navigateToForgetPassword, navigateToLogin } from "../../utils/Helper";
import { user_reset } from "../api/user_reset";

const NewPasswordScreen = () => {
  const [mobileNumber,setMobileNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("123456");
  const navigation = useNavigation();
  const handleReg = () => {
    user_reset({
      mobileNumber: mobileNumber,
      newPassword: newPassword,
     otp:otp
    })
      .then((result) => {

        navigation.replace("LogIn");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <FormContainer style={styles.container}>
      <AppInput
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
      />
      <AppInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <AppInput
        placeholder="OTP"
        value={otp}
        onChangeText={(text) => setOtp(text)}
      />

      <SubmitButton title="Save Changes" onPress={handleReg} />
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default NewPasswordScreen;
