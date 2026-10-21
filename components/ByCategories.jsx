import {View, Text, StyleSheet, FlatList} from "react-native";
import Movie from "./Movie";



export default function ByCategories({movies, categories}){

    const moviesFiltradasPorCat = [];
    for (const cat of categories){
        const peliculasAgrupadas = [];

        for (const peli of movies){
            if (peli.category === cat.name){
                peliculasAgrupadas.push(peli);
            }
        }
        moviesFiltradasPorCat.push({ nombreCat: cat.name, movies: peliculasAgrupadas});
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={moviesFiltradasPorCat}
                keyExtractor={(item) => item.nombreCat}
                renderItem={({ item }) => (
                    <View style={styles.fila}>

                        <Text style={styles.tituloCategoria}>{item.nombreCat}</Text>

                        <FlatList
                            data={item.movies}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.contenidoLista}
                            keyExtractor={(movie) => String(movie.id)}
                            renderItem={({ item: movie }) => (
                            <View style={styles.card}>
                                <Movie title={movie.title} poster={movie.poster} description={movie.description} rating={movie.rating} minutes={movie.duration}/>
                            </View>
                            )}
                        />

                    </View>
                )}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tituloCategoria: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,
        backgroundColor: "#00BFFF",
        borderRadius: 8
    },
    
    card: {
    marginBottom: 16,
    width:400
  },
});