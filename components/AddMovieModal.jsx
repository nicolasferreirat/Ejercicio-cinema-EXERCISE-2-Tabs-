import { Alert, Button, Modal, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useState } from 'react';
//import data from '../data/data.json';  (borrado)
import CategoriesDropDown from './CategoriesDropDown';
import useFetch from '../hooks/useFetch';
import { API_URL } from '../constants/api';

export default function AddMovieModal({ visible, onClose, onSubmit }) {

  //const categories = data.categories; (borrado)

  const { data: categories, loading, error: errorGetCategories } = useFetch(`${API_URL}/categories`);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);

  function limpiarFormulario() {
    setTitle("");
    setPoster("");
    setDescription("");
    setRating("");
    setDuration("");
    setSelectedCategory(null);
    setError(null);
  }

  async function guardarPelicula() {
        if (!title || !poster || !description || !rating || !duration || !selectedCategory) {
          setError("Completar todos los campos antes de guardar");
          Alert.alert("Error", "Completar todos los campos antes de guardar.");
          return;
        }
        if(duration < 0 || duration > 250){
          setError("Error: duración de la película incorrecta");
          Alert.alert("Error", "duración de la película incorrecta");
          return;
        }
        if(rating < 0 || rating > 10){
          setError("Error: la calificación debe ser un número entre 0 y 10");
          Alert.alert("Error", "La calificación debe de ser entre 0 y 10.");
          return;
        }


        try {
            const peliculaNueva = {
                title: title,
                poster: poster,
                description: description,
                rating: Number(rating),
                duration: Number(duration),
                category: selectedCategory
            };

            const response = await fetch(`${API_URL}/movies`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(peliculaNueva),
            });

            if (!response.ok) {
                throw new Error("No se pudo guardar la película");
            }

            onSubmit();
            limpiarFormulario();
            onClose()
        } catch (err){
            setError(err.message);
        }
    }


  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>

      {errorGetCategories && <Text style={styles.error}>Error: {errorGetCategories.message}</Text>}

      {!loading && !errorGetCategories && (

        <KeyboardAvoidingView behavior="padding" style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Add New Movie</Text>
            {/* Form elements would go here */}
          
              <View  style={styles.casillaInput}>
                  <Text style={styles.tituloInput}>Título:</Text>
                  <TextInput
                      style={styles.input}
                      value={title}
                      onChangeText={setTitle}
                      placeholder="Ej: Toy Story 3"
                  />
              </View>

              <View style={styles.casillaInput}>
                  <Text style={styles.tituloInput}>Poster:</Text>
                  <TextInput
                      style={styles.input}
                      value={poster}
                      onChangeText={setPoster}
                      placeholder="(formato URL) Ej: https://imagenPosterToyStory3.jpg"
                  />
              </View>

              <View style={styles.casillaInput}>
                  <Text style={styles.tituloInput}>Descripción:</Text>
                  <TextInput
                      style={styles.input}
                      value={description}
                      onChangeText={setDescription}
                      placeholder="Ej: Toy Story 3 es una pelicula de un vaquero"
                  />
              </View>

              <View style={styles.casillaInput}>
                  <Text style={styles.tituloInput}>Duración:</Text>
                  <TextInput
                      style={styles.input}
                      value={duration}
                      onChangeText={setDuration}
                      placeholder="(en minutos) Ej: 182"
                      keyboardType="numeric"
                  />
              </View>

              <View style={styles.casillaInput}>
                  <Text style={styles.tituloInput}>Calificación:</Text>
                  <TextInput
                      style={styles.input}
                      value={rating}
                      onChangeText={setRating}
                      placeholder="número del 0 al 10"
                      keyboardType="numeric"
                  />
              </View>

            {error && <Text style={styles.error}>{error}</Text>}
            <View onTouchStart={Keyboard.dismiss}>
              <CategoriesDropDown
                categories={categories}
                onSelectCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Submit"
                onPress={guardarPelicula}
              />
              <Button title="Close" onPress={onClose} />
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  error: {
    color: "#FF0000"
  }
});
