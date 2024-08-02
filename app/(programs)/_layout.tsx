import { StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { TitlesProvider } from '@/components/TitlesContext';

const _layout = () => {
  return (
    <TitlesProvider> 
      <Stack>
        <Stack.Screen name="streetsoccerla" options={{ headerShown: false }} />
        <Stack.Screen name="heartofla" options={{ headerShown: false }} />
        <Stack.Screen name="ayso" options = {{headerShown: false}} />
        <Stack.Screen name="lasfotos" options = {{headerShown: false}} />
        <Stack.Screen name="innercityarts" options = {{headerShown: false}}/>
        <Stack.Screen name="urbantxt" options = {{headerShown: false}} />
        <Stack.Screen name="blackgirlscode" options = {{headerShown: false}} />
       </Stack>
    </TitlesProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
