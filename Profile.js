import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Profile = ({ navigation }) => {
  const handleLogout = () => {
    // Ici, vous intégrerez la logique de déconnexion
    // Par exemple, si vous utilisez un contexte d'authentification, vous pouvez appeler une fonction de déconnexion
    // Puis, vous pouvez rediriger l'utilisateur vers l'écran de connexion:
    // navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page de Profil</Text>
      <Text style={styles.username}>Nom d'utilisateur</Text>
      {/* Ajoutez d'autres détails de profil ici */}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7', // Un fond clair
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    color: '#333', // Une couleur de texte foncée pour contraster avec le fond clair
    marginBottom: 20,
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#D9534F', // Couleur rouge pour signifier l'action de déconnexion
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Profile;
