import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import TabIcon from '@/components/Icon'; 

const TabsLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color, focused }) => {
          let iconSource: any;
          let iconSize: number;
          switch (route.name) {
            case 'foryou':
              iconSource = require('@/assets/images/Home.png'); 
              iconSize = 20
              break;
            case 'notifications':
              iconSource = require('@/assets/images/Save.png');
              iconSize = 30
              break;
            case 'me':
              iconSource = require('@/assets/images/Me.png');
              iconSize = 25
              break;
            default:
              iconSource = require('@/assets/images/Home.png');
              iconSize = 20
          }


          return (
            <TabIcon
              source={iconSource}
              size={iconSize}
              color={color}
              isActive={focused}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF', 
          height: 100,
        },
        tabBarActiveTintColor: '#FFFFFF', 
        tabBarInactiveTintColor: '#000000',
      })}
    >
      <Tabs.Screen
        name="foryou"
        options={{ title: "", headerShown: false }}
      />
      <Tabs.Screen
        name="notifications"
        options={{ title: "", headerShown: false }}
      />
      <Tabs.Screen
        name="me"
        options={{ title: "", headerShown: false }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
