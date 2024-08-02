import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router'; // Import router from expo-router
import { useTitles } from '@/components/TitlesContext';

const programImages: Record<string, any> = {
  'Street Soccer LA': require('@/assets/images/StreetSoccerBookmark.png'),
  'Heart of LA': require('@/assets/images/HeartofLABookmark.png'),
  'Las Fotos': require('@/assets/images/LFP.png'),
  'Urban TXT': require('@/assets/images/TXT.png'),
  'InnerCity Arts': require('@/assets/images/InnerBookmark.png'),
  'American Youth Soccer Organization (AYSO)': require('@/assets/images/AysoBookmark.png'),
  'Black Girls Code': require('@/assets/images/BCGBookmark.png')
};

const { width } = Dimensions.get('window');

const Notifications = () => {
  const { titles, refreshTitles } = useTitles();

  useFocusEffect(
    useCallback(() => {
      refreshTitles();
    }, [])
  );

  const handlePress = (title: string) => {
   
    switch (title) {
      case 'Street Soccer LA':
        router.navigate('/streetsoccerla'); 
        break;
      case 'Heart of LA':
        router.navigate('/heartofla'); 
        break;
        case 'Las Fotos':
          router.navigate('/lasfotos'); 
          break;
       case 'Urban TXT':
          router.navigate('/urbantxt'); 
          break;
          case 'InnerCity Arts':
            router.navigate('/innercityarts'); 
            break;
            case 'American Youth Soccer Organization (AYSO)':
              router.navigate('/ayso'); 
              break;
              case 'Black Girls Code':
              router.navigate('/blackgirlscode'); 
              break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.titleContainer}>
        <View style={styles.bookMarkText}>
          <Text style={styles.bookMarkTitle}>BookMarked</Text>
        </View>
        {titles.length > 0 ? (
          titles.map((title, index) => (
            <View key={index} style={styles.itemContainer}>
              {programImages[title] ? (
                <Pressable onPress={() => handlePress(title)}>
                  <View style={styles.rowContainer}>
                    <Image source={programImages[title]} style={styles.programImage} />
                    <Text style={styles.programText}>{title}</Text>
                  </View>
                </Pressable>
              ) : (
                <Text style={styles.noImage}>No image available</Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noBookmarks}>No bookmarks yet</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  titleContainer: {
    padding: 20,
  },
  bookMarkTitle: {
    fontWeight: '400',
    fontSize: 30,
    textDecorationLine: 'underline',
    marginVertical: 60,
    marginBottom: 20,
  },
  itemContainer: {
    paddingHorizontal: 5,
    marginVertical: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  programImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    marginRight: 10,
  },
  programText: {
    fontSize: 18,
    width: width * 0.5
  },
  noBookmarks: {
    fontSize: 18,
    color: 'gray',
  },
  noImage: {
    fontSize: 16,
    color: 'gray',
  },
  bookMarkText: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
