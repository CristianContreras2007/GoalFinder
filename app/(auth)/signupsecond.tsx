import React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router'

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.content}>
        <Text style = {styles.firstTitle}>Now, where</Text>
        <Text style = {styles.secondTitle}>should we locate</Text>
        <Text style = {styles.tripleTitle}>programs</Text>
        <Text style = {styles.zipCode}> Zip Code</Text>
        <TextInput style = {styles.zipCodeInput} placeholder='Type Here'></TextInput>
        <Pressable style={styles.continue}
        onPress = {() => router.replace('/signupthird')}>
        <Text style={styles.next}>Next</Text>
        </Pressable>
        <Pressable
        onPress = {() => router.replace('/signupfirst')}>
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
  },

  tripleTitle: {
    width: 344,
    height: 50,
    fontSize: 40,
    fontWeight: '600',
    marginBottom: 60,
  },



  zipCode: {
    fontSize: 16,
    marginBottom: 8,
  },

  zipCodeInput: {
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
