import { Text, View, Pressable, StyleSheet, ScrollView, Image, ImageSourcePropType } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from "@/components/SearchBar";

type ForYouParams = {
    topics?: string;
};

interface TopicImage {
    uri: ImageSourcePropType;
    targetPage: string;
}

interface Topic {
    name: string;
    images: TopicImage[];
}

interface Program {
    title: string;
}

const topicsData: Topic[] = [
    {
        name: 'Soccer',
        images: [
            { uri: require('@/assets/images/StreetSoccerLA.png'), targetPage: '/streetsoccerla' },
            { uri: require('@/assets/images/HeartofLA.png'), targetPage: '/heartofla' },
            { uri: require('@/assets/images/AmericanYouSoccerOrganization.png'), targetPage: '/ayso'}
        ]
    },

    {
        name: 'Basketball',
        images: [
            { uri: require('@/assets/images/StreetSoccerLA.png'), targetPage: '/streetsoccerla'}
        ]
    },

    {
        name: 'Photography',
        images: [
            {uri: require('@/assets/images/LasFotos.png'), targetPage: '/lasfotos'}
        ]
    },

    {
        name: 'Digital Art',
        images: [
            {uri: require('@/assets/images/InnerCityArts.png'), targetPage: '/innercityarts'}
        ]
    },

    {
        name: 'Coding',
        images: [
            {uri: require('@/assets/images/Urban TXT.png'), targetPage: '/urbantxt'}
        ]
    }
];

export default function ForYou() {
    const { topics } = useLocalSearchParams<ForYouParams>();
    const selectedTopics: string[] = topics ? JSON.parse(topics) : [];
    const router = useRouter();
    const [programs, setPrograms] = useState<Program[]>([]);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.welcome}>Welcome, User!</Text>
            <SearchBar />
            <View>
                <ScrollView>
                    {selectedTopics.map((topic, index) => {
                        const topicData = topicsData.find(t => t.name === topic);
                        return topicData ? (
                            <View key={index}>
                                <Text style={styles.program}>{topicData.name}</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {topicData.images.map((image, imgIndex) => (
                                        <Pressable
                                            key={imgIndex}
                                            onPress={() => router.navigate(image.targetPage as any)}
                                        >
                                            <Image source={image.uri} style={styles.spacing} />
                                        </Pressable>
                                    ))}
                                </ScrollView>
                            </View>
                        ) : null;
                    })}
                </ScrollView>
                <View>
                    <Text style={styles.programListTitle}></Text>
                    {programs.map((program, index) => (
                        <View key={index} style={styles.programBox}>
                            <Text style={styles.programTitle}>{program.title}</Text>
                        </View>
                    ))}
                </View>
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
    tags: {
        width: 45,
        height: 35,
        fontWeight: '400',
        fontSize: 20,
        margin: 30,
        marginVertical: 30
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
    programListTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginHorizontal: 20,
        marginTop: 20,
    },
    programBox: {
        backgroundColor: '#ADD8E6', // Light blue color
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 20,
    },
    programTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
});
