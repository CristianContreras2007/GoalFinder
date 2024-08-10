import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Pressable } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { useTitles } from '@/components/TitlesContext';

const { width, height } = Dimensions.get('window');

const entries = [
  { title: 'First Image', illustration: require('@/assets/images/Soccer1.png') },
  { title: 'Second Image', illustration: require('@/assets/images/Soccer2.png') },
  { title: 'Third Image', illustration: require('@/assets/images/Soccer3.png') },
  { title: 'Fourth Image', illustration: require('@/assets/images/Soccer4.png') },
];

const StreetSoccerLA = () => {
  const mapRef = useRef<MapView | null>(null);
  const markerCoordinate = {
    latitude: 34.022415,
    longitude: -118.285530
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

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleHeartClick = () => {
    const currentTitle = 'Street Soccer LA';
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
    const currentTitle = 'Street Soccer LA';
    setIsBookmarked(titles.includes(currentTitle));
  }, [titles]);

  const router = useRouter();

  return (
    <View>
    <ScrollView>
    <View style={styles.container}>
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
      <View style={styles.detailsContaier}>
        <Text style={styles.program}>Program Name</Text>
        <View style={styles.general}>
          <Image style={styles.locIcon} source={require('@/assets/images/Location.png')} />
          <Text style={styles.address}>Address, 900XX</Text>
        </View>
        <View style={styles.tags}>
          <Image source={require('@/assets/images/TagSoccer.png')} style={styles.tag} />
          <Image source={require('@/assets/images/Afternoon.png')} style={styles.tag} />
          <Image source={require('@/assets/images/Fall.png')} style={styles.tag} />
          <Pressable onPress={handleHeartClick} style={styles.heartContainer}>
  <Image
    source={isBookmarked ? require('@/assets/images/BookmarkOn.png') : require('@/assets/images/HeartIcon.png')}
    style={styles.heartImage}
  />
</Pressable>
        </View>
        <Text style={styles.dates}>Dates</Text>
        <Text style={styles.dateText}>Monday - Friday</Text>
        <Text style={styles.dateText2}>AM - PM</Text>
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
              title="USC"
              description="Cool School"
            />
          </MapView>
        </View>
        <Text style={styles.mS}>Mission Statement</Text>
        <Text style={styles.mSText}>
          Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
        </Text>
        <Text style={styles.mSText}>Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
        </Text>
        <Text style={styles.mSText}>Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
        </Text>
        <Text style={styles.contacts}>Contact</Text>
        <Text style={styles.emailInfo}>placeholder@gmail.com</Text>
        <Text style={styles.numberInfo}>(xxx) - xxx - xxxx</Text>
      </View>
    </View>
    </ScrollView>
    <View style={styles.applyView}>
        <Pressable style={styles.apply} onPress={() => router.push('/streetsoccerlaapp')}>
          <Text style={styles.applyText}>Apply</Text>
        </Pressable>
      </View>
    </View>
    
  );
};

export default StreetSoccerLA;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    position: 'relative',
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
  pagination: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    margin: 5,
  },
  program: {
    width: 175,
    height: 60,
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
    marginBottom: 10,
    width: width * 0.9,
    height: 50,
    fontWeight: '700',
    color: 'black',
    paddingHorizontal: 10
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
    marginBottom: 20,
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
    bottom: 220,
    width: 60,
    height: 60,
    right: 60
  },
  tag: {
    width: width * 0.25,
    height: width * 0.25,
    marginHorizontal: 17,
    resizeMode: 'contain'
  },

  detailsContaier: {

  },

  heartContainer: {
    position: 'absolute',
    bottom: 200,
    right: 60,
    width: 60,
    height: 60,
  },
  heartImage: {
    width: '100%',
    height: '100%',
  },
});
