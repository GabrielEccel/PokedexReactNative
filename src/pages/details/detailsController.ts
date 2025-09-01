import { InterfaceEvolutionDetail, InterfaceEvolutionLayer } from "@/src/types/interfaceEvolutionChain";
import { InterfacePokemon } from "@/src/types/interfacePokemon";
import { getEvelotionChain, getPokemon, getPokemonSpecies, getType } from "@services/pokemonService";
import { useTypeStore } from "@store/typestore";
import { generationMap } from "@utils/genUtils";
import { sanitize } from "@utils/stringUtils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export function useDetailsController() {
    const { typesMap, setTypeLink } = useTypeStore();
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState<InterfacePokemon>();
    const [gen, setGen] = useState<Number>();
    const [types, setTypes] = useState<string[]>([]);
    const [desc, setDesc] = useState('');
    const [chain, setChain] = useState<InterfaceEvolutionLayer[][]>([])

    useEffect(() => {
        buildPokemon();
    }, [])

    useEffect(() => {
        getInfo();

    }, [pokemon])

    async function buildPokemon() {
        if (!id) return;
        try {
            const response = await getPokemon(id.toString())
            setPokemon(response)
        } catch (error) {
            console.log(error)
        }
    }

    function extracrEvolutionLayer(chain: InterfaceEvolutionDetail): InterfaceEvolutionLayer[][] {
        const layers: InterfaceEvolutionLayer[][] = [];

        function getLayer(node: InterfaceEvolutionDetail, depth: number = 0) {
            if (!layers[depth]) {
                layers[depth] = [];
            }

            layers[depth].push({
                name: node.species.name
            });

            node.evolves_to.forEach((item) => getLayer(item, depth + 1));
        }

        getLayer(chain)

        return layers;
    }

    async function getInfo() {
        if (!pokemon) return;
        try {

            const [speciesResponse, chainResponse] = await Promise.all([getPokemonSpecies(pokemon.id), getEvelotionChain(pokemon.id)])

            const generationName = speciesResponse.generation.name
            const generationNumber = generationMap[generationName]
            setGen(generationNumber)

            const description = speciesResponse.flavor_text_entries.find((item: any) => item.language.name === 'en')
            if (description) {
                setDesc(sanitize(description.flavor_text))
            }

            const list = extracrEvolutionLayer(chainResponse.chain)
            setChain(list)

            const typesInit = pokemon?.types.map(item => item.type.name).join(' ').split(' ');
            const imgTypes = [];

            if (typesInit?.length) {
                const typePromises = typesInit.map(async (item) => {
                    if (typesMap[item] === null) {
                        const reponse = await getType(item)
                        const link = reponse.sprites['generation-vi']['x-y'].name_icon
                        setTypeLink(item.toString(), link.toString())
                        return link
                    }
                    else{
                        return typesMap[item]
                    }
                })

                const imgTypes = await Promise.all(typePromises)

                setTypes(imgTypes)
            }

        } catch (error) {
            console.log("info", error)
        } finally {
            await new Promise(r => setTimeout(r, 500));
            setLoading(false)
        }
    }

    return {
        loading,
        pokemon,
        gen,
        types,
        desc,
        chain
    }
}


