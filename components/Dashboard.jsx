import { Dimensions, StyleSheet } from 'react-native';
import Movie from '../components/Movie';
//import data from '../data/data.json';   BORRADO
import AddMovieFloatingButton from '../components/AddMovieFloatingButton';
import SegmentControl from '../components/SegmentControl';
import AddMovieModal from '../components/AddMovieModal';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '../constants/api';
import AllMovies from './AllMovies';
import ByCategories from './ByCategories';
import useFetch from '../hooks/useFetch';

export default function Dashboard() {

  const { data: movies, loadingMov, error: errorMov, fetchData: refrescarPeliculas } = useFetch(`${API_URL}/movies`);
  const { data: categories, loading: loadingCat, error: errorCat } = useFetch(`${API_URL}/categories`);
  const [modalVisible, setModalVisible] = useState(false);
  const [segmentSeleccionado, setSegmentSeleccionado] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      {errorCat && <Text style={styles.error}>Error: {errorCat.message}</Text>}
      {errorMov && <Text style={styles.error}>Error: {errorMov.message}</Text>}

      <SegmentControl
        segments={['All Movies', 'Movies By Category']}
        selectedSegment={segmentSeleccionado}
        onSegmentSelect={setSegmentSeleccionado}
        style={{ width: Dimensions.get('window').width - 20 }}
      />
      
      {segmentSeleccionado === 0 ? (<AllMovies movies={movies}/>) : (<ByCategories movies={movies} categories={categories}/>)}

      <AddMovieFloatingButton
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        onPress={() => {
          console.log('Add Movie Pressed');

          setModalVisible(true);
        }}
      />

      <AddMovieModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={refrescarPeliculas}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
