import { InterfacePokemon } from "@/src/types/interfacePokemon";
import { getPokemon } from "@services/pokemonService";
import { upperCase } from "@utils/stringUtils";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ShowPokemonProps {
    id: string,
    toggle: () => void
}

export default function ShowPokemon({ id, toggle }: ShowPokemonProps) {
    const [pokemon, setPokemon] = useState<InterfacePokemon>();

    useEffect(() => {
        buildPokemon();
    }, [])

    async function buildPokemon() {
        if (!id) return;
        try {
            const response = await getPokemon(id.toString())
            setPokemon(response)
        } catch (error) {
            console.log(error)
        } finally {
            await new Promise(r => setTimeout(r, 500));
        }
    }

    return (
        <TouchableOpacity style={styles.pokemon} onPress={toggle}>
            <Image
                source={{ uri: pokemon?.sprites?.front_default }}
                style={styles.pokemonImg}
            />
            {(pokemon) ? <Text>#{pokemon?.id} - {upperCase(pokemon?.name)}</Text> : null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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