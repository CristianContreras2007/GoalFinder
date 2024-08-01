import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { TitlesProvider } from '@/components/TitlesContext';

export default function _layout() {
  return (
    <TitlesProvider>
      <Stack>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(programs)' options={{ headerShown: false }} />
        <Stack.Screen name='(applications)' options={{ headerShown: false }} />
        <Stack.Screen name='(admin)' options={{ headerShown: false }} />
        <Stack.Screen name='(viewcontrol)' options={{ headerShown: false }} />
      </Stack>
    </TitlesProvider>
  );
}

const styles = StyleSheet.create({});
