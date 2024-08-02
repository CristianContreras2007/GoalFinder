import { Text, View, Pressable, StyleSheet, ScrollView, Image, ImageSourcePropType } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useMemo } from 'react';
import SearchBar from "@/components/SearchBar";

type ForYouParams = {
    topics?: string;
};

interface TopicImage {
    uri: ImageSourcePropType;
    targetPage: string;
    label: string;
}

interface Topic {
    name: string;
    images: TopicImage[];
}

const topicsData: Topic[] = [
    {
        name: 'Soccer',
        images: [
            { uri: require('@/assets/images/StreetSoccerLA.png'), targetPage: '/streetsoccerla', label: 'Street Soccer LA' },
            { uri: require('@/assets/images/HeartofLA.png'), targetPage: '/heartofla', label: 'Heart of LA' },
            { uri: require('@/assets/images/AYSO.png'), targetPage: '/ayso', label: 'American Youth Soccer Organization' }
        ]
    },
    {
        name: 'Basketball',
        images: [
            { uri: require('@/assets/images/StreetSoccerLA.png'), targetPage: '/streetsoccerla', label: 'Basketball League' }
        ]
    },
    {
        name: 'Photography',
        images: [
            {uri: require('@/assets/images/LasFotosImage.png'), targetPage: '/lasfotos', label: 'Las Fotos'}
        ]
    },
    {
        name: 'Digital Art',
        images: [
            {uri: require('@/assets/images/InnerCityArts.png'), targetPage: '/innercityarts', label: 'Inner City Arts'}
        ]
    },
    {
        name: 'Coding',
        images: [
            {uri: require('@/assets/images/UrbanTXT.png'), targetPage: '/urbantxt', label: 'Urban TXT'},
            {uri: require('@/assets/images/BlackGirlsCode.png'), targetPage: '/blackgirlscode', label: 'Black Girls Code'}
        ]
    }
];

export default function ForYou() {
    const { topics } = useLocalSearchParams<ForYouParams>();
    const selectedTopics: string[] = topics ? JSON.parse(topics) : [];
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filter images based on search query
    const filteredImages = useMemo(() => {
        return topicsData
            .flatMap(topic => topic.images)
            .filter(image => image.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery]);

    // Filter topics based on selected topics
    const filteredTopics = useMemo(() => {
        return topicsData
            .filter(topic => selectedTopics.includes(topic.name));
    }, [selectedTopics]);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.welcome}>Welcome, User!</Text>
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
            <View>
                {searchQuery !== '' && (
                    <View>
                        <Text style={styles.resultsText}>Search Results for "{searchQuery}"</Text>
                        {filteredImages.length === 0 && (
                            <Text style={styles.noResults}>No results found.</Text>
                        )}
                        {filteredImages.map((image, index) => (
                            <Pressable
                                key={index}
                                onPress={() => router.navigate(image.targetPage as any)}
                            >
                                <Image source={image.uri} style={styles.spacing} />
                            </Pressable>
                        ))}
                    </View>
                )}
                {selectedTopics.length > 0 && (
                    <View>
                        {filteredTopics.map((topic, index) => (
                            <View key={index}>
                                <Text style={styles.program}>{topic.name}</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {topic.images.map((image, imgIndex) => (
                                        <Pressable
                                            key={imgIndex}
                                            onPress={() => router.navigate(image.targetPage as any)}
                                        >
                                            <Image source={image.uri} style={styles.spacing} />
                                        </Pressable>
                                    ))}
                                </ScrollView>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1
    },
    welcome: {
        width: 202,
        height: 36,
        fontWeight: '600',
        fontSize: 28,
        margin: 24,
        marginBottom: 10,
        marginVertical: 60,
    },
    searchBar: {
        marginRight: 20,
    },
    spacing: {
        marginRight: 0,
        marginBottom: 20,
        marginHorizontal: 18,
        width: 186,
        height: 223
    },
    program: {
        marginBottom: 20,
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: '700',
        width: 1099,
        height: 28,
    },
    resultsText: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    noResults: {
        fontSize: 16,
        color: 'gray',
        marginVertical: 10,
        marginHorizontal: 20,
    },
});
