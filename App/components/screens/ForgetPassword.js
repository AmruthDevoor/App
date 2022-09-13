import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FormContainer from '../FormContainer'
import AppInput from '../AppInput'
import SubmitButton from '../SubmitButton'
import FormNavigator from '../FormNavigator'
import { useNavigation } from '@react-navigation/native';
import { navigateToLogin, navigateToSignUp } from '../../utils/Helper'

const ForgetPassword = () => {
    const navigation = useNavigation()
  return (
    <FormContainer>
        <AppInput placeholder="example@email.com" />
        <SubmitButton title='Send Link' />
        <FormNavigator onLeftLinkPress={navigateToLogin(navigation)} leftLinkText="LogIn"
    onRightLinkPress={navigateToSignUp(navigation)} rightLinkText="Sign Up" />
    </FormContainer>
  )
}
const styles= StyleSheet.create({
    container:{}
})
export default ForgetPassword