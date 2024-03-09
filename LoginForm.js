import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Button,
} from 'react-native';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignupForm, setShowSignupForm] = useState(false); // Ajout de l'état pour contrôler la visibilité du formulaire d'inscription
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false); // Ajout de l'état pour contrôler la visibilité du formulaire de réinitialisation du mot de passe

  const handleLogin = () => {
    // Ajouter ici la logique de connexion
    console.log('Nom d\'utilisateur:', username);
    console.log('Mot de passe:', password);
    // Réinitialiser les champs après la connexion
    setUsername('');
    setPassword('');
  };

  const handleSignup = () => {
    setShowSignupForm(true); // Afficher le formulaire d'inscription lorsque l'utilisateur clique sur "Créer un compte"
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordForm(true); // Afficher le formulaire de réinitialisation du mot de passe lorsque l'utilisateur clique sur "Mot de passe oublié"
  };

  return (
       <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <View style={styles.container}>
      {!showSignupForm && !showForgotPasswordForm ? (
        <View>
          <Image
            source={require('./assets/adam.jpg')}
            style={styles.image}
          />
          <Text style={styles.label}>Nom d'utilisateur:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={text => setUsername(text)}
            placeholder="Entrez votre nom d'utilisateur"
          />
          <Text style={styles.label}>Mot de passe:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="Entrez votre mot de passe"
            secureTextEntry={true}
          />
          
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.link}>Mot de passe oublié</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Créer un compte</Text>
        </TouchableOpacity>
          
        </View>
      ) : showSignupForm ? (
        // Formulaire d'inscription
        <View>
          <Image
            source={require('./assets/adam.jpg')}
            style={styles.image}
          />
          <Text style={styles.label}>Créer un compte:</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez un nom d'utilisateur"
          />
          <TextInput
            style={styles.input}
            placeholder="Entrez un mot de passe"
            secureTextEntry={true}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Verifiez un mot de passe"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Entrez une adresse email"
          />
  
           <TouchableOpacity style={styles.button} onPress={() => {
              // Ajouter ici la logique d'inscription
              setShowSignupForm(false); // Masquer le formulaire d'inscription après l'inscription réussie
            }}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSignupForm(false)}>
            <Text style={styles.link}>Annuler</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Formulaire de réinitialisation du mot de passe
        <View>
            <Image
            source={require('./assets/adam.jpg')}
            style={styles.image}
          />
          <Text style={styles.label}>Réinitialiser le mot de passe:</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre adresse email"
          />
      
          <TouchableOpacity style={styles.button}  onPress={() => {
              // Ajouter ici la logique pour envoyer un email de réinitialisation du mot de passe
              setShowForgotPasswordForm(false); // 
            }}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowForgotPasswordForm(false)}>
            <Text style={styles.link}>Annuler</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
  },
  form: {
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: '#007bff', // Utilisez votre couleur principale ici
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // pour que le TouchableOpacity s'étende sur toute la largeur
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginForm;
