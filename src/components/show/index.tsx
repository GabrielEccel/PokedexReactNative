import { Image, Text, TouchableOpacity } from "react-native";
import { useShowController } from "./showController";
import { showStyles as styles } from "./showStyles";

interface ShowPokemonProps {
    id: string,
    toggle: () => void
}

export default function ShowPokemon({ id, toggle }: ShowPokemonProps) {
    const {pokemon, format} = useShowController(id);
    return (
        <TouchableOpacity style={styles.pokemon} onPress={toggle}>
            <Image
                source={{ uri: pokemon?.sprites?.front_default }}
                style={styles.pokemonImg}
            />
            {(pokemon) ? <Text style={styles.title}>#{pokemon?.id} - {format(pokemon?.name)}</Text> : null}
        </TouchableOpacity>
    )
}
