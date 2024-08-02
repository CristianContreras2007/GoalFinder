import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Pressable, Linking } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { useTitles } from '@/components/TitlesContext';

const { width, height } = Dimensions.get('window');

const entries = [
  { title: 'First Image', illustration: require('@/assets/images/LasFotos1.png') },
  { title: 'Second Image', illustration: require('@/assets/images/LasFotos2.png') },
  { title: 'Third Image', illustration: require('@/assets/images/LasFotos3.png') },
  { title: 'Fourth Image', illustration: require('@/assets/images/LasFotos4.png') },
];

const LasFotos = () => {
  const mapRef = useRef<MapView | null>(null);
  const markerCoordinate = {
    latitude: 34.047690,
    longitude: -118.209900
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: markerCoordinate.latitude,
        longitude: markerCoordinate.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }, 1000);
    }
  }, []);

  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { titles, setTitles } = useTitles();

  const onScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setActiveIndex(index);
  };

  const handleBackArrowClick = () => {
    router.back(); 
  };

  const goToPage = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * width, animated: true });
    }
  };



  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleHeartClick = () => {
    const currentTitle = 'Las Fotos';
    setTitles((prevTitles) => {
      const isAlreadyInArray = prevTitles.includes(currentTitle);
      const newTitles = isAlreadyInArray
        ? prevTitles.filter((title) => title !== currentTitle)
        : [...prevTitles, currentTitle];
      setIsBookmarked(!isAlreadyInArray); 
      return newTitles;
    });
  };

  useEffect(() => {
    const currentTitle = 'Las Fotos';
    setIsBookmarked(titles.includes(currentTitle));
  }, [titles]);

  const router = useRouter();

  const handlePress = () => {
    Linking.openURL('https://airtable.com/appPOOxlXQVfFKx3R/shruZjW3BpHN0Xs8Q');
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {entries.map((item, index) => (
          <View key={index} style={styles.carouselItem}>
            <Image source={item.illustration} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </ScrollView>
      <Pressable onPress={handleBackArrowClick} style={styles.backArrowContainer}>
        <Image source={require('@/assets/images/BackArrow.png')} style={styles.backArrowImage} />
      </Pressable>
      <Pressable onPress={handleHeartClick} style={styles.heart}>
        <Image source={require('@/assets/images/HeartIcon.png')} style={styles.heart} />
      </Pressable>
      <View style={styles.pagination}>
        {entries.map((_, index) => (
          <Pressable
            key={index}
            style={[styles.dot, { opacity: activeIndex === index ? 1 : 0.5 }]}
            onPress={() => goToPage(index)}
          />
        ))}
      </View>
    </View>
        <Text style={styles.program}>Las Fotos
        </Text>
        <View style={styles.general}>
          <Image style={styles.locIcon} source={require('@/assets/images/Location.png')} />
          <Text style={styles.address}> 
          2210 East Cesar E Chavez Ave, Los Angeles, California 90033</Text>
        </View>
        <View style={styles.tags}>
          <Image source={require('@/assets/images/Photography.png')} style={styles.tag} />
          <Image source={require('@/assets/images/Evenin.png')} style={styles.tag} />
          <Image source={require('@/assets/images/Fall.png')} style={styles.tag} />
          <Pressable onPress={handleHeartClick} style={styles.heartContainer}>
  <Image
    source={isBookmarked ? require('@/assets/images/BookmarkOn.png') : require('@/assets/images/HeartIcon.png')}
    style={styles.heartImage}
  />
</Pressable>
        </View>
        <Text style={styles.dates}>Dates</Text>
        <Text style={styles.dateText}>Decided upon applying</Text>
        <Text style={styles.ages}>Ages</Text>
        <Text style={styles.agesText}>10 - 18</Text>
        <Text style={styles.cost}>Cost</Text>
        <Text style={styles.costText}>Free</Text>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude:  34.047690,
              longitude: -118.209900,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={markerCoordinate}
              title="Las Fotos"
              description="Location of Office"
            />
          </MapView>
        </View>
        <Text style={styles.mS}>Description</Text>
        <Text style={styles.mSText}>
        The Los Fotos Program offers a unique opportunity for youth to explore photography through a variety of workshops and classes. The program is dedicated to fostering creativity and technical skills in underserved communities. Participants engage in hands-on photography lessons, learn about visual storytelling, and develop their artistic skills. The program also provides opportunities for showcasing their work in exhibitions and community projects, aiming to empower young individuals through the art of photography.
        </Text>
        <Text style={styles.contacts}>Contact</Text>
        <Text style={styles.emailInfo}>info@lasfotosproject.org
        </Text>
        <Text style={styles.numberInfo}>(323) 222 - 2094
        </Text>
      </ScrollView>
      <View style={styles.applyView}>
        <Pressable style={styles.apply} onPress={handlePress}>
          <Text style={styles.applyText}>Apply</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LasFotos;


const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      scrollViewContainer: {
        flexGrow: 1,
      },
      scrollView: {
        width: '100%',
      },
      carouselItem: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: '100%',
        height: height * 0.4,
      },
      pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
      },
      dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000',
        margin: 5,
      },
      program: {
        width: width * 0.9,
        height: 100,
        fontWeight: '700',
        fontSize: 22,
        marginHorizontal: 22,
        paddingTop: 20,
        marginBottom: -40
      },
      locIcon: {
        width: 24,
        height: 24,
        marginHorizontal: 17,
      },
      general: {
        flexDirection: 'row',
      },
      address: {
        fontSize: 18,
        marginLeft: -15,
        marginBottom: 20,
        width: width * 0.9,
        height: 50,
        fontWeight: '700',
        color: 'black',
        paddingHorizontal: 10
      },
      tag: {
        width: width * 0.25,
        height: width * 0.25,
        marginHorizontal: 17,
        resizeMode: 'contain'
      },
      tags: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-around'
      },
      dates: {
        width: 101,
        height: 25,
        fontWeight: '700',
        fontSize: 20,
        marginHorizontal: 22,
        marginBottom: 5,
      },
      dateText: {
        fontWeight: '600',
        fontSize: 14,
        marginHorizontal: 22,
        marginBottom: 10
      },
      dateText2: {
        fontWeight: '600',
        fontSize: 14,
        marginHorizontal: 22,
        marginBottom: 20,
      },
      map: {
        height: 300,
        width: '90%',
        marginBottom: 20,
      },
      mapContainer: {
        alignItems: 'center',
      },
      mS: {
        fontWeight: '700',
        fontSize: 20,
        marginHorizontal: 22,
        marginVertical: 5,
      },
      mSText: {
        fontSize: 14,
        marginHorizontal: 22,
        marginBottom: 10,
      },
      contacts: {
        marginHorizontal: 22,
        width: 450,
        height: 25,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 5
      },
      emailInfo: {
        width: 450,
        height: 25,
        fontWeight: '600',
        fontSize: 17,
        marginHorizontal: 22,
      },
      numberInfo: {
        width: 450,
        height: 25,
        fontWeight: '600',
        fontSize: 17,
        marginHorizontal: 22,
        marginBottom: 120
      },
      apply: {
        width: 171,
        height: 77.17,
        backgroundColor: '#5E60CE',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 10,
      },
      applyView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEF7FF',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#AEADAD',
        position: 'absolute',
        bottom: 0,
        width: '100%'
      },
      applyText: {
        color: '#FFFFFF',
        textAlign: 'center'
      },
      heart: {
        position: 'absolute',
        bottom: 230,
        width: 60,
        height: 60,
        right: 60
      },
    
      ages: {
        width: 101,
        height: 30,
        fontWeight: '700',
        fontSize: 20,
        marginHorizontal: 22,
        marginBottom: 0,
      },
    
      agesText: {
        fontWeight: '600',
        fontSize: 14,
        marginHorizontal: 22,
        marginBottom: 10
      },
    
      cost: {
        width: 101,
        height: 25,
        fontWeight: '700',
        fontSize: 20,
        marginHorizontal: 22,
        marginBottom: 5,
      },
    
      costText: {
        fontWeight: '600',
        fontSize: 14,
        marginHorizontal: 22,
        marginBottom: 20
      },

      backArrowContainer: {
        position: 'absolute',
        top: 50, 
        left: 20,
        zIndex: 1, 
      },
      backArrowImage: {
        width: 48,
        height: 48,
      },
    
      carouselContainer: {
        position: 'relative',
      },

      heartContainer: {
        position: 'absolute',
        bottom: 210,
        right: 60,
        width: 60,
        height: 60,
      },
      heartImage: {
        width: '100%',
        height: '100%',
      },
    });
    
    
    