import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, ScrollView, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { SignUpContext } from '@/components/SignUp';

const handleBackArrowClick = () => {
  router.back(); 
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  zipCode: string;
  topics: string[];
}

export default function SignUpFirst() {
  const context = useContext(SignUpContext);
  const [error, setError] = useState<string | null>(null);

  if (!context) {
    throw new Error('SignUpFirst has to be wrapped in the provider.');
  }

  const { formData, setFormData } = context;

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (!formData.firstName || !formData.lastName || !formData.age) {
      setError('Please fill in all required fields.');
      return;
    }

    setError(null);

    router.navigate('/signupsecond');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Pressable onPress={handleBackArrowClick} style={styles.backArrowContainer}>
        <Image source={require('@/assets/images/BackArrow.png')} style={styles.backArrowImage} />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.firstTitle}>First, Tell Us</Text>
        <Text style={styles.secondTitle}>About You</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Text style={styles.firstName}>First Name</Text>
        <TextInput
          style={styles.firstNameInput}
          placeholder='Type Here'
          value={formData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
        />
        <Text style={styles.lastName}>Last Name</Text>
        <TextInput
          style={styles.lastNameInput}
          placeholder='Type Here'
          value={formData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
        />
        <Text style={styles.age}>Age</Text>
        <TextInput
          style={styles.ageInput}
          placeholder='Type Here'
          value={formData.age}
          onChangeText={(text) => handleChange('age', text)}
        />
        <Pressable style={styles.continue} onPress={handleNext}>
          <Text style={styles.next}>Next</Text>
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
  firstTitle: {
    width: 344,
    height: 50,
    fontSize: 40,
    fontWeight: '600',
    marginVertical: 50,
    marginBottom: 0,
  },
  secondTitle: {
    width: 344,
    height: 50,
    fontSize: 40,
    fontWeight: '600',
    marginBottom: 60,
  },
  firstName: {
    fontSize: 16,
    marginBottom: 8,
  },
  firstNameInput: {
    height: 40,
    borderRadius: 8,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    paddingLeft: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  lastName: {
    fontSize: 16,
    marginBottom: 8,
  },
  lastNameInput: {
    height: 40,
    borderRadius: 8,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    paddingLeft: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  age: {
    fontSize: 16,
    marginBottom: 8,
  },
  ageInput: {
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
  },
  next: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    paddingTop: 8
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  backArrowContainer: {
    marginVertical: 50,
    marginHorizontal: 10,
    marginBottom: -50
  },
  backArrowImage: {
    width: 48,
    height: 48,
    marginBottom: 0
  },
});
