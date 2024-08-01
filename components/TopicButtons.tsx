import { StyleSheet, Image, Pressable, ViewStyle, StyleProp, Text, View, ImageSourcePropType, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

interface PropsTopicButton {
  imageURI: ImageSourcePropType; 
  style: StyleProp<ViewStyle>;
  onPress: () => void;
};



const TopicButtons: React.FC<PropsTopicButton> = ({imageURI, style, onPress}) => {

const [pressed, setPressed] = useState(false);
const checkmarkOpacity = useRef(new Animated.Value(0)).current;
const [isAnimating, setIsAnimating] = useState(false);

const onClicked = () => {
if (!isAnimating) {
  setPressed(prevPressed => !prevPressed);
  setIsAnimating(true);
  onPress();
 }
};

useEffect(() => {
  const animateCheckmark = () => {
    Animated.timing(checkmarkOpacity, {
      toValue: pressed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsAnimating(false);
    });
  }

  animateCheckmark();
 }, [pressed]);
 

  return (
    <Pressable onPress = {onClicked} style={[style, styles.container]}>
      <View style={styles.unifier}>
      <Image 
      source={imageURI}
      style = {[styles.image, pressed ? styles.imagePressed : styles.imageNotPressed]} />
       {pressed && (
      <Animated.Image
      source={require('@/assets/images/Checkmark.png')}
      style={[styles.checkmark, {opacity: checkmarkOpacity}]}/>
    )}
    </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({

  unifier: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 186,
    height: 186,
  },

  imagePressed: {
  },

  imageNotPressed: {

  },

  checkmark: {
    position: 'absolute',
    width: 30,
    height: 30,
    right: 20,
    top: 20,
    opacity: 0,
  },
})


export default TopicButtons;
