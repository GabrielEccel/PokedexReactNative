import { Dimensions, Image, StyleSheet, Text, View } from "react-native";


export default function ShowPokemon({pokemon}:any){
    return(
        <View style={styles.pokemon}>
            <Image
                source={{ uri: pokemon?.sprites?.front_default }}
                style={styles.pokemonImg}
            />
            <Text>{`#${pokemon.id} - ${pokemon?.name}`}</Text>
            <Text>{pokemon?.types?.map((t: any) => t.type.name).join(', ')}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    pokemon:{
        width: '30%',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 8,
        margin: 6
    },
    pokemonImg:{
        width: Dimensions.get('window').width * 0.3,
        height: 120,
        backgroundColor:'rgba(208,208,208, 0.4)',
        borderRadius: 8
    },
})