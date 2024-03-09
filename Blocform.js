import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

const Blocform = () => {
  const [nomBloc, setNomBloc] = useState('');
  const [cotation, setCotation] = useState('');
  const [adresse, setAdresse] = useState('');
  const [coordonnees, setCoordonnees] = useState('');
  const [description, setDescription] = useState(''); // Nouvel état pour la description
  const [mediaList, setMediaList] = useState([]);
  const [showCotationPicker, setShowCotationPicker] = useState(false);
  const cotations = [
    { label: 'Système européen', values: ['3', '3+', '4-', '4', '4+', '5a', '5a+', '5b-', '5b', '5b+', '5c-', '5c', '5c+', '6a-', '6a', '6a+', '6b-', '6b', '6b+', '6c-', '6c', '6c+', '7a-', '7a', '7a+', '7b-', '7b', '7b+', '7c-', '7c', '7c+', '8a-', '8a', '8a+', '8b-', '8b', '8b+', '8c-', '8c', '8c+', '9a-', '9a'] },
    { label: 'Système américain', values: ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15'] }
  ];

  const handleSubmit = () => {
    // Traitez la soumission de votre formulaire ici
    console.log('Formulaire soumis', { nomBloc, cotation, adresse, coordonnees, mediaList });
    setNomBloc('');
    setCotation('');
    setAdresse('');
    setCoordonnees('');
    setMediaList([]);
  };

  const handleSelectMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Nous avons besoin des permissions pour accéder à vos photos.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.7,
    });
  
    if (!result.cancelled && result.assets) {
      // Ici, nous itérons sur chaque asset retourné et les ajoutons à notre liste de médias.
      const newMedia = result.assets.map(({ uri, type }) => ({ uri, type }));
      setMediaList([...mediaList, ...newMedia]);
    }
  };
  const handleCotationSelection = (cotation) => {
    setCotation(cotation);
    setShowCotationPicker(false); // Fermer la liste déroulante après sélection
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom du bloc:</Text>
      <TextInput
        style={styles.input}
        value={nomBloc}
        onChangeText={text => setNomBloc(text)}
        placeholder="Entrez le nom du bloc"
      />
 <Text style={styles.label}>Description du bloc (max 140 caractères):</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text.slice(0, 140))}
        placeholder="Ajoutez une description"
        multiline
        numberOfLines={4} // Ajustez selon vos besoins
      />


    

      <Text style={styles.label}>Coordonnées GPS:</Text>
      <TextInput
        style={styles.input}
        value={coordonnees}
        onChangeText={text => setCoordonnees(text)}
        placeholder="Entrez les coordonnées GPS"
      />
      
<Button
        title={cotation ? `Cotation: ${cotation}` : "Sélectionnez une cotation"}
        onPress={() => setShowCotationPicker(!showCotationPicker)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCotationPicker}
        onRequestClose={() => {
          setShowCotationPicker(!showCotationPicker);
        }}>
        <View style={styles.cotationPicker}>
          <ScrollView>
            {cotations.map((system, index) => (
              <View key={index}>
                <Text style={styles.systemLabel}>{system.label}</Text>
                {system.values.map((value, idx) => (
                  <TouchableHighlight
                    key={idx}
                    onPress={() => handleCotationSelection(value)}
                    style={styles.cotationItem}>
                    <Text>{value}</Text>
                  </TouchableHighlight>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>

<ScrollView contentContainerStyle={styles.container}>
      {/* Vos champs de texte et boutons ici */}
      
    <TouchableOpacity style={styles.button} onPress={handleSelectMedia}>
      <Text style={styles.buttonText}>Télécharger un média</Text>
    </TouchableOpacity>

{mediaList.map((media, index) => (
  <View key={index} style={styles.mediaPreview}>
    {media.type === 'video' ? (
      <Video
        source={{ uri: media.uri }}
        style={styles.media}
        resizeMode="cover"
        shouldPlay={true} // La vidéo se joue automatiquement
        isLooping
        useNativeControls
      />
    ) : (
      <Image source={{ uri: media.uri }} style={styles.media} />
    )}
  </View>
))}


<TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Soumettre</Text>
    </TouchableOpacity>
      {/* Modal pour la sélection de cotation ici */}
    </ScrollView>
    <Modal
        animationType="slide"
        transparent={true}
        visible={showCotationPicker}
        onRequestClose={() => {
          setShowCotationPicker(!showCotationPicker);
        }}>
        <View style={styles.cotationPicker}>
          <ScrollView>
            {cotations.map((system, index) => (
              <View key={index}>
                <Text style={styles.systemLabel}>{system.label}</Text>
                {system.values.map((value, idx) => (
                  <TouchableHighlight
                    key={idx}
                    onPress={() => handleCotationSelection(value)}
                    style={styles.cotationItem}>
                    <Text>{value}</Text>
                  </TouchableHighlight>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f2f2f2',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    width: '100%',
    fontSize: 16,
    color: '#000', // Texte plus lisible
    marginBottom: 8,
    fontWeight: 'bold', // Rendre le label un peu plus épais
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  mediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  mediaPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,  // Assurez-vous que le padding est vertical
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10, // Ajoutez un marginBottom pour éviter la superposition
    width: '100%',  // Assurez-vous que la largeur est définie
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },

  cotationPicker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    maxHeight: '50%',
  },
  systemLabel: {
    fontWeight: 'bold',
    backgroundColor: '#eee',
    padding: 10,
  },
  cotationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cotationPicker: {
    bottom: -400,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    maxHeight: '50%',
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Un fond plus clair
    alignItems: 'center',
    paddingTop: 50, // Un peu d'espace en haut
  },
  scrollViewContent: {
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25, // Bordures plus arrondies
    marginBottom: 20, // Plus d'espace entre les éléments
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF', // Couleur iOS pour les boutons
    padding: 15,
    borderRadius: 25, // Bordures arrondies
    width: '90%', // Une largeur relative pour un espacement homogène
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 2, // Ombre sur Android
    shadowColor: '#000', // Ombre sur iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  mediaPreview: {
    width: '90%', // Adapter à la largeur des boutons
    height: 200, // Hauteur fixe pour les médias
    borderRadius: 25, // Bordures arrondies
    overflow: 'hidden',
    marginBottom: 20,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Assombrir l'arrière-plan
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 25, // Bordures arrondies
    padding: 20,
    alignItems: 'stretch',
  },
});

export default Blocform;
