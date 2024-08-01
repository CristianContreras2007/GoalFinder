import React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.content}>
        <Text style = {styles.firstTitle}>Now, Create</Text>
        <Text style = {styles.secondTitle}>Your Account</Text>
        <Text style={styles.email}>Email</Text>
        <TextInput style={styles.emailInput} placeholder='Type Here' />
        <Text style={styles.password}>Password</Text>
        <TextInput style={styles.passwordInput} placeholder='Type Here' />
        <Pressable style={styles.continue}
        onPress = {() => router.replace('/survey')}>
        <Text style={styles.next}>Next</Text>
        </Pressable>
        <Pressable
        onPress = {() => router.replace('/signupsecond')}>
        <Text style = {styles.goBack}>Go Back</Text>
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
    marginVertical: 60,
    marginBottom: 0,
  },

  secondTitle: {
    width: 344,
    height: 50,
    fontSize: 40,
    fontWeight: '600',
    marginBottom: 42,
  },

  email: {
    fontSize: 16,
    marginVertical: 8,
  },
  emailInput: {
    height: 40,
    borderRadius: 8,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    paddingLeft: 8,
    fontSize: 16,
    marginBottom: 18,
  },
  password: {
    fontSize: 16,
    marginVertical: 7,
  },
  passwordInput: {
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

  forgot: {
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '400',
    marginBottom: 30,
  },

  back: {
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '400',
    marginBottom: 30,
  },

  goBack: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  
});
