import { InterfacePokemon } from "@/src/types/interfacePokemon";
import { getPokemon, getPokemonSpecies } from "@services/pokemonService";
import { formatGender, upperCase } from "@utils/stringUtils";
import { useEffect, useState } from "react";

export function useShowController(id: string){
    const [pokemon, setPokemon] = useState<InterfacePokemon>();

    useEffect(() => {
        buildPokemon();
    }, [])

    async function buildPokemon() {
        if (!id) return;
        try {
            const responseSpecies = await getPokemonSpecies(id)
            const responsePokemon = await getPokemon(responseSpecies.id)
            setPokemon(responsePokemon)
        } catch (error) {
            console.log(error)
        } finally {
            await new Promise(r => setTimeout(r, 500));
        }
    }

    function format(text: string = " "){
        if(!text) return " ";

        return formatGender(upperCase(text))

    }

    return{
        pokemon, format
    }
}