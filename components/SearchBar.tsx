import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React from 'react'


const SearchBar = () => {
  return (
    <View>
      <TextInput placeholder='Type Here' style = {styles.searchBar}></TextInput>
      <Image source = {require('@/assets/images/Search.png')}
      style = {styles.searchIcon}/>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBar: {   
        borderRadius: 28,
        backgroundColor: '#ECE6F0',
        width: '88%',
        height: 60,
        margin: 20,
        paddingHorizontal: 60,
        fontSize: 18,
    },

    searchIcon: {
        position: 'absolute',
        top: 40,
        left: 38,
        width: 25,
        height: 20,
    }

    
})