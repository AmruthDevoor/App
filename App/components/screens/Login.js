import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FormContainer from '../FormContainer';
import AppInput from '../AppInput';
import SubmitButton from '../SubmitButton';
import FormNavigator from '../FormNavigator';
import { useNavigation } from '@react-navigation/native';
import { navigateToForgetPassword, navigateToSignUp } from '../../utils/Helper';

const Login = () => {
    const navigation = useNavigation()
   const  onHomeScreen = () =>{
    navigation.navigate("HomeScreen")
   }
  return (
   <FormContainer>
     <AppInput placeholder="Email/Username" />
     <AppInput placeholder="Password"  />
     <SubmitButton title="Login" onPress={onHomeScreen}/>
     <FormNavigator onLeftLinkPress={navigateToSignUp(navigation)} leftLinkText="Sign up"
     onRightLinkPress={navigateToForgetPassword(navigation)} rightLinkText="Forgot Password?" />
   </FormContainer>
  );
};

const styles = StyleSheet.create({
container:{},
});

export default Login;