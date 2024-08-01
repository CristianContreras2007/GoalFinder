import { StyleSheet} from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="login" options={{title: "", headerShown: false}}/>
        <Stack.Screen name="signupfirst" options={{title: "", headerShown: false}}/>
        <Stack.Screen name="signupsecond" options={{title: "", headerShown: false}}/>
        <Stack.Screen name="signupthird" options={{title: "", headerShown: false}}/>
        <Stack.Screen name="survey" options={{title: "", headerShown: false}}/>
    </Stack>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})