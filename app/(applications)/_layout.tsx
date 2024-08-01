import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ApplicationLayout = () => {
  return (
    <Stack>
        <Stack.Screen name = "streetsoccerlaapp" options = {{headerShown: false}}/>
    </Stack>
  )}

export default ApplicationLayout

const styles = StyleSheet.create({})