import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, ScrollView, Image } from 'react-native';
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

export default function SignUpSecond() {
  const context = useContext(SignUpContext);
  const [error, setError] = useState<string | null>(null);

  if (!context) {
    throw new Error('SignUpSecond has to be wrapped in the provider.');
  }

  const { formData, setFormData } = context;

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (!formData.zipCode) {
      setError('Please fill in all required fields.');
      return;
    }

    setError(null);

    router.navigate('/signupthird');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Pressable onPress={handleBackArrowClick} style={styles.backArrowContainer}>
        <Image source={require('@/assets/images/BackArrow.png')} style={styles.backArrowImage} />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.firstTitle}>Now, where</Text>
        <Text style={styles.secondTitle}>should we locate</Text>
        <Text style={styles.tripleTitle}>programs</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Text style={styles.zipCode}>Zip Code</Text>
        <TextInput
          style={styles.zipCodeInput}
          placeholder='Type Here'
          value={formData.zipCode}
          onChangeText={(text) => handleChange('zipCode', text)}
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
    marginVertical: 60,
    marginBottom: 0,
  },
  secondTitle: {
    width: 344,
    height: 50,
    fontSize: 40,
    fontWeight: '600',
  },
  tripleTitle: {
    width: 344,
    height: 50,
    fontSize: 40,
    fontWeight: '600',
    marginBottom: 60,
  },
  zipCode: {
    fontSize: 16,
    marginBottom: 8,
  },
  zipCodeInput: {
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
