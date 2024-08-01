import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface TabIconProps {
  source: ImageSourcePropType;
  size: number;
  color: string;
  isActive: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ source, size, color, isActive }) => {
  return (
    <View style={styles.iconWrapper}>
      {isActive && <View style={styles.circleBackground} />}
      <Image
        source={source}
        style={[styles.icon, { width: size, height: size, tintColor: color }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBackground: {
    position: 'absolute',
    width: 40,
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#5E60CE',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1, 
  },
  icon: {
  }
});

export default TabIcon;
