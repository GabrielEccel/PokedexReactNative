import { Dimensions, StyleSheet } from "react-native";

export const showStyles = StyleSheet.create({
    pokemon: {
        width: Dimensions.get('window').width * 0.3,
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 8,
        margin: 6
    },
    pokemonImg: {
        width: Dimensions.get('window').width * 0.3,
        height: 120,
        backgroundColor: 'rgba(208,208,208, 0.4)',
        borderRadius: 8
    },
})