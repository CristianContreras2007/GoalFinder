import { StyleSheet, Text, View, Pressable, Image, ScrollView, ScrollViewComponent } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Me = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}
    showsVerticalScrollIndicator = {false}>
    <View style = {styles.view}>
      <Text style = {styles.profile}>Your Profile</Text>
      <View>
        <Image source = {require('@/assets/images/User.png')}
        style = {styles.userIcon}/>
        <Image source = {require('@/assets/images/Edit.png')}
        style = {styles.edit}/>
      </View>
      <Text style = {styles.setting}>Settings</Text>
      <Pressable style = {styles.purpleBox}
      onPress = {() => router.navigate('/survey')}>
        <Text style = {styles.changeInterests}>Change Interests</Text>
        <Image source = {require('@/assets/images/Arrow.png')} 
        style = {styles.arrow}/>
       </Pressable>
       <Pressable style = {styles.purpleBox}>
        <Text style = {styles.appliedFor}>Programs You've Applied For</Text>
        <Image source = {require('@/assets/images/Arrow.png')} 
        style = {styles.secondArrow}/>
       </Pressable>
    </View>
    </ScrollView>
  )
}

export default Me

const styles = StyleSheet.create({

  scrollViewContainer: {
    flexGrow: 1
  },

  view: {
    alignItems: 'center',
  },

  profile: {
    width: 90,
    height: 60,
    fontWeight: '400',
    fontSize: 16,
    marginVertical: 116, 
    marginBottom: 0,
    textAlign: 'center',
  },

  userIcon: {
    height: 120,
    width: 120,
    marginBottom: 117,
  },

  edit: {
    position: 'absolute',
    width: 56,
    height: 56,
    margin: 78,
    marginHorizontal: 60,
  },

  setting: {
    width: 179,
    height: 52,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 224,
  },

  purpleBox: {
    width: 314.72,
    height: 51,
    backgroundColor: '#5E60CE',
    borderRadius: 10,
    marginBottom: 40,
  },

  changeInterests: {
    width: 180,
    height: 30,
    fontWeight: '400',
    fontSize: 20,
    marginVertical: 12,
    color: '#FFFFFF',
    margin: 81.72,
  },

  arrow: {
    marginVertical: -48,
    margin: 260,
    width: 52.45,
    height: 41,
  },

  appliedFor: {
    width: 270,
    height: 30,
    fontWeight: '400',
    fontSize: 20,
    color: '#FFFFFF',
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: 'center',
  },

  secondArrow: {
    marginVertical: -46,
    margin: 260,
    width: 52.45,
    height: 41,
  },

})