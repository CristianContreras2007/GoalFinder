import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Dimensions, Pressable, Alert, TextStyle, StyleProp, Image } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const { width } = Dimensions.get('window');

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  reason?: string;
}

const StreetSoccerLaApp: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const [errors, setErrors] = useState<Errors>({});

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    let errors: Errors = {};

    if (!firstName.trim()) {
      errors.firstName = 'Input is required';
      isValid = false;
    }

    if (!lastName.trim()) {
      errors.lastName = 'Input is required';
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = 'Input is required';
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Input is required';
      isValid = false;
    }

    if (!reason.trim()) {
      errors.reason = 'Input is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleError = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    } else if (typeof error === 'string') {
      return error;
    } else {
      return 'An unexpected error occurred';
    }
  };
  
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://10.25.252.149:3000/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          reason,
        }),
      });
  
      const responseText = await response.text();
      console.log("Raw response text:", responseText);
  
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = JSON.parse(responseText);
        Alert.alert('Success', data.message || 'Your application has been submitted.');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setReason('');
      } else {
        console.error('Unexpected content type:', contentType);
        Alert.alert('Error', 'Unexpected server response');
      }
    } catch (error) {
      const errorMessage = handleError(error);
      Alert.alert('Error', errorMessage);
      console.error('Error:', errorMessage);
    }
  };

  const handleBackArrowClick = () => {
    router.back(); 
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      <Pressable onPress={handleBackArrowClick} style={styles.backArrowContainer}>
            <Image source={require('@/assets/images/BackArrow.png')} style={styles.backArrowImage} />
            </Pressable>
      <View style={styles.container}>
        <Text style={styles.program}>Program Apply</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>First Name</Text>
        <TextInput
          placeholder='Type Here'
          style={[styles.infoBox, errors.firstName && styles.errorBox] as StyleProp<TextStyle>}
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

        <Text style={styles.infoText}>Last Name</Text>
        <TextInput
          placeholder='Type Here'
          style={[styles.infoBox, errors.lastName && styles.errorBox] as StyleProp<TextStyle>}
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

        <Text style={styles.infoText}>Email</Text>
        <TextInput
          placeholder='Type Here'
          style={[styles.infoBox, errors.email && styles.errorBox] as StyleProp<TextStyle>}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.infoText}>Phone Number</Text>
        <TextInputMask
          placeholder='Type Here'
          style={[styles.infoBox, errors.phoneNumber && styles.errorBox] as StyleProp<TextStyle>}
          type={'custom'}
          options={{
            mask: '(999) 999-9999'
          }}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

        <Text style={styles.infoText}>Why do you want to join?</Text>
        <TextInput
          placeholder='Type Here'
          style={[styles.longInfoBox, errors.reason && styles.errorBox] as StyleProp<TextStyle>}
          multiline
          textAlignVertical='top'
          value={reason}
          onChangeText={text => setReason(text)}
        />
        {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}

        <Pressable style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  program: {
    width: 277,
    height: 55,
    fontWeight: '600',
    fontSize: 40,
    margin: 100,
    marginBottom: 100,
  },

  scrollViewContainer: {
    flexGrow: 1,
  },

  container: {
    alignItems: 'center',
  },

  infoContainer: {
    paddingHorizontal: 24,
  },

  infoText: {
    width: 355,
    height: 25,
    fontWeight: '400',
    fontSize: 16,
  },

  infoBox: {
    width: width * 0.9,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0C7C7',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  longInfoBox: {
    width: width * 0.9,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0C7C7',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 12,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },

  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5E60CE',
    borderRadius: 8,
    width: width * 0.9,
    height: 40,
    marginBottom: 40
  },

  submitText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#FFFFFF',
  },

  errorBox: {
    borderColor: '#FF0000',
    borderWidth: 1,
  },

  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginBottom: 12,
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

export default StreetSoccerLaApp;
