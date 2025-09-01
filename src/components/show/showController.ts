import { InterfacePokemon } from "@/src/types/interfacePokemon";
import { getPokemon } from "@services/pokemonService";
import { useEffect, useState } from "react";

export function useShowController(id: string){
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

    return{
        pokemon
    }
}