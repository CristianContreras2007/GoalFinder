import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder='Type Here'
                style={styles.searchBar}
            />
            <Image
                source={require('@/assets/images/Search.png')}
                style={styles.searchIcon}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
    },
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
});

export default SearchBar;
