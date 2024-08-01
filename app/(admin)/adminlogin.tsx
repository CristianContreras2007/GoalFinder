import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://0.0.0.0:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.replace('/streetsoccercontrol');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.logo}>Program Login</Text>
        <Text style={styles.email}>Email</Text>
        <TextInput
          style={styles.emailInput}
          placeholder='Type Here'
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.password}>Password</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder='Type Here'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable style={styles.continue} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.next}>Next</Text>}
        </Pressable>
        <Pressable onPress={() => router.replace('/')}>
          <Text style={styles.back}>Back</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  content: {
    padding: 16,
  },
  logo: {
    fontSize: 40,
    marginVertical: 50,
    marginBottom: 42,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    marginVertical: 8,
  },
  emailInput: {
    height: 40,
    borderRadius: 8,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    paddingLeft: 8,
    fontSize: 16,
    marginBottom: 18,
  },
  password: {
    fontSize: 16,
    marginVertical: 7,
  },
  passwordInput: {
    height: 40,
    borderRadius: 8,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    paddingLeft: 8,
    fontSize: 16,
    marginBottom: 18,
  },
  continue: {
    width: '100%',
    height: 40,
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    marginVertical: 20,
    marginBottom: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  next: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  forgot: {
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '400',
    marginBottom: 18,
    textAlign: 'center',
  },
  back: {
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '400',
    textAlign: 'center',
  },
});
