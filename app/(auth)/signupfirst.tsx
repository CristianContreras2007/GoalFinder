import React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router'

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.content}>
        <Text style = {styles.firstTitle}>First, Tell Us</Text>
        <Text style = {styles.secondTitle}>About You</Text>
        <Text style = {styles.firstName}> First Name</Text>
        <TextInput style = {styles.firstNameInput} placeholder='Type Here'></TextInput>
        <Text style = {styles.lastName}>Last Name</Text>
        <TextInput style = {styles.lastNameInput} placeholder='Type Here'></TextInput>
        <Text style = {styles.age}>Age</Text>
        <TextInput style = {styles.ageInput} placeholder='Type Here'></TextInput>
        <Pressable style={styles.continue}
        onPress = {() => router.replace('/signupsecond')}>
        <Text style={styles.next}>Next</Text>
        </Pressable>
        <Pressable
        onPress = {() => router.replace('/')}>
            <Text style = {styles.goBack}>Back to Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  content: {
    padding: 16, 
  },

  firstTitle: {
    width: 344,
    height: 50,
    fontSize: 40,
    fontWeight: '600',
    marginVertical: 50,
    marginBottom: 0,
  },

  secondTitle: {
    width: 344,
    height: 50,
    fontSize: 40,
    fontWeight: '600',
    marginBottom: 60,
  },

  firstName: {
    fontSize: 16,
    marginBottom: 8,
  },

  firstNameInput: {
    height: 40,
    borderRadius: 8,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    paddingLeft: 8,
    fontSize: 16,
    marginBottom: 10,
  },

  lastName: {
    fontSize: 16,
    marginBottom: 8,
  },

  lastNameInput: {
    height: 40,
    borderRadius: 8,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    paddingLeft: 8,
    fontSize: 16,
    marginBottom: 10,
  },

  age: {
    fontSize: 16,
    marginBottom: 8,

  },

  ageInput: {
     height: 40,
    borderRadius: 8,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    paddingLeft: 8,
    fontSize: 16,
    marginBottom: 18,
  },

  continue: {
    width: '100%',
    height: 40,
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    marginVertical: 20,
    marginBottom: 14, 
  },
  next: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    paddingTop: 8
  },

  goBack: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
