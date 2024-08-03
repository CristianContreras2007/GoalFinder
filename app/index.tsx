import { Text, View, Pressable, StyleSheet, ScrollView, Image } from "react-native";
import { router } from 'expo-router'
import React from 'react';

 
export default function Intro() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
      <Image source = {require('@/assets/images/GOALLogo.png')} style = {styles.logo}/>
      <Text style={styles.logoText}>GOAL Finder</Text>
      <Text style={styles.slogan}>The best way to find new programs for you</Text>
      <Pressable 
            style={styles.createButton}
            onPress={() => router.navigate('/signupfirst')}>
        <Text style={styles.createText}>SignUp</Text>
      </Pressable>
      <Pressable 
        style={styles.alreadyButton} 
        onPress={() => router.navigate('/login')}
      >
        <Text style={styles.alreadyText}>Login</Text>
      </Pressable>
      <Pressable onPress = {() => router.navigate('/adminlogin')}>
        <Text style = {styles.admin}>Have an admin account? Click here</Text>
      </Pressable>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logoText: {
    fontSize: 40,
    marginBottom: 40,
    textAlign: 'center',
    marginVertical: 0,
  },
  slogan: {
    fontSize: 16,
    marginBottom:50,
    textAlign: 'center',
  },
  createButton: {
    width: '90%',
    height: 61,
    backgroundColor: '#5E60CE',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  createText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  alreadyButton: {
    width: '90%',
    height: 61,
    backgroundColor: '#D9D9D9',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  alreadyText: {
    fontSize: 16,
  },

  scrollViewContainer: {
    flexGrow: 1,
  },

  admin: {
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '400',
  },

  logo: {
    width: 250,
    height: 250,
    marginBottom: 50,
    resizeMode: 'contain',
  }


});
