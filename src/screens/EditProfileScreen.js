import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function EditProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile Screen</Text>
      <Button title="Save" onPress={() => navigation.goBack()} />
      <Button title="Cancel" onPress={() => navigation.goBack()} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
