import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView, DevToolsSettingsManager, Image } from 'react-native';
import { router, } from 'expo-router';
import TopicButtons from '@/components/TopicButtons';


export default function Survey() {
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [showError, setShowError] = useState<boolean>(false);

    const toggleTopic = (topic: string) => {
        setSelectedTopics((prev) =>
            prev.includes(topic)
                ? prev.filter((item) => item !== topic)
                : [...prev, topic]
        );
    };

    const handleDonePress = () => {
        if (selectedTopics.length === 0) {
            setShowError(true);
        } else {
            setShowError(false);
            const queryParams = new URLSearchParams({ topics: JSON.stringify(selectedTopics) }).toString();
            router.replace(`/foryou?${queryParams}`)
        }
    }

    const handleBackArrowClick = () => {
        router.back();
        
    };


    return (
        <View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}
                showsVerticalScrollIndicator={false}>
                    <Pressable onPress={handleBackArrowClick} style={styles.backArrowContainer}>
                        <Image source={require('@/assets/images/BackArrow.png')} style={styles.backArrowImage} />
                    </Pressable>
                <View style={styles.container}>
                    <Text style={styles.title}>Choose Your Program</Text>
                    <Text style={styles.description}>Select Programs you think you'd be interested in.
                        You can always change this from your profile, so don't stress!</Text>
                    {showError && (
                        <Text style={styles.errorText}>*Please select at least one interest before proceeding.*</Text>
                    )}
                    <Text style={styles.fitness}>Fitness</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <TopicButtons
                            imageURI={require('@/assets/images/Soccer.png')}
                            style={styles.imagesFitness}
                            onPress={() => toggleTopic('Soccer')}
                        />
                        <TopicButtons
                            imageURI={require('@/assets/images/Basketball.png')}
                            style={styles.imagesFitness}
                            onPress={() => toggleTopic('Basketball')} />
                        <TopicButtons imageURI={require('@/assets/images/Football.png')}
                            style={styles.imagesFitness}
                            onPress={() => toggleTopic('Football')} />
                        <TopicButtons imageURI={require('@/assets/images/Track.png')}
                            style={styles.imagesFitness}
                            onPress={() => toggleTopic('Track')} />
                        <TopicButtons imageURI={require('@/assets/images/Tennis.png')}
                            style={styles.imagesFitness}
                            onPress={() => toggleTopic('Tennis')} />
                        <TopicButtons imageURI={require('@/assets/images/Swimming.png')}
                            style={styles.imagesFitness}
                            onPress={() => toggleTopic('Swimming')} />
                    </ScrollView>
                    <Text style={styles.fitness}>Art</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <TopicButtons imageURI={require('@/assets/images/Drawing.png')}
                            style={styles.imagesArt}
                            onPress={() => toggleTopic('Drawing')} />
                        <TopicButtons imageURI={require('@/assets/images/Photography.png')}
                            style={styles.imagesArt}
                            onPress={() => toggleTopic('Photography')} />
                        <TopicButtons imageURI={require('@/assets/images/Drama.png')}
                            style={styles.imagesArt}
                            onPress={() => toggleTopic('Drama')} />
                        <TopicButtons imageURI={require('@/assets/images/DigitalArt.png')}
                            style={styles.imagesArt}
                            onPress={() => toggleTopic('Digital Art')} />
                        <TopicButtons imageURI={require('@/assets/images/Dancing.png')}
                            style={styles.imagesArt}
                            onPress={() => toggleTopic('Dancing')} />
                    </ScrollView>
                    <Text style={styles.fitness}>Tech</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <TopicButtons imageURI={require('@/assets/images/Coding.png')}
                            style={styles.imagesTech}
                            onPress={() => toggleTopic('Coding')} />
                        <TopicButtons imageURI={require('@/assets/images/Robotics.png')}
                            style={styles.imagesTech}
                            onPress={() => toggleTopic('Robotics')} />
                        <TopicButtons imageURI={require('@/assets/images/VideoEditing.png')}
                            style={styles.imagesTech}
                            onPress={() => toggleTopic('Video Editing')} />
                        <TopicButtons imageURI={require('@/assets/images/MusicProduction.png')}
                            style={styles.imagesTech}
                            onPress={() => toggleTopic('Music Production')} />
                    </ScrollView>
                    <Pressable style={styles.continue}
                        onPress={handleDonePress}>
                        <Text style={styles.text}>Done</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },

    container: {
        alignItems: 'center',
    },

    title: {
        width: 346,
        height: 44,
        fontSize: 29,
        fontWeight: '600',
        marginBottom: 10,
        marginVertical: 60,
        textAlign: 'center'

    },

    description: {
        width: 350,
        height: 100,
        fontWeight: '300',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        alignItems: 'center',
        padding: 16,
    },

    fitness: {
        fontWeight: '700',
        fontSize: 20,
        height: 28,
        marginBottom: 10,
    },

    imagesFitness: {
        marginHorizontal: 10,
        marginBottom: 24,
    },

    imagesArt: {
        marginHorizontal: 10,
        marginBottom: 24,
    },

    imagesTech: {
        marginHorizontal: 10,
        marginBottom: 24,
    },

    continue: {
        width: '90%',
        height: 40,
        backgroundColor: '#2C2C2C',
        borderRadius: 8,
        marginBottom: 20,
    },

    text: {
        color: '#FFFFFF',
        fontSize: 16,
        paddingTop: 8,
        textAlign: 'center',
    },

    imagePressed: {

    },

    errorText: {
        color: 'red',
        fontSize: 16,
    },

    images: {

    },

    backArrowContainer: {
        marginVertical: 50,
        marginHorizontal: 20,
        marginBottom: -50
    },
    backArrowImage: {
        width: 48,
        height: 48,
        marginBottom: 0
    },

}

);
