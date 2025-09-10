import { InterfaceGen } from "@/src/types/interfaceGen";
import { getPokemon, getPokemonSpecies } from "@services/pokemonService";
import { usePokemonStore } from "@store/pokemonStore";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";

export function useHomeController() {
    const {
        visiblePokemon,
        setVisiblePokemon,
        addVisiblePokemon,
        page,
        setPage,
        hasMore,
        setHasMore,
        loading,
        setLoading,
        showAll,
        setShowAll,
        selectedGens,
        setSelectedGens,
    } = usePokemonStore();

    const [pokemon, setPokemon] = useState('');
    const flatListRef = useRef<FlatList>(null);

    const [isModalVisible, setModalVisible] = useState(false);
    const generations: InterfaceGen[] = [
        { gen: 'G1', firstId: 1, lastId: 151 },
        { gen: 'G2', firstId: 152, lastId: 251 },
        { gen: 'G3', firstId: 252, lastId: 386 },
        { gen: 'G4', firstId: 387, lastId: 494 },
        { gen: 'G5', firstId: 495, lastId: 649 },
        { gen: 'G6', firstId: 650, lastId: 721 },
        { gen: 'G7', firstId: 722, lastId: 809 },
        { gen: 'G8', firstId: 810, lastId: 905 },
        { gen: 'G9', firstId: 906, lastId: 1025 },
    ]

    useEffect(() => {
        setShowAll(true)
    }, [])

    useEffect(() => {
        if (showAll) {
            fetchAllPokemon();
        }
    }, [showAll])

    useEffect(() => {
        if (loading && flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [loading]);

    const fetchPokemon = async () => {
        setVisiblePokemon([]);

        if (pokemon.trim() === '') {
            alert('Digite o nome de um pokemon');
            return;
        }

        try {
            setLoading(true)
            await new Promise(r => setTimeout(r, 1000));
            const responseSpecies = await getPokemonSpecies(pokemon)
            const responsePokemon = await getPokemon(responseSpecies.id)
            setVisiblePokemon([responsePokemon]);

        } catch (error) {
            console.log(error);
            alert("O pokemon não foi encontrado");
        }
        finally {
            setLoading(false);
            setPokemon('');
            setPage(1);
            setHasMore(true);
        }

    }

    const fetchAllPokemon = async () => {
        if (!hasMore || loading || !showAll) return;

        if(page === 1) setVisiblePokemon([])

        try {
            setLoading(true);
            await new Promise(r => setTimeout(r, 1000));

            const start = (page - 1) * 100 + 1;
            const end = page * 100;

            const requests: any = [];

            for (let i = start; i <= end && i <= 1025; i++) {
                requests.push(getPokemon(i));
            }

            const responses = await Promise.all(requests);
            const newPokemons = responses.map(res => res);

            addVisiblePokemon(newPokemons)

            if (end >= 1025) {
                setHasMore(false);
            } else {
                setPage(page + 1)
            }

        } catch (error) {
            console.log(error);
            alert("Erro ao carregar pokemons");
        } finally {
            setLoading(false);
        }
    };

    const toggleGens = (gen: InterfaceGen) => {
        if (selectedGens.some(g => g.gen === gen.gen)) {
            setSelectedGens(selectedGens.filter(g => g.gen !== gen.gen))
        } else {
            setSelectedGens([...selectedGens, gen])
        }
    }

    const fetchSelected = async () => {
        setVisiblePokemon([])
        setShowAll(false)

        try {
            setLoading(true)
            await new Promise(r => setTimeout(r, 1000));

            const requests: any = [];

            selectedGens.sort((a, b) => a.firstId - b.lastId).map((gen) => {
                for (let i = gen.firstId; i <= gen.lastId; i++) {
                    requests.push(getPokemon(i))
                }
            })

            const responses = await Promise.all(requests);
            const pokemons = responses.map((pokemon) => pokemon)

            setVisiblePokemon(pokemons)


        } catch (error) {
            console.log(error)
            alert('Erro ao carregar pokemons')
        }
        finally {
            setLoading(false)
        }
    }

    function togglePokemon(pokemon: string) {
        setPokemon(pokemon)
    }

    function toggleShowAll(bool: boolean) {
        setShowAll(bool)
        if (bool) {
            setPage(1);
            setHasMore(true);
            setSelectedGens([]);
        }
    }

    function toggleModalVisible(bool: boolean) {
        setModalVisible(bool)
    }

    return {
        pokemon,
        flatListRef,
        visiblePokemon,
        loading,
        isModalVisible,
        generations,
        selectedGens,
        toggleGens,
        fetchAllPokemon,
        fetchPokemon,
        fetchSelected,
        togglePokemon,
        toggleShowAll,
        toggleModalVisible
    }
}