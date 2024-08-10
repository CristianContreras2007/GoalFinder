import { StyleSheet} from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SignUpProvider } from '@/components/SignUp'

const AuthLayout = () => {
  return (
    <SignUpProvider>
    <Stack>
        <Stack.Screen name="login" options={{title: "", headerShown: false}}/>
        <Stack.Screen name="signupfirst" options={{title: "", headerShown: false}}/>
        <Stack.Screen name="signupsecond" options={{title: "", headerShown: false}}/>
        <Stack.Screen name="signupthird" options={{title: "", headerShown: false}}/>
        <Stack.Screen name="survey" options={{title: "", headerShown: false}}/>
    </Stack>
    </SignUpProvider>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})