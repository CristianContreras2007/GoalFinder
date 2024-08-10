import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Button } from 'react-native';

interface Application {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  reason: string;
}

const StreetSoccerControl = (): JSX.Element => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.25.252.149:3000/applications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data: Application[] = await response.json();
        setApplications(data);
      } else {
        console.error('Failed to fetch applications');
      }
    } catch (error) {
      console.error('An error occurred', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.title}>
        <Text style={styles.program}>Program Applications</Text>
        <Button title="Refresh" onPress={fetchApplications} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : applications.length === 0 ? (
        <Text style={styles.noApplications}>No applications found.</Text>
      ) : (
        applications.map((application, index) => (
          <View key={index} style={styles.boxContainer}>
            <TouchableOpacity onPress={() => handleExpand(index)} style={styles.box}>
              <Text style={styles.boxTitle}>
                {application.firstName} {application.lastName} has applied!
              </Text>
              {expandedIndex === index && (
                <View style={styles.details}>
                  <Text>First Name: {application.firstName}</Text>
                  <Text>Last Name: {application.lastName}</Text>
                  <Text>Email: {application.email}</Text>
                  <Text>Phone: {application.phoneNumber}</Text>
                  <Text>Reason: {application.reason}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 50,
  },
  program: {
    fontWeight: '600',
    fontSize: 30,
    marginBottom: 10,
  },
  boxContainer: {
    marginBottom: 10,
  },
  box: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 10,
  },
  noApplications: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});

export default StreetSoccerControl;
