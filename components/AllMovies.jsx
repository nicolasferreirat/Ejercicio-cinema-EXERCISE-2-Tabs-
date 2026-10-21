import {View, Text, FlatList, StyleSheet} from "react-native";
import Movie from "./Movie";


export default function AllMovies({movies}){

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.lista}
                contentContainerStyle={styles.contenidoLista}
                data={movies}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Movie title={item.title} poster={item.poster} description={item.description} rating={item.rating} minutes={item.duration}/>
                    </View>   
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lista: {
    flex: 1,
  },
  contenidoLista: {
    padding: 16,
  },
  item: {
    marginBottom: 16,
  },
});

//(título, póster, descripción, estrellas, duración)
// const Movie = ({ title, poster, description, rating, minutes  })