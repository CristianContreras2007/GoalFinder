import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Pressable, Linking } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { useTitles } from '@/components/TitlesContext';

const { width, height } = Dimensions.get('window');

const entries = [
  { title: 'First Image', illustration: require('@/assets/images/HeartofLa1.png') },
  { title: 'Second Image', illustration: require('@/assets/images/HeartofLa2.png') },
  { title: 'Third Image', illustration: require('@/assets/images/HeartofLa3.png') },
  { title: 'Fourth Image', illustration: require('@/assets/images/HeartofLa4.png') },
];

const HeartofLA = () => {
  const mapRef = useRef<MapView | null>(null);
  const markerCoordinate = {
    latitude: 34.048000,
    longitude: -118.255940
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

  const handleBackArrowClick = () => {
    router.back(); 
  };
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { titles, setTitles } = useTitles();

  const onScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setActiveIndex(index);
  };

  const goToPage = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * width, animated: true });
    }
  };

  const handleHeartClick = () => {
    const currentTitle = 'Heart of LA'; // Set to the title specific to this page
    setTitles((prevTitles) => {
      const isAlreadyInArray = prevTitles.includes(currentTitle);
      const newTitles = isAlreadyInArray
        ? prevTitles.filter((title) => title !== currentTitle)
        : [...prevTitles, currentTitle];
      console.log('Updated titles on click:', newTitles); // Log the updated titles
      return newTitles;
    });
  };

  const router = useRouter();

  const handlePress = () => {
    Linking.openURL('https://docs.google.com/forms/d/1y3FAYj5T6n6LwgzQ5VKGyshO8mwhu5Odvx6JwRos_7w/viewform?edit_requested=true');
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
        <Text style={styles.program}>Heart of LA - Soccer</Text>
        <View style={styles.general}>
          <Image style={styles.locIcon} source={require('@/assets/images/Location.png')} />
          <Text style={styles.address}>701 Wilshire Blvd #100, Los Angeles, CA 90057</Text>
        </View>
        <View style={styles.tags}>
          <Image source={require('@/assets/images/SoccerTag.png')} style={styles.tag} />
          <Image source={require('@/assets/images/Afternoon.png')} style={styles.tag} />
          <Image source={require('@/assets/images/Fall.png')} style={styles.tag} />
          <Pressable onPress={handleHeartClick}>
            <Image source={require('@/assets/images/HeartIcon.png')} style={styles.heart} />
          </Pressable>
        </View>
        <Text style={styles.dates}>Dates</Text>
        <Text style={styles.dateText}>June 24 - August 2</Text>
        <Text style={styles.ages}>Ages</Text>
        <Text style={styles.agesText}>6-24</Text>
        <Text style={styles.cost}>Cost</Text>
        <Text style={styles.costText}>Free</Text>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: 34.0522,
              longitude: -118.2437,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={markerCoordinate}
              title="Heart of LA"
              description="Location of Program"
            />
          </MapView>
        </View>
        <Text style={styles.mS}>Description</Text>
        <Text style={styles.mSText}>
          Heart of LA has three core intensive academic programs, as well as myriad enrichment programs that expose students to a plethora of engaging and innovative opportunities. These include a dynamic music and youth orchestra program, an intensive and sophisticated visual arts department, premiere sport leagues and clinics, leadership and Science, Technology, Engineering, Arts and Math (STEAM) classes, wraparound and counseling services, alumni support and scholarships, as well as parent and family resources.
        </Text>
        <Text style={styles.contacts}>Contact</Text>
        <Text style={styles.emailInfo}>info@heartofla.org</Text>
        <Text style={styles.numberInfo}>(213) 389 - 1148</Text>
      </ScrollView>
      <View style={styles.applyView}>
        <Pressable style={styles.apply} onPress={handlePress}>
          <Text style={styles.applyText}>Apply</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HeartofLA;

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
    height: 80,
    fontWeight: '700',
    fontSize: 22,
    marginHorizontal: 22,
    paddingTop: 20,
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
    marginBottom: 30,
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
    marginBottom: 10,
  },
  dateText: {
    fontWeight: '600',
    fontSize: 14,
    marginHorizontal: 22,
    marginBottom: 20
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
    fontSize: 18,
    marginHorizontal: 22,
    marginVertical: 20,
  },
  mSText: {
    fontSize: 14,
    marginHorizontal: 22,
    marginBottom: 20,
  },
  contacts: {
    marginHorizontal: 22,
    width: 450,
    height: 25,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20
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
    bottom: 240,
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
    marginBottom: 10,
  },

  agesText: {
    fontWeight: '600',
    fontSize: 14,
    marginHorizontal: 22,
    marginBottom: 20
  },

  cost: {
    width: 101,
    height: 25,
    fontWeight: '700',
    fontSize: 20,
    marginHorizontal: 22,
    marginBottom: 10,
  },

  costText: {
    fontWeight: '600',
    fontSize: 14,
    marginHorizontal: 22,
    marginBottom: 50
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
});
